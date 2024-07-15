import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import { BsStars } from "react-icons/bs";

const AiBuyButton = ({ onClick }) => {
  return (
    <Button
      text={
        <>
          <BsStars style={{ marginRight: "6px" }} />
          AI 추천으로 구매할래요
        </>
      }
      col
      color="#dadada"
      textcolor="#ffffff"
      onClick={onClick}
    />
  );
};

AiBuyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AiBuyButton;
