import React from "react";
import PropTypes from "prop-types";
import ShortButton from "../alarm/ShortButton";

const CommentButton = ({ onClick }) => {
  return (
    <ShortButton
      text="받은 댓글 보기"
      color="#dadada"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

CommentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CommentButton;
