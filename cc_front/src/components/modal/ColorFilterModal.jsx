import React, { useState, useEffect } from 'react';
import './ColorFilterModal.css';

import CheckButton from "../Button/CheckButton";

import { LuPlus } from "react-icons/lu";

const ColorFilterModal = ({ isOpen, onClose, colors, activeFilters, onApply }) => {
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
    onApply('color', selectedColors);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className='cancel' onClick={onClose}>
          <LuPlus size={30}/>
        </button>
          <div className='modal-title'>색상을 선택하세요</div>
          <div className='line'></div>
          <div className="color-options">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`color-button ${selectedColors.includes(color.name) ? 'selected' : ''}`}
                onClick={() => handleColorToggle(color)}
                style={{ backgroundColor: color.color }}
              >
                {color.name}
              </button>
            ))}
          </div>
          <div className='modal-button' onClick={handleApply}>
            <CheckButton />
          </div>
          
        </div>
      </div>
    )
  );
};

export default ColorFilterModal;
