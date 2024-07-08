import {
  RxArrowLeft,
  RxArrowRight,
  RxStopwatch,
  RxPause,
  RxPlay,
  RxHamburgerMenu,
} from "react-icons/rx";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Match.css";
import FieldDrawByJsx from "../../components/fieldDrawByJsx";
import { PopUp } from "../../components/popUp";
import { PiDropSimple } from "react-icons/pi";
const Match = () => {
  const height = 17;
  const width = 15;
  const lineWidth = 2;
  const blockSize = 20;

  const dir = {
    u: { x: -1, y: 0 },
    d: { x: 1, y: 0 },
    l: { x: 0, y: -1 },
    r: { x: 0, y: 1 },
  };

  const [turnNum, setTurnNum] = useState(0);
  const [matchLog, setMatchLog] = useState(null);
  const [fields, setFields] = useState([]);
  const [Auto,setAuto]=useState(false);
  const intervalRef = useRef(null);
  const [isPopUpVisible,setPopUpVisible] = useState(false);
  const [autoSpeed,setAutoSpeed]=useState(1000)
  const [scores, setScores] = useState([]);
  const [speadM,setSpeadM]=useState(1)
  const { jsonData } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const log = JSON.parse(jsonData);
        console.log(log)
        setMatchLog(log);
      } catch (error) {
        console.error("JSONパース中にエラー発生:", error);
      }
    };
    if (jsonData) {
      const log = JSON.parse(jsonData);
      if(log.player1_error === "" && log.player2_error === ""){
        fetchData();
      }
      else{
        alert("error")
      }
    }
  }, [jsonData]);

  useEffect(() => {
    if (matchLog) {
      const newFields = [];
      const newScores = [];
      let coolPos = { x: 0, y: 0 },
        hotPos = { x: 0, y: 0 };
      let score = { COOL: 0, HOT: 0 };

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (matchLog.Field[i][j] === "C") {
            coolPos.x = i;
            coolPos.y = j;
          }
          if (matchLog.Field[i][j] === "H") {
            hotPos.x = i;
            hotPos.y = j;
          }
        }
      }

      let currentField = [];
      if (matchLog && matchLog.Field) {
        matchLog.Field.forEach((row) => {
          currentField.push(row.split(""));
        });
      }
      newFields.push(structuredClone(currentField));
      newScores.push(structuredClone(score));

      matchLog.log.forEach((act) => {
        if (!act[1] || !dir[act[1]]) {
          console.error("Invalid action or direction:", act);
          return; // 無効なアクションの場合はスキップ
        }
        const turn = newFields.length;
        let px, py;
        if (turn % 2) {
          // Cold
          px = coolPos.x + dir[act[1]].x;
          py = coolPos.y + dir[act[1]].y;
        } else {
          // Hot
          px = hotPos.x + dir[act[1]].x;
          py = hotPos.y + dir[act[1]].y;
        }
        if (px < 0 || px >= height || py < 0 || py >= width) {
          console.error("Position out of bounds:", { px, py });
          return; // 無効な位置の場合はスキップ
        }
        if (act[0] === "p") {
          currentField[px][py] = "2";
        } else if (act[0] === "w") {
          if (turn % 2) {
            if (currentField[px][py] === "3") {
              currentField[coolPos.x][coolPos.y] = "2";
              score["COOL"]++;
            }
            else currentField[coolPos.x][coolPos.y] = "0";
            coolPos.x = px;
            coolPos.y = py;
            currentField[coolPos.x][coolPos.y] = "C";
          } else {
            if (currentField[px][py] === "3") {
              currentField[hotPos.x][hotPos.y] = "2";
              score["HOT"]++;
            }
            else currentField[hotPos.x][hotPos.y] = "0";
            hotPos.x = px;
            hotPos.y = py;
            currentField[hotPos.x][hotPos.y] = "H";
          }
        }
        newFields.push(structuredClone(currentField));
        newScores.push(structuredClone(score));
      });
      setFields(structuredClone(newFields));
      setScores(structuredClone(newScores));
    }
  }, [matchLog]);

  useEffect(() => {
    if (Auto!==false) {
        intervalRef.current = setInterval(()=>{if (turnNum < fields.length - 1){setTurnNum(turnNum + 1);};}, autoSpeed);
    }
    return () => clearInterval(intervalRef.current);
  }, [turnNum,Auto]);

  const previousTurn = () => {
    if (turnNum > 0) setTurnNum(turnNum - 1);
  };

  const nextTurn = () => {
    if (turnNum < fields.length - 1) setTurnNum(turnNum + 1);
  };

  if (!matchLog) {
    return <div>Loading...</div>;
  }

  const scoreComponent = ({ turn, player }) => {
    if(scores.length <= turn) {
      return <div className="player_score">-1</div>;
    } else {
      return <div className="player_score">{scores[turn][player]}</div>
    }
  };

  const resultComponent = ({ winner, player }) => {
    const anotherPlayer = player === "HOT" ? "COOL" : "HOT";
    if (winner === player) {
      return <div className="result">Win</div>;
    } else if (winner === anotherPlayer) {
      return <div className="result lose">Lose</div>;
    } else {
      return <div className="result lose">Draw!</div>;
    }
  };

  const rateComponent = ({ turn, player }) => {
    if(turn === 0){
      return <div className="result">0%</div>
    }
    let scoreSum = scores[turn]["HOT"] + scores[turn]["COOL"]
    scoreSum = scoreSum === 0 ? 1 : scoreSum;
    const rate = ((scores[turn][player] / scoreSum) * 100).toFixed()
    if(turn === matchLog.Turn){
      return resultComponent({ winner: matchLog.winner, player: player})
    }
    return <div className="result">{rate}%</div>
  };

  const logComponent = (log, player, showRealtimeLog) => {
    let initial = 0;
    if (player === "HOT") initial = 1;
    const handleClick = (num) => {
      setTurnNum(num);
    };
    showRealtimeLog = showRealtimeLog || false;

    const actToText = (act) => {
      if (act[0] === "p") {
        return "Put";
      } else if (act[0] === "w") {
        return "Walk";
      } else if (act[0] === "s"){
        return "Search";
      } else if (act[0] === "l"){
        return "Look"
      }
    };

    const dirToText = (dir) => {
      if (dir === "u") {
        return "Up";
      } else if (dir === "d") {
        return "Down";
      } else if (dir === "l") {
        return "Left";
      } else if (dir === "r") {
        return "Right";
      }
    };

    const list = log.map((act, i) => {
      if (
        (i % 2 === initial && !showRealtimeLog) ||
        (showRealtimeLog && i <= turnNum)
      ) {
        let className = "log_item";
        if (turnNum === i) {
          className += " current";
        }
        return (
          <>
            <div key={i} onClick={() => handleClick(i)} className={className}>
              <p>{i + 1}</p>
              <p>{actToText(act[0])}</p>
              <p>{dirToText(act[1])}</p>
            </div>
            {turnNum - 1 === i && <div className="log_item_bar" />}
          </>
        );
      }
      return null;
    });
    return <div className="log">{list}</div>;
  };

  const matchControlButton = ({ text, icon, onClick, disabled }) => {
    return (
      <button
        onClick={onClick}
        aria-label={text}
        className={`control ${disabled ? "disable" : ""}`}
        disabled={disabled}
      >
        {icon}
      </button>
    );
  };

  const handleAutoSpead = () =>{
    if(Auto){
        if(autoSpeed === 125){
            setAutoSpeed(1000)
            setSpeadM(1)
        }else{
            setAutoSpeed(autoSpeed / 2)
            setSpeadM(speadM*2)
        }
    }
  }

  //TODO:必要に応じて追加
  const matchControls = {
    previousTurn: {
      text: "前ターン",
      icon: <RxArrowLeft />,
      onClick: previousTurn,
      disabled: turnNum <= 0,
      description: "前のターンに戻ります",
    },
    realtimeLog: {
      text: "リアルタイムログ",
      icon: <RxStopwatch />,
      onClick: () => {},
      disabled: false,
      description: "リアルタイムでログを表示します",
    },
    nextTurn: {
      text: "次ターン",
      icon: <RxArrowRight />,
      onClick: nextTurn,
      disabled: turnNum >= fields.length - 1,
      description: "次のターンに進みます",
    },
    stopAutoPlay: {
      text: "停止",
      icon: <RxPause />,
      onClick: () => {setAuto(false)},
      disabled: false,
      description: "自動再生を停止します",
    },
    startAutoPlay: {
      text: "再生",
      icon: !Auto ? <RxPlay /> : <RxPause />,
      onClick: () => {!Auto ? setAuto(true) : setAuto(false)},
      disabled: false,
      description: "自動再生を開始します",
    },
    openOptions: {
      text: "オプション",
      icon: <div> x {speadM}</div>,
      onClick: () => {
        handleAutoSpead()
    },
      disabled: false,
      description: "オプションを開きます",
    },
  };

  return (
    
    <div className="match">
      <div className="player_container C">
        {rateComponent({ turn: turnNum, player: "COOL" })}

        <div className="player">
          <div className="player_name">{matchLog.CoolName}</div>
          <div className="player_name">
          </div>
          {scoreComponent({ turn: turnNum, player: "COOL" })}
        </div>
        {logComponent(matchLog.log, "COOL")}
      </div>
      <div className="main_container">
        <div className="field_container">
            
          <FieldDrawByJsx
            fields={fields}
            turnNum={turnNum}
            height={height}
            width={width}
          />
        </div>
        <div className="match_controls">
          {matchControlButton(matchControls.previousTurn)}
          {matchControlButton(matchControls.startAutoPlay)}
          {matchControlButton(matchControls.openOptions)}
          {matchControlButton(matchControls.nextTurn)}
          {/* TODO:必要に応じて追加 */}
          <div>{turnNum + 1}ターン目</div>
        </div>
      </div>
      <div className="player_container H">
        {rateComponent({ turn: turnNum, player: "HOT" })}
        <div className="player">
          <div className="player_name">{matchLog.HotName}</div>
          <div className="player_name">
          </div>
          {scoreComponent({ turn: turnNum, player: "HOT"})}
        </div>
        {logComponent(matchLog.log, "HOT")}
      </div>
    </div>
    
  );
};

export default Match;
