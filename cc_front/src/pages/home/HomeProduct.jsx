import React from "react";

import "./HomeProduct.css";
import BottomNav from "../../components/BottomNav/BottomNav";

import card from "../../assets/card/card_sample.png";

import { IoIosArrowBack } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { BiSolidHeartSquare } from "react-icons/bi";
import QuestButton from "../../components/Button/QuestButton";

const HomeProduct = () => {
  const navigate = useNavigate();

  const handleCardSecClick = () => {
    navigate(`/home`);
  };

  const handleQuestClick = () => {
    navigate(`/chat`);
  };

  return (
    <div className="HomeProduct">
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
        <div className="price">45,000 원</div>
        <div className="sentence">거의 새상품이며 택배거래만 가능해요.</div>
      </div>
      <div className="question-sec">
        <div className="button">
          <QuestButton onClick={handleQuestClick} />
        </div>
        <div className="write">설명글</div>
      </div>
      <BottomNav />
    </div>
  );
};

export default HomeProduct;
