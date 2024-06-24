import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import logo from "../../assets/logo/Kakao_logo.png";

const KakaoButton = ({ onClick }) => {
  return (
    <Button
      img={logo}
      text="카카오톡으로 시작하기"
      color="#fae100"
      textcolor="#000"
      onClick={onClick}
    />
  );
};

KakaoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default KakaoButton;
