import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const AiButton = ({ onClick }) => {
  //   console.log("LoginButton onClick:", onClick); // 디버깅 추가
  return (
    <Button
      text="AI 측정하기"
      color="#dadada"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

AiButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AiButton;
