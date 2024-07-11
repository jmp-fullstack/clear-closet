import React from "react";
import { useNavigate } from "react-router-dom";

import SellingButton from "../../Button/deal/SellingButton";
import ReviewButton from "../../Button/deal/ReviewButton";
import Card from "../../../assets/card/product_sample_1.png";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

import "./DealSell.css";

const DealSell = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/search");
  };

  return (
    <div className="DealSell">
      <div className="sell-sec">
        <div className="sell">
          <div className="photo">
            <img src={Card} alt="card" className="card" />
          </div>
          <div className="info">
            <div className="deal-title">
              구찌 x 아디다스 가젤 스니커즈 그린 스웨이드
            </div>
            <div className="where">신림동 . 2달전</div>
            <div className="price">
              <SellingButton onClick={handleClick} />
              239,000 원
            </div>
          </div>
        </div>
        <div className="review-sec">
          <div className="review">
            <ReviewButton onClick={handleClick} />
          </div>
          <div className="add">
            <HiOutlineDotsHorizontal size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealSell;
