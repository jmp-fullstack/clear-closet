import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import logo from "../../assets/logo/Google_logo.png";

const GoogleButton = ({ onClick }) => {
  return (
    <Button
      img={logo}
      text="Google로 시작하기"
      color="#eeeeee"
      textcolor="#000"
      onClick={onClick}
    />
  );
};

GoogleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoogleButton;
