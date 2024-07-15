import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

import "./SortFilterModal.css";

const sortMapping = {
  date_desc: "최신순",
  date_asc: "오래된순",
  price_desc: "가격 높은순",
  price_asc: "가격 낮은순",
};

const SortFilterModal = ({
  isOpen,
  onClose,
  sortOptions = [], // prop 이름 수정 및 기본값 설정
  activeFilters,
  onApply,
}) => {
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    setSelectedSort(activeFilters.length ? activeFilters[0] : "");
  }, [activeFilters]);

  const handleSortClick = (sort) => {
    if (selectedSort === sort) {
      setSelectedSort("");
    } else {
      setSelectedSort(sort);
    }
  };

  const handleApply = () => {
    onApply("sort", selectedSort ? [selectedSort] : []);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="sort-modal" onClick={onClose}>
      <div className="sort-content" onClick={(e) => e.stopPropagation()}>
        <button className="cancel" onClick={onClose}>
          <IoCloseOutline size={30} />
        </button>
        <div className="sort-title">정렬 기준을 선택하세요</div>
        <div className="sort-samples">
          {sortOptions.map((sort) => (
            <span
              key={sort}
              className={`sort-item ${selectedSort === sort ? "active" : ""}`}
              onClick={() => handleSortClick(sort)}
            >
              {sortMapping[sort]}
            </span>
          ))}
        </div>
        <div className="sort-button">
          <button
            className="apply-button"
            onClick={handleApply}
            style={{
              backgroundColor: selectedSort ? "#8f0456" : "#dadada",
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

export default SortFilterModal;
