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
      { name: "어두운 빨강", color: "#8b0000" },
      { name: "빨강", color: "red" },
      { name: "밝은 빨강", color: "#ffa3a3" },
      { name: "어두운 초록", color: "#002b05" },
      { name: "초록", color: "green" },
      { name: "밝은 초록", color: "#8bfd99" },
      { name: "어두운 파랑", color: "#001756" },
      { name: "파랑", color: "blue" },
      { name: "밝은 파랑", color: "#8caaff" },
      { name: "어두운 노랑", color: "#c0bd00" },
      { name: "노랑", color: "yellow" },
      { name: "밝은 노랑", color: "#f5ff89" },
      { name: "어두운 자홍", color: "#930090" },
      { name: "자홍", color: "magenta" },
      { name: "밝은 자홍", color: "#ffa7fe" },
      { name: "어두운 청록", color: "#00a9a9" },
      { name: "청록", color: "cyan" },
      { name: "밝은 청록", color: "#cdffff" },
      { name: "어두운 주황", color: "#bc7700" },
      { name: "주황", color: "orange" },
      { name: "밝은 주황", color: "#ffdda2" },
      { name: "어두운 보라", color: "#4b0043" },
      { name: "보라", color: "purple" },
      { name: "밝은 보라", color: "#d0a4e0" },
      { name: "어두운 분홍", color: "#a11c69" },
      { name: "분홍", color: "#ff0095" },
      { name: "밝은 분홍", color: "#ff8ace" },
      { name: "어두운 라임", color: "#629b00" },
      { name: "라임", color: "#c3ff00" },
      { name: "밝은 라임", color: "#e7ff98" },
      { name: "어두운 갈색", color: "#451b06" },
      { name: "갈색", color: "brown" },
      { name: "밝은 갈색", color: "#e49269" },
      { name: "어두운 회색", color: "#3b3b3b" },
      { name: "회색", color: "gray" },
      { name: "밝은 회색", color: "#d4d4d4" },
      { name: "검정", color: "black" },
      { name: "흰색", color: "white" },
      { name: "기타색상", color: "rainbow" },
    ],
    size: ["XS", "S", "M", "L", "XL", "2XL이상", "FREE", "지정안함"],
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
