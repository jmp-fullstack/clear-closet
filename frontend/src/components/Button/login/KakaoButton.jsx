import React from "react";
import PropTypes from "prop-types";
import logo from "../../../assets/logo/Kakao_logo.png";
import LoginButton from "./AppButton";

const KakaoButton = ({ onClick }) => {
  return (
    <LoginButton
      img={logo}
      text="카카오톡으로 시작하기"
      color="#fae100"
      textcolor="#fff"
      onClick={onClick}
    />
  );
};

KakaoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default KakaoButton;
