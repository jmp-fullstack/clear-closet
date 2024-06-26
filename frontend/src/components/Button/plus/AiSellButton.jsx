import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

// import "./AiSellButton.css";

const AiSellButton = ({ onClick }) => {
  return (
    <Button
      text="AI 추천으로 판매할래요"
      color="#dadada"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

AiSellButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AiSellButton;
