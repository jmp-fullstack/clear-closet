import React, { useState, useEffect } from "react";

import { IoCloseOutline } from "react-icons/io5";

import "./SizeFilterModal.css";

const SizeFilterModal = ({
  isOpen,
  onClose,
  sizes,
  activeFilters,
  onApply,
}) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    setSelectedSizes(Array.isArray(activeFilters) ? activeFilters : []);
  }, [activeFilters]);

  const handleSizeClick = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleApply = () => {
    onApply("size", selectedSizes);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="size-modal" onClick={onClose}>
      <div className="size-content" onClick={(e) => e.stopPropagation()}>
        <button className="cancel" onClick={onClose}>
          <IoCloseOutline size={30} />
        </button>
        <div className="size-title">사이즈를 선택하세요</div>
        <div className="size-samples">
          {sizes.map((size) => (
            <span
              key={size}
              className={`size-item ${
                selectedSizes.includes(size) ? "active" : ""
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </span>
          ))}
        </div>
        <div className="size-button">
          <button
            className="apply-button"
            onClick={handleApply}
            style={{
              backgroundColor: selectedSizes.length > 0 ? "#8f0456" : "#dadada",
              color: "#ffffff",
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeFilterModal;
