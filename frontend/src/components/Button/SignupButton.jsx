import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const SignupButton = ({ onClick }) => {
  //   console.log("LoginButton onClick:", onClick); // 디버깅 추가
  return (
    <Button
      text="가입하기"
      color="#8f0456"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

SignupButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SignupButton;
