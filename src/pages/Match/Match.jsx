import postMatchLog from "../../components/postMatchLog";
import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import './Match.css';

const Match = () => {
    const height = 17;
    const width = 15;
    const lineWidth = 2;
    const blockSize = 20;

    const dir = {
        'u': { "x": -1, "y": 0 },
        'd': { "x": 1, "y": 0 },
        'l': { "x": 0, "y": -1 },
        'r': { "x": 0, "y": 1 }
    };

    const [turnNum, setTurnNum] = useState(0);
    const [matchLog, setMatchLog] = useState(null);
    const [fields, setFields] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const log = await postMatchLog("5b59e5ac-895d-41b6-a2e5-59865052bf40");
            setMatchLog(log);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (matchLog) {
            console.log(matchLog);
            const newFields = [];
            let coldPos = { "x": 0, "y": 0 }, hotPos = { "x": 0, "y": 0 };

            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    if (matchLog.Field[i][j] === 'C') {
                        coldPos.x = i;
                        coldPos.y = j;
                    }
                    if (matchLog.Field[i][j] === 'H') {
                        hotPos.x = i;
                        hotPos.y = j;
                    }
                }
            }

            // let currentField = matchLog.Field.map((row) => row.split(""));
            let currentField = [];
            matchLog.Field.forEach(row => {
                currentField.push(row.split(""));
            })
            newFields.push(structuredClone(currentField));

            matchLog.Acts.forEach(act => {
                const turn = newFields.length;
                let px, py;
                if (turn % 2) { // Cold
                    px = coldPos.x + dir[act[1]].x;
                    py = coldPos.y + dir[act[1]].y;
                } else { // Hot
                    px = hotPos.x + dir[act[1]].x;
                    py = hotPos.y + dir[act[1]].y;
                }
                if (act[0] === 'p') {
                    currentField[px][py] = "2";
                } else if (act[0] === 'w') {
                    if (turn % 2) {
                        currentField[coldPos.x][coldPos.y] = ".";
                        coldPos.x = px;
                        coldPos.y = py;
                        currentField[coldPos.x][coldPos.y] = "C";
                    } else {
                        currentField[hotPos.x][hotPos.y] = ".";
                        hotPos.x = px;
                        hotPos.y = py;
                        currentField[hotPos.x][hotPos.y] = "H";
                    }
                }
                newFields.push(structuredClone(currentField));
            });
            setFields(structuredClone(newFields));
        }
    }, [matchLog]);

    const previousTurn = () => {
        if (turnNum > 0) setTurnNum(turnNum - 1);
    };

    const nextTurn = () => {
        if (turnNum < fields.length - 1) setTurnNum(turnNum + 1);
    };

    useEffect(() => {
        if (fields.length > 0) {
            const canvasElem = document.getElementById("canvas");
            const ctx = canvasElem.getContext("2d");

            ctx.fillStyle = "#007bff";
            ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
            ctx.fillStyle = "#fce2c4";
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    ctx.fillRect(
                        j * (lineWidth + blockSize) + lineWidth,
                        i * (lineWidth + blockSize) + lineWidth,
                        blockSize,
                        blockSize
                    );
                }
            }
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    if (fields[turnNum][i][j] === "2") {
                        ctx.fillStyle = "#824921";
                        ctx.fillRect(
                            j * (lineWidth + blockSize),
                            i * (lineWidth + blockSize),
                            blockSize + lineWidth * 2,
                            blockSize + lineWidth * 2
                        );
                    } else if (fields[turnNum][i][j] === "C") {
                        ctx.fillStyle = "#0000ff";
                        ctx.fillRect(
                            j * (lineWidth + blockSize) + lineWidth * 2,
                            i * (lineWidth + blockSize) + lineWidth * 2,
                            blockSize - lineWidth * 2,
                            blockSize - lineWidth * 2
                        );
                    } else if (fields[turnNum][i][j] === "H") {
                        ctx.fillStyle = "#ff0000";
                        ctx.fillRect(
                            j * (lineWidth + blockSize) + lineWidth * 2,
                            i * (lineWidth + blockSize) + lineWidth * 2,
                            blockSize - lineWidth * 2,
                            blockSize - lineWidth * 2
                        );
                    } else if (fields[turnNum][i][j] === "3") {
                        ctx.fillStyle = "#ff8888";
                        ctx.strokeStyle = "#00ff00";
                        ctx.beginPath();
                        let cx = j * (lineWidth + blockSize) + lineWidth + blockSize / 2; //マス目の中心のx,y座標
                        let cy = i * (lineWidth + blockSize) + lineWidth + blockSize / 2;
                        ctx.moveTo(cx - blockSize / 2, cy);
                        ctx.lineTo(cx, cy - blockSize / 2);
                        ctx.lineTo(cx + blockSize / 2, cy);
                        ctx.lineTo(cx, cy + blockSize / 2);
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }
        }
    }, [turnNum, fields]);

    if (!matchLog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1 className="heading">試合結果</h1>
            <button onClick={previousTurn} className={`button ${turnNum <= 0 ? "button-disable" : ""}`}>前ターン</button>
            <button onClick={nextTurn} className="button">次ターン</button>
            <div>{turnNum+1}ターン目</div>
            <canvas width={width * (lineWidth + blockSize) + lineWidth} height={height * (lineWidth + blockSize) + lineWidth} id="canvas"></canvas>
        </div>
    );
};

export default Match;
