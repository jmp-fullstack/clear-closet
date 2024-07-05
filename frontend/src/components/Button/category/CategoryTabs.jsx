import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Tabs from "./Tabs";
// import card from "../../../assets/card/card_sample_2.png";
import CategoryButton from "./CategoryButton";
import FilterButton from "./FilterButton";
import ColorFilterModal from "../../modal/search/ColorFilterModal";
import SizeFilterModal from "../../modal/search/SizeFilterModal";
import { article_list } from "../../../api/articles";

import { IoIosArrowDown, IoIosArrowDropdown } from "react-icons/io";

import "./CategoryTabs.css";

const categories = {
  전체: ["반소매 티셔츠", "숏팬츠", "코튼 팬츠"],
  상의: ["니트", "후드", "맨투맨"],
  바지: ["데님 팬츠", "슬랙스", "트레이닝/조거팬츠"],
  아우터: ["후드 집업", "바람막이", "코트"],
  원피스: ["미니 원피스", "미디 원피스", "롱원피스"],
  스커트: ["미니스커트", "미디스커트", "롱스커트"],
};

const filters = {
  color: [
    { name: "노랑", color: "yellow" },
    { name: "빨강", color: "red" },
    { name: "파랑", color: "blue" },
  ],
  size: ["XS", "S", "M", "L", "XL", "2XL 이상", "FREE"],
  condition: ["New", "Used"],
  availability: ["In Stock", "Out of Stock"],
};

const CategoryTabs = ({ defaultCategory, defaultSubcategory }) => {
  const [currentCategory, setCurrentCategory] = useState(
    defaultCategory || "전체"
  );
  const [currentSubcategory, setCurrentSubcategory] = useState(
    defaultSubcategory || ""
  );
  const [activeFilters, setActiveFilters] = useState({
    condition: [],
    availability: [],
    color: [],
    size: [],
  });
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (defaultCategory) {
      setCurrentCategory(defaultCategory);
    }
    if (defaultSubcategory) {
      setCurrentSubcategory(defaultSubcategory);
    }
  }, [defaultCategory, defaultSubcategory]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // 헤더에서 액세스 토큰 가져오기
        const access = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access="))
          ?.split("=")[1];

        const articleData = {
          top_category:
            currentCategory !== "전체" ? currentCategory : undefined,
          bottom_category: currentSubcategory || undefined,
          color: activeFilters.color.length
            ? activeFilters.color.join(",")
            : undefined,
          size: activeFilters.size.length
            ? activeFilters.size.join(",")
            : undefined,
          condition: activeFilters.condition.length
            ? activeFilters.condition.join(",")
            : undefined,
          availability: activeFilters.availability.length
            ? activeFilters.availability.join(",")
            : undefined,
          sPrice: 9000, // Example value, adjust as needed
          ePrice: 50000, // Example value, adjust as needed
          isSort: "asc", // Example value, adjust as needed
          page: 1, // Example value, adjust as needed
          limit: 20, // Example value, adjust as needed
        };
        console.log("Fetching articles with data:", articleData);

        if (access) {
          const data = await article_list(articleData, access);
          console.log("Fetched articles:", data.results);
          setArticles(data.results);
        }
      } catch (error) {
        console.error("Error fetching article list:", error);
      }
    };

    fetchArticles();
  }, [currentCategory, currentSubcategory, activeFilters]);

  const handleTabClick = (category) => {
    setCurrentCategory(category);
    setCurrentSubcategory(""); // Reset subcategory when main category is clicked
    navigate(`/search?category=${category}`);
  };

  const handleSubcategoryClick = (subcategory) => {
    setCurrentSubcategory(subcategory);
    navigate(`/search?category=${currentCategory}&subcategory=${subcategory}`);
  };

  const handleFilterClick = (filterType, filterValue) => {
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[filterType]?.includes(filterValue)) {
        newFilters[filterType] = newFilters[filterType].filter(
          (value) => value !== filterValue
        );
      } else {
        newFilters[filterType].push(filterValue);
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

  const handleCardSecClick = (cardSec) => {
    navigate(`/product?cardsec=${cardSec}`);
  };

  return (
    <div className="CategoryTabs">
      <div className="sticky-tabs">
        <Tabs
          tabs={Object.keys(categories).map((label) => ({ label }))}
          onTabClick={handleTabClick}
          defaultActiveTab={currentCategory}
        />
      </div>
      <div className="category-buttons">
        {(categories[currentCategory] || []).map((subcategory) => (
          <CategoryButton
            key={subcategory}
            label={subcategory}
            onClick={() => handleSubcategoryClick(subcategory)}
            active={currentSubcategory === subcategory}
          />
        ))}
      </div>

      <div className="line"></div>

      <div className="filter-buttons">
        <FilterButton
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
          {articles.length > 0 ? (
            articles.map((article) => (
              <div
                key={article.id}
                className="card-sec"
                onClick={() => handleCardSecClick(article.id)}
              >
                <img
                  src={article.product.product_images[0].image_url}
                  alt={article.title}
                  className="card"
                />
                <div className="name">{article.title}</div>
                <div className="nickname">{article.product.price}원</div>
              </div>
            ))
          ) : (
            <p>No articles found</p>
          )}
        </div>
      </div>
      <ColorFilterModal
        isOpen={isModalOpen && modalContent === "color"}
        onClose={closeModal}
        colors={filters.color}
        activeFilters={activeFilters.color}
        onApply={handleApplyFilter}
      />
      <SizeFilterModal
        isOpen={isModalOpen && modalContent === "size"}
        onClose={closeModal}
        sizes={filters.size}
        activeFilters={activeFilters.size}
        onApply={handleApplyFilter}
      />
    </div>
  );
};

export default CategoryTabs;
