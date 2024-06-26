import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const SellButton = ({ onClick }) => {
  //   console.log("LoginButton onClick:", onClick); // 디버깅 추가
  return (
    <Button
      text="상품을 판매할래요"
      color="#dadada"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

SellButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SellButton;
