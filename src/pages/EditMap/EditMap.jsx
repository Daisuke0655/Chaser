import React, { useEffect, useState } from "react";
import "./EditMap.css";
import fieldDraw from "../../components/fieldDraw"; // fieldDrawメソッドの実装を確認してください

const items = [
    { "char": ".", "index": 0 },
    { "char": "2", "index": 1 },
    { "char": "3", "index": 2 },
    { "char": "C", "index": 3 },
    { "char": "H", "index": 4 },
];

const height = 17;
const width = 15;
const lineWidth = 2;
const blockSize = 20;
const itemLineWidth = 4;
const itemBlockSize = 40;
const defaultMap = [
    '000300000300000',
    '0C0000000000000',
    '000300030000300',
    '022200000000003',
    '000003000300030',
    '003000003000000',
    '000000000000220',
    '000300030000000',
    '023000030000032',
    '300000000003000',
    '020200000000000',
    '000000003000300',
    '000300030000300',
    '300000000002220',
    '000003000003000',
    '0000000000000H0',
    '000003000003000'
]
function structuredClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const EditMap = ({onClose,onSave}) => {
    // const [field, setField] = useState(() => {
    //     const defaultField = [];
    //     for (let i = 0; i < height; i++) {
    //         defaultField.push(Array(width).fill('0'));
    //     }
    //     defaultField[0][0] = "C";
    //     defaultField[height - 1][width - 1] = "H";
    //     return defaultField;
    // });
    const [field, setField] = useState(() => {
        return defaultMap.map((row) => {return row.split("")})
    })
    const [selectedItem, setSelectedItem] = useState(0);

    useEffect(() => {
        const canvasElem = document.getElementById("items");
        const ctx = canvasElem.getContext("2d");
        fieldDraw(ctx, 1, items.length, [["0", "2", "3", "C", "H"]], itemBlockSize, itemLineWidth);

        ctx.strokeStyle = "#ff0000"; //選択されたアイテムを赤枠で囲う
        ctx.lineWidth = itemLineWidth;
        ctx.beginPath();
        ctx.moveTo((itemLineWidth + itemBlockSize) * selectedItem, 0);
        ctx.lineTo((itemLineWidth + itemBlockSize) * (selectedItem + 1) + itemLineWidth, 0);
        ctx.lineTo((itemLineWidth + itemBlockSize) * (selectedItem + 1) + itemLineWidth, itemLineWidth * 2 + itemBlockSize);
        ctx.lineTo((itemLineWidth + itemBlockSize) * selectedItem, itemLineWidth * 2 + itemBlockSize);
        ctx.closePath();
        ctx.stroke();

    }, [selectedItem]);

    useEffect(() => {
        const canvasElem = document.getElementById("canvas");
        const ctx = canvasElem.getContext("2d");
        fieldDraw(ctx, height, width, field);
    }, [field]);

    const handleItemClicked = (ev) => {
        const rect = ev.target.getBoundingClientRect();
        let x = ev.clientX - rect.left;
        let slct = Math.floor(x / (itemBlockSize + itemLineWidth));
        if (0 <= slct && slct < items.length) setSelectedItem(slct);
    };

    const handleFieldClicked = (ev) => {
        const rect = ev.target.getBoundingClientRect();
        let x = ev.clientX - rect.left;
        let y = ev.clientY - rect.top;
        let slctx = Math.floor(x / (blockSize + lineWidth));
        let slcty = Math.floor(y / (blockSize + lineWidth));
        if (0 <= slctx && slctx < width && 0 <= slcty && slcty < height) {
            let newField = structuredClone(field);
            if(selectedItem === 3 || selectedItem === 4) { //CかHを置くとき
                for(let i = 0; i < height; i++) {
                    for(let j = 0; j < width; j++) {
                        if(newField[i][j] === "H" || newField[i][j] === "C") newField[i][j] = "0";
                    }
                }
                if(selectedItem === 3) {
                    newField[slcty][slctx] = "C";
                    newField[height - slcty - 1][width - slctx - 1] = "H";
                } else {
                    newField[slcty][slctx] = "H";
                    newField[height - slcty - 1][width - slctx - 1] = "C";
                }
            } else {
                if(newField[slcty][slctx] === "C" || newField[slcty][slctx] === "H") return;
                newField[slcty][slctx] = items[selectedItem].char;
                newField[height - slcty - 1][width - slctx - 1] = items[selectedItem].char;
            }
            setField(newField);
        }
    };

    const handleExport = () => {
        const newContent = field.map((row) => row.join(""));
        onSave(newContent);
        onClose();
    };

    return (
        <div className="container">
            <h1 className="heading">盤面編集</h1>
            <canvas onClick={handleItemClicked} width={items.length * (itemLineWidth + itemBlockSize) + itemLineWidth} height={itemLineWidth * 2 + itemBlockSize} id="items"></canvas>
            <canvas onClick={handleFieldClicked} width={width * (lineWidth + blockSize) + lineWidth} height={height * (lineWidth + blockSize) + lineWidth} id="canvas"></canvas>
            <br></br>
            <button id="export" onClick={handleExport}>保存</button>
        </div>
    );
}

export default EditMap;
