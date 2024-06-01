import postMatchLog from "../../components/postMatchLog"
import React, {useState, useEffect, useMemo} from "react";
import ReactDOM from "react-dom"
import './Match.css';

const Match = async () => {
    const height = 17;
    const width = 15;
    const lineWidth = 2;
    const blockSize = 20;

    const dir = {
        'u' : {"x": -1, "y": 0},
        "d" : {"x": 1, "y": 0}, 
        "l" : {"x": 0, "y": -1},
        "r": {"x": 0, "y": 1}
    }

    const [turnNum, setTurnNum] = useState(1)
    
    const matchLog = await postMatchLog("SampleLog");

    console.log(matchLog)

    const fields = useMemo(() => {
        let fields = []
        let coldPos = {"x": 0, "y": 0}, hotPos = {"x": 0, "y": 0};

        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                if(matchLog.Field[i][j] === 'C') {
                    coldPos.x = i;
                    coldPos.y = j;
                }
                if(matchLog.Field[i][j] === 'H') {
                    hotPos.x = i;
                    hotPos.y = j;
                }
            }
        }

        let currentField = matchLog.Field.map((row) => row.split(""));
        fields.push(currentField);

        matchLog.Acts.forEach(act => {
            const turn = fields.length
            let px, py;
            if(turn % 2) { //Cold
                px = hotPos.x + dir[act[1]].x;
                py = hotPos.y + dir[act[1]].y;
            } else { //Hot
                px = hotPos.x + dir[act[1]].x;
                py = hotPos.y + dir[act[1]].y;
            }
            if(act[0] === 'p') {
                currentField[px][py] = "W";
            } else if (act[0] === 'w') {
                if(turn % 2) {
                    currentField[coldPos.x][coldPos.y] = "."
                    coldPos.x = px;
                    coldPos.y = py;
                    currentField[coldPos.x][coldPos.y] = "C"
                } else {
                    currentField[hotPos.x][hotPos.y] = "."
                    hotPos.x = px;
                    hotPos.y = py;
                    currentField[hotPos.x][hotPos.y] = "H"
                }
            }

            fields.push(currentField);

        });
        return fields;
    });

    

    const previousTurn = () => {
        if(turnNum > 1) setTurnNum(turnNum - 1);
    }

    const nextTurn = () => {
        if(turnNum < matchLog.Acts.length) setTurnNum(turnNum + 1)
    }


    useEffect(() => {
        const canvasElem = document.getElementById("canvas")
        const ctx = canvasElem.getContext("2d");
        
        ctx.fillStyle = "#007bff";
        ctx.fillRect(0, 0, canvasElem.width, canvasElem.height)
        ctx.fillStyle = "#fce2c4"
        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                ctx.fillRect(
                    j * (lineWidth + blockSize) + lineWidth, 
                    i * (lineWidth + blockSize) + lineWidth,
                    blockSize,
                    blockSize
                )
                
            }
        }
        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                if(fields[turnNum][i][j] === "W") {
                    ctx.fillStyle = "#824921";
                    ctx.fillRect(
                        j * (lineWidth + blockSize) - lineWidth / 2,
                        i * (lineWidth + blockSize) - lineWidth / 2,
                        blockSize + lineWidth,
                        blockSize + lineWidth
                    )
                } else if(fields[turnNum][i][j] === "C") {
                    ctx.fillStyle = "#0000ff"
                    ctx.fillRect(
                        j * (lineWidth + blockSize) + lineWidth,
                        i * (lineWidth + blockSize) + lineWidth,
                        blockSize - lineWidth * 2,
                        blockSize - lineWidth * 2
                    )
                } else if(fields[turnNum][i][j] === "H") {
                    ctx.fillStyle = "#ff0000"
                    ctx.fillRect(
                        j * (lineWidth + blockSize) + lineWidth,
                        i * (lineWidth + blockSize) + lineWidth,
                        blockSize - lineWidth * 2,
                        blockSize - lineWidth * 2
                    )
                }
            }
        }


    }, [turnNum, fields]);

    return (
        <div className="container">
            <h1 className="heading">試合結果</h1>
            <button onClick={previousTurn} className={`"button"  ${turnNum <= 1 ? "button-disable" : "" }`}>前ターン</button>
            <button onClick={nextTurn} className="button">次ターン</button>
            <div>{turnNum}ターン目</div>
            <canvas width={width * (lineWidth + blockSize) + lineWidth} height={height * (lineWidth + blockSize) + lineWidth} id="canvas"></canvas>
        </div>
    )
}

export default Match;