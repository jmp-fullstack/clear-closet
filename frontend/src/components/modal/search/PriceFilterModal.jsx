import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import "./PriceFilterModal.css";

const PriceFilterModal = ({ isOpen, onClose, activeFilters, onApply }) => {
  const [selectedRange, setSelectedRange] = useState([0, 999999999]);
  const [customRange, setCustomRange] = useState({ min: "", max: "" });

  useEffect(() => {
    if (activeFilters.length === 2) {
      setSelectedRange(activeFilters);
      setCustomRange({ min: activeFilters[0], max: activeFilters[1] });
    }
  }, [activeFilters]);

  const predefinedRanges = [
    { label: "1만원 이하", range: [0, 10000] },
    { label: "1만원 ~ 5만원", range: [10000, 50000] },
    { label: "5만원 ~ 10만원", range: [50000, 100000] },
    { label: "10만원 ~ 15만원", range: [100000, 150000] },
    { label: "15만원 ~ 20만원", range: [150000, 200000] },
    { label: "20만원 이상", range: [200000, 999999999] },
  ];

  const handleApply = () => {
    const rangeToApply =
      selectedRange[0] !== 0 || selectedRange[1] !== 999999999
        ? selectedRange
        : [];
    onApply("price", rangeToApply);
    onClose();
  };

  const handleRangeClick = (range) => {
    if (
      selectedRange[0] === range.range[0] &&
      selectedRange[1] === range.range[1]
    ) {
      setSelectedRange([0, 999999999]);
      setCustomRange({ min: "", max: "" });
    } else {
      setSelectedRange(range.range);
      setCustomRange({ min: range.range[0], max: range.range[1] });
    }
  };

  const handleCustomRangeChange = (type, value) => {
    const newRange = { ...customRange, [type]: value };
    setCustomRange(newRange);
    if (newRange.min !== "" && newRange.max !== "") {
      setSelectedRange([
        parseInt(newRange.min, 10),
        parseInt(newRange.max, 10),
      ]);
    }
  };

  const isApplyButtonActive =
    selectedRange[0] !== 0 || selectedRange[1] !== 999999999;

  if (!isOpen) return null;

  return (
    <div className="price-modal" onClick={onClose}>
      <div className="price-content" onClick={(e) => e.stopPropagation()}>
        <button className="cancel" onClick={onClose}>
          <IoCloseOutline size={30} />
        </button>
        <div className="price-title">가격 범위를 선택하세요</div>
        <div className="predefined-ranges">
          {predefinedRanges.map((range) => (
            <button
              key={range.label}
              className={`range-button ${
                selectedRange[0] === range.range[0] &&
                selectedRange[1] === range.range[1]
                  ? "active"
                  : ""
              }`}
              onClick={() => handleRangeClick(range)}
            >
              {range.label}
            </button>
          ))}
        </div>
        <div className="custom-range">
          <input
            type="number"
            placeholder="최소 가격"
            value={customRange.min}
            onChange={(e) => handleCustomRangeChange("min", e.target.value)}
          />
          <span> ~ </span>
          <input
            type="number"
            placeholder="최대 가격"
            value={customRange.max}
            onChange={(e) => handleCustomRangeChange("max", e.target.value)}
          />
        </div>
        <div className="price-button">
          <button
            className="apply-button"
            onClick={handleApply}
            style={{
              backgroundColor: isApplyButtonActive ? "#8f0456" : "#dadada",
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
