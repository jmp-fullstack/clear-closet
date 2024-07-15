import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  img,
  text,
  color = "#007BFF",
  textcolor = "#fff",
  onClick = () => {},
}) => {
  return (
    <button
      className="custom-button"
      style={{ backgroundColor: color, color: textcolor }}
      onClick={onClick}
    >
      {img && (
        <img src={img} alt="" style={{ marginRight: "10px", height: "22px" }} />
      )}
      {text}
    </button>
  );
};

Button.propTypes = {
  img: PropTypes.string,
  text: PropTypes.node.isRequired,
  color: PropTypes.string,
  textcolor: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
