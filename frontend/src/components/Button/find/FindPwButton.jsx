import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const FindPwButton = ({ onClick }) => {
  return (
    <Button
      text="비밀번호 재설정하기"
      color="#dadada"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

FindPwButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FindPwButton;
