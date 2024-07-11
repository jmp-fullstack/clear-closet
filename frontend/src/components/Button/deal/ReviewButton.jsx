import React from "react";
import PropTypes from "prop-types";
import ShortButton from "../../Button/alarm/ShortButton";

const ReviewButton = ({ onClick }) => {
  return (
    <ShortButton
      text="받은 후기 보기"
      color="#dadada"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

ReviewButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ReviewButton;
