import React, { useState } from "react";
import FilterButton from "../Button/category/FilterButton";
import "./Modal.css";
import CheckButton from "../Button/CheckButton";

import { LuPlus } from "react-icons/lu";

const SizeFilterModal = ({
  isOpen,
  onClose,
  sizes,
  activeFilters,
  onApply,
}) => {
  const [selectedSizes, setSelectedSizes] = useState(activeFilters.size || []);

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
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="cancel" onClick={onClose}>
          <LuPlus size={30} />
        </button>
        <div className="modal-title">사이즈를 선택하세요</div>
        <div className="line"></div>

        <div className="size-samples">
          {sizes.map((size) => (
            <FilterButton
              key={size}
              label={size}
              isActive={selectedSizes.includes(size)}
              onClick={() => handleSizeClick(size)}
            />
          ))}
        </div>
        <div className="modal-button">
          <CheckButton onClick={handleApply} />
        </div>
      </div>
    </div>
  );
};

export default SizeFilterModal;
