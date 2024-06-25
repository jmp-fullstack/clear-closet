import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const QuestButton = ({ onClick }) => {
  return (
    <Button
      text="판매자에게 문의 할래요"
      color="#8f0456"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

QuestButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default QuestButton;
