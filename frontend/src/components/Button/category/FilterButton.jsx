import React from "react";
import BasicButton from "./BasicButton";
import "./FilterButton.css";

const FilterButton = ({ label, onClick, isActive, Icon }) => {
  return (
    <BasicButton
      className={`filter-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="filter-button-content">
        {label}
        {Icon && <Icon size={16} className="filter-button-icon" />}
      </span>
    </BasicButton>
  );
};

export default FilterButton;
