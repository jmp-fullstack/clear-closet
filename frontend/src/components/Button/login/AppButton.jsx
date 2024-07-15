import React from "react";
import PropTypes from "prop-types";
import "./AppButton.css";

const LoginButton = ({
  img,
  text,
  color = "#007BFF",
  textcolor = "#fff",
  onClick = () => {},
}) => {
  return (
    <button
      className="AppButton-button"
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

LoginButton.propTypes = {
  img: PropTypes.string,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  textcolor: PropTypes.string,
  onClick: PropTypes.func,
};

export default LoginButton;
