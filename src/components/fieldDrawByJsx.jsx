import "./field.css";

/**
 * FieldDrawByJsx
 *
 *
 *
 * @param {Array<Array<Array<string>>>} fields - すべてのターンのfieldのデータ
 * @param {number} turnNum - 表示するターンの番号
 * @param {number} width - fieldの幅
 * @param {number} height - fieldの高さ
 * @param {function} onClick - クリック時の処理 ({x: x, y: y}) => {}
 * @returns {JSX.Element}
 *
 */
const FieldDrawByJsx = (props) => {
  if (
    props.fields[props.turnNum] === undefined ||
    props.fields[props.turnNum].length !== 17
  )
    return <div>loading...</div>;

  const fieldJsx = props.fields[props.turnNum].map((row, i) => {
    return row.map((cell, j) => {
      let className = "";
      if (cell === "0") {
        className = "field_cell_empty";
      } else if (cell === "2") {
        className = "field_cell_wall";
      } else if (cell === "3") {
        className = "field_cell_item";
      } else if (cell === "C") {
        className = "field_cell_cool";
      } else if (cell === "H") {
        className = "field_cell_hot";
      } else {
        className = "field_cell_empty";
      }
      if (props.turnNum !== 0 && (cell !== "C" || cell !== "H")) {
        // if not H or C, add arrow class
        // display arrow to the direction of the next H or C cell
        // moved_up, moved_down, moved_left, moved_right

        const prevCell = props.fields[props.turnNum - 1][i][j];

        if (prevCell === "H") {
          if (i > 0 && props.fields[props.turnNum][i - 1][j] === "H") {
            className += " moved_up";
          } else if (i < 16 && props.fields[props.turnNum][i + 1][j] === "H") {
            className += " moved_down";
          } else if (j > 0 && props.fields[props.turnNum][i][j - 1] === "H") {
            className += " moved_left";
          } else if (j < 14 && props.fields[props.turnNum][i][j + 1] === "H") {
            className += " moved_right";
          }
        } else if (prevCell === "C") {
          if (i > 0 && props.fields[props.turnNum][i - 1][j] === "C") {
            className += " moved_up";
          } else if (i < 16 && props.fields[props.turnNum][i + 1][j] === "C") {
            className += " moved_down";
          } else if (j > 0 && props.fields[props.turnNum][i][j - 1] === "C") {
            className += " moved_left";
          } else if (j < 14 && props.fields[props.turnNum][i][j + 1] === "C") {
            className += " moved_right";
          }
        }
      }

      return (
        <div
          key={j}
          className={`field_cell ${className}`}
          onClick={() => {
            if (props.onClick) props.onClick({ x: j, y: i });
          }}
        ></div>
      );
    });
  });
  return (
    <div
      className="field"
      style={{
        gridTemplateColumns: `repeat(${
          props.fields[props.turnNum][0].length
        }, 1fr)`,
        gridTemplateRows: `repeat(${props.fields[props.turnNum].length}, 1fr)`,
      }}
    >
      {fieldJsx}
    </div>
  );
};
export default FieldDrawByJsx;
