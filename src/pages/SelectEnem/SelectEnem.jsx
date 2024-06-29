import React, { useState, } from "react";
import './SelectEnem.css';
import { useNavigate} from 'react-router-dom';
import EditMap from "../EditMap/EditMap";
import { PopUp } from "../../components/popUp";

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
  const [isLoading, setIsLoading] = useState(false);

  const onClickStartButton = async () => {
    setIsLoading(true);
    if (!nameHot) {
      console.log("!nameHot");
      setIsLoading(false);
      return;
    }
    if (!nameCool) {
      console.log("!nameCool");
      setIsLoading(false);
      return;
    }
    if (slotHot < 0) {
      console.log("!slotHot");
      setIsLoading(false);
      return;
    }
    if (slotCool < 0) {
      console.log("!slotCool");
      setIsLoading(false);
      return;
    }
    if (!board) {
      console.log("!board");
      setIsLoading(false);
      return;
    }
    if (turn < 1) {
      console.log("!turn");
      setIsLoading(false);
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
        }
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);

    }


    return (
            <>
            <div className='selectEnem'>
                <div className="search">    
                    <input
                    className="search_bar_input"
                    value={nameHot}
                    placeholder="HOTプレイヤー名を入力"
                    onChange={e=>setNameHot(e.target.value)}
                    type="text"
                    />
                </div>
                <div className="program_Container">
                    <div className="program_items">
                        <button className="program_buttons_hot" onClick={()=>onClickSlotButton(0,"H")}>スロット１</button></div>
                    <div className="program_items">
                        <button className="program_buttons_hot" onClick={()=>onClickSlotButton(1,"H")}>スロット２</button></div>
                    <div className="program_items">
                        <button className="program_buttons_hot" onClick={()=>onClickSlotButton(2,"H")}>スロット３</button></div>
                </div>
                <div>{"選択中 name:"+nameHot+" slot:"+slotHot}</div>

                <div className="search">    
                    <input
                    className="search_bar_input"
                    value={nameCool}
                    placeholder="COOLプレイヤー名を入力"
                    onChange={e=>setNameCool(e.target.value)}
                    type="text"
                    />
                </div>
                <div className="program_Container">
                    <div className="program_items">
                        <button className="program_buttons_cool" onClick={()=>onClickSlotButton(0,"C")}>スロット１</button></div>
                    <div className="program_items">
                        <button className="program_buttons_cool" onClick={()=>onClickSlotButton(1,"C")}>スロット２</button></div>
                    <div className="program_items">
                        <button className="program_buttons_cool" onClick={()=>onClickSlotButton(2,"C")}>スロット３</button></div>
                </div>
                <div>{"選択中 name:"+nameCool+" slot:"+slotCool}</div>
                <div className="search">
                    <label htmlFor="turn">ターン数</label>
                    <input
                    value={turn}
                    id="turn"
                    onChange={e=>setTurn(e.target.value)}
                    type="number"
                    min={1}
                    />
                </div>
                <div>
                    <button className="startButton" onClick={onClickStartButton}>対戦を始める</button>
                </div>
                <div>
                    <button className="createMapButton" onClick={togglePopUp}>マップを制作</button>
                </div>
                <div>
                    <button className="backButton" onClick={onClickBackButton}>←戻る</button>
                </div>
                
            </div>
            {isPopUpVisible &&
                <div className="popUp">
                    <EditMap onClose={togglePopUp} onSave={handleSaveMap} />
                </div>
            }
        </>
    );
  }

  const slotSelectors = (HorC) => {
    const slotArray = [];
    for (let i = 0; i < 3; i++) {
      const isSelected =
        (HorC === "H" && i === slotHot) || (HorC === "C" && i === slotCool);

      slotArray.push(
        <div className="program_items">
          <button
            className={`program_buttons ${HorC} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => onClickSlotButton(i, HorC)}
          >
            <div className="label">
              slot
              <div className="num">{i + 1}</div>
            </div>
          </button>
        </div>
      );
    }
    return <div className="program_Container">{slotArray}</div>;
  };

  const playerNameInput = (HorC) => {
    const placeHolder =
      HorC === "C" ? "COOLプレイヤー名を入力" : "HOTプレイヤー名を入力";
    const onChangeName = (e) =>
      HorC === "C" ? setNameCool(e.target.value) : setNameHot(e.target.value);
    return (
      <div className="player_name_input_container">
        <label htmlFor="player_name_input_H">プレイヤー名：</label>
        <input
          id="player_name_input_H"
          className="player_name_input"
          value={nameCool}
          placeholder={placeHolder}
          onChange={onChangeName}
          type="text"
        />
      </div>
    );
  };

  return (
    <>
      <div className="selectEnem">
        <div className="player_settings">
          <div className={"player_settings_item H"}>
            <h2>HOT</h2>
            {playerNameInput("H")}
            {slotSelectors("H")}
          </div>
          <div className="player_settings_item C">
            <h2>COOL</h2>
            {playerNameInput("C")}
            {slotSelectors("C")}
          </div>
        </div>
        <div className="match_settings">
          <h2>ゲーム設定</h2>
          <div className="tern_select">
            <label htmlFor="turn">ターン数：</label>
            <input
              value={turn}
              id="turn"
              onChange={(e) => setTurn(e.target.value)}
              type="number"
              min={1}
            />
          </div>
          <div>
            <button className="secondary" onClick={togglePopUp}>
              マップを制作
            </button>
          </div>
        </div>
        <div className="actions">
          <button className="secondary" onClick={onClickBackButton}>
            ←戻る
          </button>
          <button
            className={"primary" + (isLoading ? " loading" : "")}
            onClick={onClickStartButton}
          >
            <div className="label">対戦を始める</div>
          </button>
        </div>
      </div>
      {isPopUpVisible && (
        <PopUp allowClose={false}>
          <EditMap onClose={togglePopUp} onSave={handleSaveMap} />
        </PopUp>
      )}
    </>
  );
}

export default SelectEnem

