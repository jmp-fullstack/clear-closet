import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const AiBuyButton = ({ onClick }) => {
  return (
    <Button
      text="AI 추천으로 구매할래요"
      color="#dadada"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

AiBuyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AiBuyButton;
