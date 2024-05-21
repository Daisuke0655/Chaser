import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom"
import './Match.css';

const Match = () => {
    const height = 17;
    const width = 15;
    const lineWidth = 2;
    const blockSize = 20;

    const [turnNum, setTurnNum] = useState(1)

    const previousTurn = () => {
        setTurnNum(turnNum - 1);
    }

    const nextTurn = () => {
        setTurnNum(turnNum + 1)
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
                    blockSize)
            }
        }


    }, [turnNum]);

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