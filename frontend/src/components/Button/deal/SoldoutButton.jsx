import React from "react";
import PropTypes from "prop-types";
import MiniButton from "./MiniButton";

const SoldoutButton = ({ onClick }) => {
  return (
    <MiniButton
      text="판매완료"
      color="#dadada"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

SoldoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SoldoutButton;
