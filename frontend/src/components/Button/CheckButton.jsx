import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const CheckButton = ({ onClick }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick();
  };

  return (
    <Button
      text="확인"
      color={selected ? "#8f0456" : "#dadada"}
      textcolor="#ffffff"
      onClick={handleClick}
    />
  );
};

CheckButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CheckButton;
