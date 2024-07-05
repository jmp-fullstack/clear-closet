import React, { useState, useEffect } from "react";
import "./ColorFilterModal.css";

import { IoCloseOutline } from "react-icons/io5";

const ColorFilterModal = ({
  isOpen,
  onClose,
  colors,
  activeFilters,
  onApply,
}) => {
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    setSelectedColors(Array.isArray(activeFilters) ? activeFilters : []);
  }, [activeFilters]);

  const handleColorToggle = (color) => {
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.includes(color.name)
        ? prevSelectedColors.filter((c) => c !== color.name)
        : [...prevSelectedColors, color.name]
    );
  };

  const handleApply = () => {
    onApply("color", selectedColors);
    onClose();
  };

  return (
    isOpen && (
      <div className="color-modal" onClick={onClose}>
        <div className="color-content" onClick={(e) => e.stopPropagation()}>
          <div className="cancel">
            <IoCloseOutline size={30} onClick={onClose} />
          </div>
          <div className="title">색상을 선택하세요</div>
          <div className="color-options">
            {colors.map((color) => (
              <div className="color-item" key={color.name}>
                <button
                  className={`color-button ${
                    selectedColors.includes(color.name) ? "selected" : ""
                  }`}
                  onClick={() => handleColorToggle(color)}
                  style={{ backgroundColor: color.color }}
                />
                <div className="color-name">{color.name}</div>
              </div>
            ))}
          </div>
          <div className="button">
            <button
              className="apply-button"
              onClick={handleApply}
              style={{
                backgroundColor:
                  selectedColors.length > 0 ? "#8f0456" : "#dadada",
                color: "#ffffff",
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ColorFilterModal;
