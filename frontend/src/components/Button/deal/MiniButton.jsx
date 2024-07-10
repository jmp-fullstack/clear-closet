import React from "react";
import PropTypes from "prop-types";
import "./MiniButton.css";

const MiniButton = ({
  img,
  text,
  color = "#007BFF",
  textcolor = "#fff",
  onClick = () => {},
}) => {
  return (
    <button
      className="mini-button"
      style={{ backgroundColor: color, color: textcolor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MiniButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  textcolor: PropTypes.string,
  onClick: PropTypes.func,
};

export default MiniButton;
