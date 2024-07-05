import React from "react";
import BasicButton from "./BasicButton";
import "./CategoryButton.css"; // 스타일을 위한 CSS 파일

const CategoryButton = ({ label, onClick, active }) => {
  return (
    <BasicButton
      className={`category-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </BasicButton>
  );
};

export default CategoryButton;
