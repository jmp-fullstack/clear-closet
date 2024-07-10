import React from "react";
import PropTypes from "prop-types";
import MiniButton from "./MiniButton";

const SellingButton = ({ onClick }) => {
  return (
    <MiniButton
      text="판매중"
      color="#8f0456"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

SellingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SellingButton;
