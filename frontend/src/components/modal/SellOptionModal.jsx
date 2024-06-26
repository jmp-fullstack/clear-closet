import { React, useState, useEffect } from "react";

import "./SellOptionModal.css";

import { LuPlus } from "react-icons/lu";
import WideModal from "./WideModal";
import CheckButton from "../Button/CheckButton";

const SellOptionModal = ({
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
    <WideModal isOpen={isOpen}>
      <div className="sellOption-modal">
        <div className="cancel" onClick={onClose}>
          <LuPlus size={30} />
        </div>

        <div className="modal-title">색상을 선택하세요</div>
        <div className="line"></div>
        <div className="color-options">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`color-button ${
                selectedColors.includes(color.name) ? "selected" : ""
              }`}
              onClick={() => handleColorToggle(color)}
              style={{ backgroundColor: color.color }}
            >
              {color.name}
            </button>
          ))}
        </div>

        <div className="confirm">
          <CheckButton type="button" onClick={handleApply} />
        </div>
      </div>
    </WideModal>
  );
};

export default SellOptionModal;
