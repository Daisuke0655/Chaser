import "./popUp.css";

/**
 * PopUp component
 *
 * @param {JSX.Element} props.children
 * @param {boolean} props.show
 * @param {function} props.close
 *
 * @returns {JSX.Element}
 */
const PopUp = ({ children, onClose, allowClose }) => {
  const handleClose = () => {
    if (allowClose) {
      onClose();
    }
  };
  return (
    <div className="popup_background" onClick={handleClose}>
      <div className="popup">
        {
          // If allowClose is false, don't show the close button
          allowClose && (
            <button className="close" onClick={handleClose}>
              X
            </button>
          )
        }
        {children}
      </div>
    </div>
  );
};
export default PopUp;
