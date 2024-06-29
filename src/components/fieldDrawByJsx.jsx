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

      let svg = null;
      if (cell === "H") {
        svg = (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <rect width="100%" height="100%" rx="32" fill="#FF7171" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 32C11 20.4869 17.3255 14.4513 26 11.8696V20C26 20 26.0242 26 32 26C37.9758 26 38 20 38 20L37.9609 11.858C46.6554 14.4271 53 22.4726 53 32C53 41.5131 46.6745 49.5487 38 52.1304L37.9863 44C37.9863 44 37.981 38 32 38C26.019 38 26 44 26 44V52.1304C17.3255 49.5487 11 41.5131 11 32Z"
              fill="white"
            />
          </svg>
        );
      } else if (cell === "C") {
        svg = (
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <rect width="64" height="64" rx="32" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M32 53C41.5131 53 49.5487 46.6745 52.1304 38L32 38C32 38 26 38 26 32C26 26 32 26 32 26H52.1304C49.5487 17.3255 41.5131 11 32 11C20.402 11 11 20.402 11 32C11 43.598 20.402 53 32 53Z"
              fill="white"
            />
          </svg>
        );
      } else if (cell === "3") {
        svg = (
          <svg
            viewBox="0 0 60 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M58 28C43.3156 35.7735 36.6719 41.3714 30 57C23.1944 41.3112 16.7749 35.4709 2 28C16.3436 20.7029 22.1979 14.2866 30 1C38.2197 14.6041 44.0914 21.1231 58 28Z"
              fill="#FFF848"
              stroke="black"
            />
          </svg>
        );
      } else if (cell === "2") {
        // svg = (
        //   <svg
        //     className="field_cell_svg"
        //     viewBox="0 0 100 100"
        //     xmlns="http://www.w3.org/2000/svg"
        //   >
        //     <circle
        //       cx="50"
        //       cy="50"
        //       r="40"
        //       fill={cell === "H" ? "#ff0000" : "#0000ff"}
        //     />
        //   </svg>
        // );
      }

      if (cell === "search") {
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 6V1H6M10 1H18M22 1H30M34 1H39V6M39 10V18M39 22V30M39 34V39H34M30 39H22M18 39H10M6 39H1V34M1 30V22M1 18V10"
            stroke="black"
          />
        </svg>;
      }

      return (
        <div
          key={j}
          className={`field_cell ${className}`}
          onClick={() => {
            if (props.onClick) props.onClick({ x: j, y: i });
          }}
        >
          {svg}
        </div>
      );
    });
  });
  return (
    <div className="field_wrapper">
      <div
        className="field"
        style={{
          gridTemplateColumns: `repeat(${
            props.fields[props.turnNum][0].length
          }, 1fr)`,
          gridTemplateRows: `repeat(${
            props.fields[props.turnNum].length
          }, 1fr)`,
        }}
      >
        {fieldJsx}
      </div>
    </div>
  );
};
export default FieldDrawByJsx;
