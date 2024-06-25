import React from "react";

import "./Search.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import CategoryTabs from "../../components/Button/category/CategoryTabs";

import { IoSearchOutline } from "react-icons/io5";


const Search = () => {


  return (
    <div className="Search">
      <div className="search-sec">
        <div className="text">상품 및 유저 검색</div>
        <div className="icon">
          <IoSearchOutline size={26} />
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
