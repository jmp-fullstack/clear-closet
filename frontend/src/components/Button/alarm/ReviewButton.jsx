import React from "react";
import PropTypes from "prop-types";
import ShortButton from "./ShortButton";

const ReviewButton = ({ onClick }) => {
  return (
    <ShortButton
      text="리뷰 작성하기"
      color="#8f0456"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

ReviewButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ReviewButton;
