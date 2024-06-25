import React, { useState } from "react";
import "./SelectEnem.css";
import { useNavigate, useParams } from "react-router-dom";
import EditMap from "../EditMap/EditMap";

function SelectEnem() {
  const { userId } = useParams();
  const [nameHot, setNameHot] = useState(userId);
  const [nameCool, setNameCool] = useState(userId);
  const [slotHot, setSlotHot] = useState(0);
  const [slotCool, setSlotCool] = useState(0);
  const [turn, setTurn] = useState(100);
  const navigate = useNavigate();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [board, setBoard] = useState([
    "000300000300000",
    "0C0000000020000",
    "000300030020300",
    "222200000020003",
    "000003030300030",
    "000300300000000",
    "000000222000220",
    "000300030000003",
    "230000030000032",
    "300000030003000",
    "022000222000000",
    "000000003003000",
    "000003030300000",
    "300020000002222",
    "003020030003000",
    "0000200000000H0",
    "000003000003000",
  ]);

  const onClickStartButton = async () => {
    if (!nameHot) {
      console.log("!nameHot");
      return;
    }
    if (!nameCool) {
      console.log("!nameCool");
      return;
    }
    if (slotHot < 0) {
      console.log("!slotHot");
      return;
    }
    if (slotCool < 0) {
      console.log("!slotCool");
      return;
    }
    if (!board) {
      console.log("!board");
      return;
    }
    if (turn < 1) {
      console.log("!turn");
      return;
    }

    const sendData = {
      c_id: nameCool,
      c_slot: slotCool,
      h_id: nameHot,
      h_slot: slotHot,
      board: board,
      turn: Number(turn),
    };

    try {
      const response = await fetch(
        "https://6vlokmaex5npaejbf2mser3g4a0teifv.lambda-url.ap-northeast-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
          mode: "cors",
        },
      );
      const receiveData = await response.json();
      const boardData = {
        Field: board,
        Turn: turn,
      };
      const mergedData = {
        ...receiveData,
        ...boardData,
      };
      const encodedData = encodeURIComponent(JSON.stringify(mergedData));
      navigate(`/match/${encodedData}`);
    } catch (error) {
      console.error(error);
    }

    console.log("complete start");
  };

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const handleSaveMap = (newBoard) => {
    setBoard(newBoard);
  };

  const onClickSlotButton = (num, HorC) => {
    if (HorC === "H") {
      setSlotHot(num);
    } else if (HorC === "C") {
      setSlotCool(num);
    }
  };

  const onClickBackButton = () => {
    console.log("back to the InitialPage");
    navigate(`/initial/${userId}`);
  };

  return (
    <>
      <div className="selectEnem">
        <div className="search">
          <input
            className="search_bar_input"
            value={nameHot}
            placeholder="HOTプレイヤー名を入力"
            onChange={(e) => setNameHot(e.target.value)}
            type="text"
          />
        </div>
        <div className="program_Container">
          <div className="program_items">
            <button
              className="program_buttons_hot"
              onClick={() => onClickSlotButton(0, "H")}
            >
              スロット１
            </button>
          </div>
          <div className="program_items">
            <button
              className="program_buttons_hot"
              onClick={() => onClickSlotButton(1, "H")}
            >
              スロット２
            </button>
          </div>
          <div className="program_items">
            <button
              className="program_buttons_hot"
              onClick={() => onClickSlotButton(2, "H")}
            >
              スロット３
            </button>
          </div>
        </div>
        <div>{"選択中 name:" + nameHot + " slot:" + slotHot}</div>

        <div className="search">
          <input
            className="search_bar_input"
            value={nameCool}
            placeholder="COOLプレイヤー名を入力"
            onChange={(e) => setNameCool(e.target.value)}
            type="text"
          />
        </div>
        <div className="program_Container">
          <div className="program_items">
            <button
              className="program_buttons_cool"
              onClick={() => onClickSlotButton(0, "C")}
            >
              スロット１
            </button>
          </div>
          <div className="program_items">
            <button
              className="program_buttons_cool"
              onClick={() => onClickSlotButton(1, "C")}
            >
              スロット２
            </button>
          </div>
          <div className="program_items">
            <button
              className="program_buttons_cool"
              onClick={() => onClickSlotButton(2, "C")}
            >
              スロット３
            </button>
          </div>
        </div>
        <div>{"選択中 name:" + nameCool + " slot:" + slotCool}</div>
        <div className="search">
          <label htmlFor="turn">ターン数</label>
          <input
            value={turn}
            id="turn"
            onChange={(e) => setTurn(e.target.value)}
            type="number"
            min={1}
          />
        </div>
        <div>
          <button className="startButton" onClick={onClickStartButton}>
            対戦を始める
          </button>
        </div>
        <div>
          <button className="createMapButton" onClick={togglePopUp}>
            マップを制作
          </button>
        </div>
        <div>
          <button className="backButton" onClick={onClickBackButton}>
            ←戻る
          </button>
        </div>
      </div>
      {isPopUpVisible && (
        <div className="popUp">
          <EditMap onClose={togglePopUp} onSave={handleSaveMap} />
        </div>
      )}
    </>
  );
}

export default SelectEnem;
