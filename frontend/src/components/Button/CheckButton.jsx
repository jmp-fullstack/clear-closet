import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const CheckButton = ({ onClick }) => {
  //   console.log("LoginButton onClick:", onClick); // 디버깅 추가
  return (
    <Button text="확인" color="#dadada" textcolor="#ffffff" onClick={onClick} />
  );
};

CheckButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CheckButton;
