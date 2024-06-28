import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const FindButton = ({ onClick }) => {
  return (
    <Button
      text="아이디 찾기"
      color="#dadada"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

FindButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FindButton;
