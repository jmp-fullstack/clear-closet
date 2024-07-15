import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { article_list } from "../../../api/articles";

import Tabs from "./Tabs";
import CategoryButton from "./CategoryButton";
import FilterButton from "./FilterButton";
import ColorFilterModal from "../../modal/search/ColorFilterModal";
import SizeFilterModal from "../../modal/search/SizeFilterModal";
import PriceFilterModal from "../../modal/search/PriceFilterModal.jsx";
import SortFilterModal from "../../modal/search/SortFilterModal.jsx";

import { IoIosArrowDown } from "react-icons/io";

import "./CategoryTabs.css";

const categories = {
  전체: [
    "니트",
    "후드",
    "맨투맨",
    "셔츠블라우스",
    "긴소매티셔츠",
    "반소매티셔츠",
    "민소매티셔츠",
    "카라티셔츠",
    "베스트",
    "데님 팬츠",
    "슬랙스",
    "트레이닝조거팬츠",
    "숏팬츠",
    "코튼팬츠",
    "레깅스",
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
    "미니원피스",
    "미디원피스",
    "롱원피스",
    "미니스커트",
    "미디스커트",
    "롱스커트",
  ],
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
    "데님 팬츠",
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

const filters = {
  color: [
    { name: "기타색상", color: "#8f0456" },
    { name: "검정", color: "black" },
    { name: "흰색", color: "white" },
    { name: "어두운 회색", color: "#3b3b3b" },
    { name: "회색", color: "gray" },
    { name: "밝은 회색", color: "#d4d4d4" },
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
  ],
  size: ["XS", "S", "M", "L", "XL", "2XL이상", "FREE", "지정안함"],
  sort: ["date_desc", "date_asc", "price_desc", "price_asc"],
};

const CategoryTabs = ({ defaultCategory, defaultSubcategory }) => {
  const [currentCategory, setCurrentCategory] = useState(
    defaultCategory || "전체"
  );
  const [currentSubcategory, setCurrentSubcategory] = useState(
    defaultSubcategory || ""
  );
  const [activeFilters, setActiveFilters] = useState({
    color: [],
    size: [],
    price: [],
    sort: [],
  });
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const loadMoreButtonRef = useRef(null);
  const didMountRef = useRef(false); // 컴포넌트 마운트 상태 추적

  const fetchArticles = useCallback(
    async (reset = false) => {
      try {
        const access = localStorage.getItem("access");
        if (!access) {
          throw new Error("Access token not found");
        }

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
          sPrice:
            activeFilters.price.length === 2
              ? activeFilters.price[0]
              : undefined,
          ePrice:
            activeFilters.price.length === 2
              ? activeFilters.price[1]
              : undefined,
          sort:
            activeFilters.sort.length === 1 ? activeFilters.sort[0] : undefined,
        };

        const data = await article_list(articleData, access, page);
        console.log("Fetched data:", data);
        if (data.results.length === 0) {
          setHasMore(false);
        } else {
          setArticles((prevArticles) => {
            const newArticles = data.results.filter(
              (newArticle) =>
                !prevArticles.some((article) => article.id === newArticle.id)
            );
            return reset ? [...newArticles] : [...prevArticles, ...newArticles];
          });
        }
      } catch (err) {
        console.error("Error fetching article list:", err);
        setHasMore(false);
      }
    },
    [currentCategory, currentSubcategory, activeFilters, page]
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialCategory = params.get("category") || defaultCategory || "전체";
    const initialSubcategory =
      params.get("subcategory") || defaultSubcategory || "";
    setCurrentCategory(initialCategory);
    setCurrentSubcategory(initialSubcategory);
  }, [location.search, defaultCategory, defaultSubcategory]);

  useEffect(() => {
    if (didMountRef.current) {
      setPage(1);
      setArticles([]);
      setHasMore(true);
      fetchArticles(true);
    } else {
      didMountRef.current = true;
    }
  }, [currentCategory, currentSubcategory, activeFilters, fetchArticles]);

  useEffect(() => {
    if (page > 1) {
      fetchArticles();
    }
  }, [page, fetchArticles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreButtonRef.current.style.display = "block";
        } else {
          loadMoreButtonRef.current.style.display = "none";
        }
      },
      { threshold: 1.0 }
    );

    const loadMoreButton = loadMoreButtonRef.current;
    if (loadMoreButton) {
      observer.observe(loadMoreButton);
    }

    return () => {
      if (loadMoreButton) {
        observer.unobserve(loadMoreButton);
      }
    };
  }, [hasMore]);

  const fetchMoreArticles = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const updateURLParams = (params) => {
    const searchParams = new URLSearchParams(location.search);
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        searchParams.set(key, params[key]);
      } else {
        searchParams.delete(key);
      }
    });
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleTabClick = (category) => {
    setCurrentCategory(category);
    setCurrentSubcategory("");
    updateURLParams({ category });
  };

  const handleSubcategoryClick = (subcategory) => {
    setCurrentSubcategory(subcategory);
    updateURLParams({ subcategory });
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
    const newFilters = {
      ...activeFilters,
      [filterType]: selectedFilters.length ? selectedFilters : [],
    };
    setActiveFilters(newFilters);

    const filterParams = {
      category: currentCategory !== "전체" ? currentCategory : undefined,
      subcategory: currentSubcategory || undefined,
      color: newFilters.color.length ? newFilters.color.join(",") : undefined,
      size: newFilters.size.length ? newFilters.size.join(",") : undefined,
      sort: newFilters.sort.length ? newFilters.sort.join(",") : undefined,
      sPrice:
        filterType === "price" && selectedFilters.length
          ? selectedFilters[0]
          : newFilters.price.length
          ? newFilters.price[0]
          : undefined,
      ePrice:
        filterType === "price" && selectedFilters.length
          ? selectedFilters[1]
          : newFilters.price.length
          ? newFilters.price[1]
          : undefined,
    };

    updateURLParams(filterParams);
  };

  const handleCardSecClick = (article_pk) => {
    navigate(`/product?detail=${article_pk}`);
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
        {["color", "size", "price", "sort"].map((filterType) => (
          <FilterButton
            key={filterType}
            label={
              filterType === "color"
                ? "색상"
                : filterType === "size"
                ? "사이즈"
                : filterType === "price"
                ? "가격대"
                : "정렬 기준"
            }
            isActive={activeFilters[filterType].length > 0}
            onClick={() => openModal(filterType)}
            Icon={IoIosArrowDown}
          />
        ))}
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
                  src={
                    article.product.product_images[0]?.image_url ||
                    "기본이미지경로"
                  }
                  alt={article.title}
                  className="card"
                />
                <div className="title">{article.title}</div>
                <div className="price">{article.product.price}원</div>
                <div className="date">{article.create_at}</div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
        {hasMore && (
          <button
            ref={loadMoreButtonRef}
            onClick={fetchMoreArticles}
            className="load-more-button"
          >
            더보기
          </button>
        )}
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
      <PriceFilterModal
        isOpen={isModalOpen && modalContent === "price"}
        onClose={closeModal}
        activeFilters={activeFilters.price}
        onApply={handleApplyFilter}
      />
      <SortFilterModal
        isOpen={isModalOpen && modalContent === "sort"}
        onClose={closeModal}
        sortOptions={filters.sort} // prop 이름 수정
        activeFilters={activeFilters.sort}
        onApply={handleApplyFilter}
      />
    </div>
  );
};

export default CategoryTabs;
