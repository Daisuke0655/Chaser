const fieldDraw = (ctx, height, width, field, blockSize=20, lineWidth=2) => {

    ctx.fillStyle = "#007bff";
    ctx.fillRect(0, 0, width * (lineWidth + blockSize) + lineWidth, height * (lineWidth + blockSize) + lineWidth);
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
            if (field[i][j] === "2") {
                ctx.fillStyle = "#824921";
                ctx.fillRect(
                    j * (lineWidth + blockSize),
                    i * (lineWidth + blockSize),
                    blockSize + lineWidth * 2,
                    blockSize + lineWidth * 2
                );
            } else if (field[i][j] === "C") {
                ctx.fillStyle = "#0000ff";
                ctx.fillRect(
                    j * (lineWidth + blockSize) + lineWidth * 2,
                    i * (lineWidth + blockSize) + lineWidth * 2,
                    blockSize - lineWidth * 2,
                    blockSize - lineWidth * 2
                );
            } else if (field[i][j] === "H") {
                ctx.fillStyle = "#ff0000";
                ctx.fillRect(
                    j * (lineWidth + blockSize) + lineWidth * 2,
                    i * (lineWidth + blockSize) + lineWidth * 2,
                    blockSize - lineWidth * 2,
                    blockSize - lineWidth * 2
                );
            } else if (field[i][j] === "3") {
                ctx.fillStyle = "#ff8888";
                ctx.strokeStyle = "#00ff00";
                ctx.lineWidth = lineWidth;
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
};

export default fieldDraw;