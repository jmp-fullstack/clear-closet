import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import "./PriceFilterModal.css";

const PriceFilterModal = ({
  isOpen,
  onClose,
  prices = [], // 기본값 설정
  activeFilters,
  onApply,
}) => {
  const [selectedPrices, setSelectedPrices] = useState([]);

  useEffect(() => {
    setSelectedPrices(Array.isArray(activeFilters) ? activeFilters : []);
  }, [activeFilters]);

  const handleSizeClick = (price) => {
    setSelectedPrices((prevPrices) =>
      prevPrices.includes(price)
        ? prevPrices.filter((s) => s !== price)
        : [...prevPrices, price]
    );
  };

  const handleApply = () => {
    onApply("price", selectedPrices);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="price-modal" onClick={onClose}>
      <div className="price-content" onClick={(e) => e.stopPropagation()}>
        <button className="cancel" onClick={onClose}>
          <IoCloseOutline size={30} />
        </button>
        <div className="price-title">가격대를 선택하세요</div>
        <div className="price-samples">
          {prices.map((price) => (
            <span
              key={price}
              className={`price-item ${
                selectedPrices.includes(price) ? "active" : ""
              }`}
              onClick={() => handleSizeClick(price)}
            >
              {price}
            </span>
          ))}
        </div>
        <div className="price-button">
          <button
            className="apply-button"
            onClick={handleApply}
            style={{
              backgroundColor:
                selectedPrices.length > 0 ? "#8f0456" : "#dadada",
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

export default PriceFilterModal;
