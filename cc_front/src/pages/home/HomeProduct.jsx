import React from "react";

import "./HomeProduct.css";
import Top from "../../components/top/Top";
import BottomNav from "../../components/BottomNav/BottomNav";

import card from "../../assets/card/card_sample.png";

import { IoIosArrowBack } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { BiSolidHeartSquare } from "react-icons/bi";

const HomeProduct = () => {
  const navigate = useNavigate();

  const handleCardSecClick = () => {
    navigate(`/home`);
  };

  return (
    <div className="HomeProduct">
      <Top />
      <div className="header-sec">
        <div className="back" onClick={handleCardSecClick}>
          <IoIosArrowBack size={26} />
        </div>
        <div className="title">Girls Best</div>
        <div className="alarm">
          <GoBell size={26} />
        </div>
      </div>
      <div className="line"></div>

      <div className="photo-sec">
        <img src={card} alt="Card" className="card" width={355} height={355} />
      </div>

      <div className="product-sec">
        <div className="info">
          <div className="name">Pink Bags</div>
          <div className="interest">
            <BiSolidHeartSquare size={40} />
          </div>
        </div>

        <div className="nickname">@nickname</div>
        <div className="price">가격</div>
        <div className="sentence">소개글</div>
      </div>
      <div className="question-sec">
        <div className="button">버튼</div>
        <div className="write">설명글</div>
      </div>
      <BottomNav />
    </div>
  );
};

export default HomeProduct;
