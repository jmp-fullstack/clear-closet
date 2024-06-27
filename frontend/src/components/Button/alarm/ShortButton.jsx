import React from "react";
import PropTypes from "prop-types";
import "./ShortButton.css";

const ShortButton = ({
  img,
  text,
  color = "#007BFF",
  textcolor = "#fff",
  onClick = () => {},
}) => {
  return (
    <button
      className="short-button"
      style={{ backgroundColor: color, color: textcolor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

ShortButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  textcolor: PropTypes.string,
  onClick: PropTypes.func,
};

export default ShortButton;
