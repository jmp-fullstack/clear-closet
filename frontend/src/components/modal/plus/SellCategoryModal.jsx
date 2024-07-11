import React, { useState } from "react";

import Tabs from "../../Button/category/Tabs";
import CategoryButton from "../../Button/category/CategoryButton";
import WideModal from "../WideModal";

import { IoCloseOutline } from "react-icons/io5";

import "./SellCategoryModal.css";

const SellCategoryModal = ({ closeModal, setSelectedCategory }) => {
  const categories = {
    상의: [
      "니트",
      "후드",
      "맨투맨",
      "셔츠블라우스",
      "긴소매티셔츠",
      "반소매티셔츠",
      "민소매티셔츠",
      "카라티셔츠",
      "베스트",
    ],
    하의: [
      "데님팬츠",
      "슬랙스",
      "트레이닝조거팬츠",
      "숏팬츠",
      "코튼팬츠",
      "레깅스",
    ],
    아우터: [
      "후드집업",
      "바람막이",
      "코트",
      "롱패딩",
      "숏패딩",
      "패딩베스트",
      "블루종",
      "레더자켓",
      "무스탕",
      "트러커자켓",
      "블레이저",
      "가디건",
      "뽀글이후리스",
      "사파리자켓",
    ],
    원피스: ["미니원피스", "미디원피스", "롱원피스"],
    스커트: ["미니스커트", "미디스커트", "롱스커트"],
  };

  const [currentCategory, setCurrentCategory] = useState(
    Object.keys(categories)[0]
  );

  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleTabClick = (category) => {
    setCurrentCategory(category);
  };

  const handleCategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleConfirmClick = () => {
    if (selectedSubcategory) {
      setSelectedCategory(`${currentCategory} > ${selectedSubcategory}`);
      closeModal();
    }
  };

  return (
    <WideModal isOpen={true}>
      <div className="sellCategory-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">카테고리를 선택해 주세요</div>
        <div className="line"></div>

        <div className="sticky-tabs">
          <Tabs
            tabs={Object.keys(categories).map((label) => ({ label }))}
            onTabClick={handleTabClick}
          />
        </div>
        <div className="category-buttons">
          {categories[currentCategory].map((subcategory) => (
            <CategoryButton
              key={subcategory}
              label={subcategory}
              onClick={() => handleCategorySelect(subcategory)}
            />
          ))}
          <div className="confirm">
            <button
              className="apply-button"
              onClick={handleConfirmClick}
              style={{
                backgroundColor:
                  selectedSubcategory.length > 0 ? "#8f0456" : "#dadada",
                color: "#ffffff",
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </WideModal>
  );
};

export default SellCategoryModal;
