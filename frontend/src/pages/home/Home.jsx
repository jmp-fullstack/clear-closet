import React from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav/BottomNav";

import { GoBell } from "react-icons/go";
import { GiLargeDress, GiSkirt } from "react-icons/gi";
import { IoShirtSharp } from "react-icons/io5";
import { PiPantsFill, PiHoodieFill } from "react-icons/pi";

import card from "../../assets/card/card_sample.png";

import "./Home.css";

const Home = (cardSec) => {
  const navigate = useNavigate();

  const handleCardSecClick = () => {
    navigate(`/home_product?cardsec=${cardSec}`);
  };
  const handleSearchClick = () => {
    navigate(`/search`);
  };

  return (
    <div className="Home">
      <div className="header">
        <div className="left_1">Category</div>
        <div className="right">
          <GoBell size={26} />
        </div>
      </div>

      <div className="category-sec">
        <div className="item">
          <span className="icon-circle">
            <IoShirtSharp size={28} onClick={handleSearchClick} />
          </span>
          <div className="items-text">Top</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <PiPantsFill size={30} onClick={handleSearchClick} />
          </span>
          <div className="items-text">Bottom</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <PiHoodieFill size={32} onClick={handleSearchClick} />
          </span>
          <div className="items-text">Outer</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <GiLargeDress size={32} onClick={handleSearchClick} />
          </span>
          <div className="items-text">Dress</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <GiSkirt size={26} onClick={handleSearchClick} />
          </span>
          <div className="items-text">Skirt</div>
        </div>
      </div>
      <div className="line"></div>

      <div className="left_2">Best</div>

      <div className="cards-container">
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
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
