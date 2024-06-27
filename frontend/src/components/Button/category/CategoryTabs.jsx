import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import card from "../../../assets/card/card_sample_2.png";

import CategoryButton from "./CategoryButton";
import FilterButton from "./FilterButton";
import ColorFilterModal from "../../modal/ColorFilterModal";
import SizeFilterModal from "../../modal/SizeFilterModal";

import "./CategoryTabs.css";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";

const categories = {
  전체: [
    "반소매 티셔츠",
    "숏팬츠",
    "코튼 팬츠",
    "미니스커트",
    "니트",
    "후드",
    "맨투맨",
    "셔츠/블라우스",
    "긴소매 티셔츠",
    "민소매 티셔츠",
    "카라 티셔츠",
    "베스트",
    "데님 팬츠",
    "슬랙스",
    "트레이닝/조거팬츠",
    "레깅스",
    "와이드 팬츠",
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
    "미니 원피스",
    "미디 원피스",
    "롱원피스",
    "투피스",
    "점프수트",
    "미디스커트",
    "롱스커트",
  ],
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

const filters = {
  color: [
    { name: "노랑", color: "yellow" },
    { name: "빨강", color: "red" },
    { name: "파랑", color: "blue" },
    { name: "초록", color: "green" },
    { name: "검정", color: "black" },
    { name: "흰색", color: "white" },
  ],
  size: ["XS", "S", "M", "L", "XL", "2XL 이상", "FREE"],
  condition: ["New", "Used"],
  availability: ["In Stock", "Out of Stock"],
};

const CategoryTabs = (cardSec) => {
  const [currentCategory, setCurrentCategory] = useState(
    Object.keys(categories)[0]
  );
  const [activeFilters, setActiveFilters] = useState({
    condition: [],
    availability: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleTabClick = (category) => {
    setCurrentCategory(category);
  };

  const handleFilterClick = (filterType, filterValue) => {
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[filterType]?.includes(filterValue)) {
        newFilters[filterType] = newFilters[filterType].filter(
          (value) => value !== filterValue
        );
      } else {
        newFilters[filterType].push(filterValue); // 여기서 배열에 값을 추가
      }
      return newFilters;
    });
  };

  const isFilterActive = (filterType, filterValue) => {
    return activeFilters[filterType]?.includes(filterValue) ?? false;
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleApplyFilter = (filterType, selectedFilters) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedFilters,
    }));
  };

  const navigate = useNavigate();
  const handleCardSecClick = () => {
    navigate(`/home_product?cardsec=${cardSec}`);
  };

  return (
    <div className="CategoryTabs">
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

      <div className="line"></div>

      <div className="filter-buttons">
        <FilterButton
          IoIosArrowDown
          label="색상"
          isActive={false}
          onClick={() => openModal("color")}
          Icon={IoIosArrowDown}
        />
        <FilterButton
          label="사이즈"
          isActive={false}
          onClick={() => openModal("size")}
          Icon={IoIosArrowDown}
        />
        <FilterButton
          Icon={IoIosArrowDropdown}
          label="새상품"
          isActive={isFilterActive("condition", "New")}
          onClick={() => handleFilterClick("condition", "New")}
        />
        <FilterButton
          Icon={IoIosArrowDropdown}
          label="품절제외"
          isActive={isFilterActive("availability", "In Stock")}
          onClick={() => handleFilterClick("availability", "In Stock")}
        />
      </div>
      <div className="category-content">
        <div className="cards">
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="nickname">@nickname</div>
          </div>
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="nickname">@nickname</div>
          </div>
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="nickname">@nickname</div>
          </div>
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="nickname">@nickname</div>
          </div>
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="nickname">@nickname</div>
          </div>
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="nickname">@nickname</div>
          </div>
        </div>
      </div>
      <ColorFilterModal
        isOpen={isModalOpen && modalContent === "color"}
        onClose={closeModal}
        colors={filters.color}
        activeFilters={activeFilters}
        onApply={handleApplyFilter}
      />
      <SizeFilterModal
        isOpen={isModalOpen && modalContent === "size"}
        onClose={closeModal}
        sizes={filters.size}
        activeFilters={activeFilters}
        onApply={handleApplyFilter}
      />
    </div>
  );
};

export default CategoryTabs;
