import React, {useEffect, useState, useMemo} from "react";
import fieldDraw from "../../components/fieldDraw";

import "./EditMap.css";
import { useCallback } from "react";

const EditMap = () => {
    const height = 17;
    const width = 15;
    const lineWidth = 2;
    const blockSize = 20;
    const itemLineWidth = 4;
    const itemBlockSize = 40;

    const items = useMemo(() => [
        {"char": ".", "index": 0},
        {"char": "2", "index": 1},
        {"char": "3", "index": 2},
        {"char": "C", "index": 3},
        {"char": "H", "index": 4},
    ], []);

    let defaultField = [];
    for(let i = 0; i < height; i++) defaultField.push(Array(width).fill('0'));
    const [field, setField] = useState(defaultField);
    const [selectedItem, setSelectedItem] = useState(0);

    const handleItemClicked = useCallback((ev) => {

        const rect = ev.target.getBoundingClientRect();
        let x = ev.x - rect.left;
        let slct = Math.floor(x / (itemBlockSize + itemLineWidth));
        if(0 <= slct && slct < 5) setSelectedItem(slct);
    }, []);

    const handleFieldClicked = useCallback((ev) => {
        const rect = ev.target.getBoundingClientRect();
        let x = ev.x - rect.left;
        let y = ev.y - rect.top;
        let slctx = Math.floor(x / (blockSize + lineWidth));
        let slcty = Math.floor(y / (blockSize + lineWidth));
        if(0 <= slctx && slctx < width && 0 <= slcty && slcty < height) {
            let newField = field;
            newField[slcty][slctx] = items[selectedItem].char;
            setField(newField);
            }
        console.log(field);
    }, [selectedItem, field, items]);
            
    useEffect(() => {
        const canvasElem = document.getElementById("canvas");
        canvasElem.addEventListener('click', handleFieldClicked);
        const canvasElem2 = document.getElementById("items");
        canvasElem2.addEventListener('click', handleItemClicked);
    }, [handleItemClicked, handleFieldClicked]);

    useEffect(() => {
        const canvasElem = document.getElementById("items");
        const ctx = canvasElem.getContext("2d");
        
        fieldDraw(ctx, 1, items.length, [["0", "2", "3", "C", "H"]], 40, 4);

        ctx.strokeStyle = "#ff0000"; //選択されたアイテムを赤枠で囲う
        ctx.lineWidth = itemLineWidth;
        ctx.beginPath();
        console.log(selectedItem);
        ctx.moveTo((itemLineWidth + itemBlockSize) * selectedItem, 0);
        ctx.lineTo((itemLineWidth + itemBlockSize) * (selectedItem + 1) + itemLineWidth, 0);
        ctx.lineTo((itemLineWidth + itemBlockSize) * (selectedItem + 1) + itemLineWidth, itemLineWidth * 2 + itemBlockSize);
        ctx.lineTo((itemLineWidth + itemBlockSize) * selectedItem, itemLineWidth * 2 + itemBlockSize);
        ctx.closePath();
        ctx.stroke();

    }, [selectedItem, items]);

    useEffect(() => {
        const canvasElem = document.getElementById("canvas");
        const ctx = canvasElem.getContext("2d");
        fieldDraw(ctx, height, width, field);
    }, [field]);

    return (
        <div className="container">
            <h1 className="heading">盤面編集</h1>
            <canvas width={items.length * (itemLineWidth + itemBlockSize) + itemLineWidth} height={itemLineWidth * 2 + itemBlockSize} id="items"></canvas>
            <canvas width={width * (lineWidth + blockSize) + lineWidth} height={height * (lineWidth + blockSize) + lineWidth} id="canvas"></canvas>
        </div>
    );
}

export default EditMap;