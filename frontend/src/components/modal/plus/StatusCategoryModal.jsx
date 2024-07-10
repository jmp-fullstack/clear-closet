import React, { useState } from "react";

import CategoryButton from "../../Button/category/CategoryButton";
import ShortModal from "../my/ShortModal";

import { IoCloseOutline } from "react-icons/io5";

import "./StatusCategoryModal.css";

const StatusCategoryModal = ({ closeModal, setSelectedStatusCategory }) => {
  // 수정된 부분
  const categories = [
    "새 상품",
    "거의 새 상품",
    "사용감 있는 깨끗한 상품",
    "사용흔적이 많이 있는 상품",
    "새 상품(미개봉)",
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleConfirmClick = () => {
    if (selectedCategory) {
      setSelectedStatusCategory(selectedCategory); // 수정된 부분
      closeModal();
    }
  };

  return (
    <ShortModal isOpen={true}>
      <div className="statusCategory-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">상태를 선택해 주세요</div>
        <div className="line"></div>
        <div className="category-buttons">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              label={category}
              onClick={() => handleCategorySelect(category)}
              active={selectedCategory === category}
            />
          ))}
          <div className="confirm">
            <button
              className="apply-button"
              onClick={handleConfirmClick}
              style={{
                backgroundColor:
                  selectedCategory.length > 0 ? "#8f0456" : "#dadada",
                color: "#ffffff",
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </ShortModal>
  );
};

export default StatusCategoryModal;
