import React from "react";
import PropTypes from "prop-types";
import ShortButton from "./ShortButton";

const AlarmButton = ({ onClick }) => {
  return (
    <ShortButton
      text="채팅 바로가기"
      color="#8f0456"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

AlarmButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AlarmButton;
