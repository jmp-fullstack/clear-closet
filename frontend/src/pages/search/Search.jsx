import React from "react";

import "./Search.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import CategoryTabs from "../../components/Button/category/CategoryTabs";

import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <div className="Search">
      <div className="search-sec">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="상품 및 유저를 검색하세요"
          />
          <IoSearchOutline className="search-icon" size={20} />
        </div>
      </div>
      <div className="cartegory-sec">
        <CategoryTabs />
      </div>
      <BottomNav />
    </div>
  );
};

export default Search;
