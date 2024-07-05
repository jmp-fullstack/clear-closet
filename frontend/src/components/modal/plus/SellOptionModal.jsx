import React, { useState } from "react";

import WideModal from "../WideModal";

import { IoCloseOutline } from "react-icons/io5";

import "./SellOptionModal.css";

const SellOptionModal = ({
  closeModal,
  setSelectedOption,
  currentCategory,
}) => {
  const filters = {
    color: [
      { name: "노랑", color: "yellow" },
      { name: "빨강", color: "red" },
      { name: "파랑", color: "blue" },
    ],
    size: ["XS", "S", "M", "L", "XL", "2XL 이상", "FREE"],
  };

  const [activeFilters, setActiveFilters] = useState({
    color: [],
    size: [],
  });

  const handleApplyFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const handleConfirmClick = () => {
    if (activeFilters.color.length > 0 || activeFilters.size.length > 0) {
      const selectedOptions = `색상: ${activeFilters.color.join(
        ", "
      )} / 사이즈: ${activeFilters.size.join(", ")}`;
      setSelectedOption(selectedOptions);
      closeModal();
    }
  };

  const isApplyButtonEnabled =
    activeFilters.color.length > 0 || activeFilters.size.length > 0;

  return (
    <WideModal isOpen={true}>
      <div className="sellOption-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">색상과 사이즈를 선택해 주세요</div>
        <div className="color-options">
          {filters.color.map((color) => (
            <div key={color.name} className="color-container">
              <div
                className={`color-button ${
                  activeFilters.color.includes(color.name) ? "active" : ""
                }`}
                onClick={() => handleApplyFilter("color", color.name)}
                style={{ backgroundColor: color.color }}
              ></div>
              <div className="color-name">{color.name}</div>
            </div>
          ))}
        </div>
        <div className="size-option">
          {filters.size.map((size) => (
            <div
              key={size}
              className={`size-item ${
                activeFilters.size.includes(size) ? "active" : ""
              }`}
              onClick={() => handleApplyFilter("size", size)}
            >
              {size}
            </div>
          ))}
        </div>
        <div className="confirm">
          <button
            className="apply-button"
            onClick={handleConfirmClick}
            style={{
              backgroundColor: isApplyButtonEnabled ? "#8f0456" : "#dadada",
              color: "#ffffff",
            }}
          >
            확인
          </button>
        </div>
      </div>
    </WideModal>
  );
};

export default SellOptionModal;
