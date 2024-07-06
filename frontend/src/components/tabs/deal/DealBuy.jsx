import React from "react";

import Card from "../../../assets/card/product_sample_1.png";

import "./DealBuy.css";

const DealBuy = () => {
  return (
    <div className="DealBuy">
      <div className="buy-sec">
        <div className="buy">
          <div className="photo">
            <img src={Card} alt="card" className="card" />
          </div>
          <div className="info">
            <div>구찌 x 아디다스 가젤 스니커즈 그린 스웨이드</div>
            <div>신림동 . 2달전</div>
            <div>239,000 원</div>
          </div>
        </div>
        <div className="review"></div>
      </div>
    </div>
  );
};

export default DealBuy;
