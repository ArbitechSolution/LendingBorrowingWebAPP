import React from "react";

const EyeButton = ({ children }) => {
  const [showText, setShowText] = React.useState(false);
  return (
    <div className="eye-btn-div">
      <button
        className="eye-btn"
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
      >
        i
      </button>
      {showText && <div className="eye-text">{children}</div>}
    </div>
  );
};

export default EyeButton;
