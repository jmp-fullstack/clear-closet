import { React, useState } from "react";

import "./SellCategoryModal.css";
import Tabs from "../Button/category/Tabs";
import CategoryButton from "../Button/category/CategoryButton";

import { LuPlus } from "react-icons/lu";
import WideModal from "./WideModal";

const SellCategoryModal = ({ closeModal }) => {
  const categories = {
    상의: [
      "니트",
      "후드",
      "맨투맨",
      "셔츠/블라우스",
      "긴소매 티셔츠",
      "반소매 티셔츠",
      "민소매 티셔츠",
      "카라 티셔츠",
      "베스트",
    ],
    바지: [
      "데님 팬츠",
      "슬랙스",
      "트레이닝/조거팬츠",
      "숏팬츠",
      "코튼 팬츠",
      "레깅스",
      "와이드 팬츠",
    ],
    아우터: [
      "후드 집업",
      "바람막이",
      "코트",
      "롱패딩",
      "숏패딩",
      "패딩 베스트",
      "블루종/MA-1",
      "라이더 자켓",
      "무스탕",
      "트러커 자켓",
      "블레이저",
      "가디건",
      "뽀글이 후리스",
      "사파리 자켓",
    ],
    원피스: ["미니 원피스", "미디 원피스", "롱원피스", "투피스", "점프수트"],
    스커트: ["미니스커트", "미디스커트", "롱스커트"],
  };

  const [currentCategory, setCurrentCategory] = useState(
    Object.keys(categories)[0]
  );

  const handleTabClick = (category) => {
    setCurrentCategory(category);
  };

  return (
    <WideModal isOpen={true}>
      <div className="sellCategory-modal">
        <div className="cancel" onClick={closeModal}>
          <LuPlus size={30} />
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
              onClick={() => console.log(subcategory)}
            />
          ))}
        </div>
      </div>
    </WideModal>
  );
};

export default SellCategoryModal;
