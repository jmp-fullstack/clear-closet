import React, { useState } from "react";

import Tabs from "../../Button/category/Tabs";
import CategoryButton from "../../Button/category/CategoryButton";
import WideModal from "../WideModal";

import { LuPlus } from "react-icons/lu";

import "./BrendCategoryModal.css";

const BrendCategoryModal = ({ closeModal, setSelectedBrendcategory }) => {
  const categories = {
    베이식: [
      "무신사 스탠다드",
      "토비",
      "브렌슨",
      "소버먼트",
      "글리머",
      "어널러코드",
      "스파오",
      "에이카화이트",
    ],
    영캐주얼: [
      "예일",
      "꼼파뇨",
      "커버낫",
      "슬로우애시드",
      "리",
      "노이아고",
      "와이드 팬츠",
    ],
    여성캐주얼: [
      "마리떼",
      "무신사 스탠다드 우먼",
      "마뗑킴",
      "닉앤니콜",
      "라퍼지 포 우먼",
      "이미스",
    ],
    스트리트: ["트릴리온", "에반드레스", "코드그라피", "스컬프터", "트래블"],
    포멀: ["아웃스탠딩", "라퍼지스토어", "수아레"],
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
      setSelectedBrendcategory(`${currentCategory} > ${selectedSubcategory}`);
      closeModal();
    }
  };

  return (
    <WideModal isOpen={true}>
      <div className="brendCategory-modal">
        <div className="cancel" onClick={closeModal}>
          <LuPlus size={30} />
        </div>
        <div className="title">브랜드를 선택해 주세요</div>
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

export default BrendCategoryModal;
