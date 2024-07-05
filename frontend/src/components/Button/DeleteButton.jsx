import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const DeleteButton = ({ onClick }) => {
  //   console.log("LoginButton onClick:", onClick); // 디버깅 추가
  return (
    <Button text="탈퇴" color="#dadada" textcolor="#ffffff" onClick={onClick} />
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
