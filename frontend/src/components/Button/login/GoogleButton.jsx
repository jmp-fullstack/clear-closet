import React from "react";
import PropTypes from "prop-types";
import logo from "../../../assets/logo/Google_logo.png";
import LoginButton from "./AppButton";

const GoogleButton = ({ onClick }) => {
  return (
    <LoginButton
      img={logo}
      text="Google로 시작하기"
      color="#ececec"
      textcolor="#000"
      onClick={onClick}
    />
  );
};

GoogleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoogleButton;
