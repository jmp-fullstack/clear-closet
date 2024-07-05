import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsername } from "../../api/auth";

import BottomNav from "../../components/BottomNav/BottomNav";

import { GoBell } from "react-icons/go";
import { GiLargeDress, GiSkirt } from "react-icons/gi";
import { IoShirtSharp } from "react-icons/io5";
import { PiPantsFill, PiHoodieFill } from "react-icons/pi";
import { BsStars } from "react-icons/bs";

import card from "../../assets/card/card_sample.png";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = getUsername();
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSearchClick = (category) => {
    navigate(`/search?category=${category}`);
  };

  const handleProductClick = (cardSec) => {
    navigate(`/product?cardsec=${cardSec}`);
  };

  const handleSAlarmClick = () => {
    navigate(`/alarm`);
  };

  return (
    <div className="Home">
      <div className="header">
        <div className="left_1">Category</div>
        <div className="right">
          <GoBell size={26} onClick={handleSAlarmClick} />
        </div>
      </div>

      <div className="category-sec">
        <div className="item">
          <span className="icon-circle">
            <IoShirtSharp size={28} onClick={() => handleSearchClick("상의")} />
          </span>
          <div className="items-text">Top</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <PiPantsFill size={30} onClick={() => handleSearchClick("바지")} />
          </span>
          <div className="items-text">Bottom</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <PiHoodieFill
              size={32}
              onClick={() => handleSearchClick("아우터")}
            />
          </span>
          <div className="items-text">Outer</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <GiLargeDress
              size={32}
              onClick={() => handleSearchClick("원피스")}
            />
          </span>
          <div className="items-text">Dress</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <GiSkirt size={26} onClick={() => handleSearchClick("스커트")} />
          </span>
          <div className="items-text">Skirt</div>
        </div>
      </div>

      <div className="welcome">
        <BsStars />
        &nbsp;
        {username} 님 환영합니다! &nbsp;
        <BsStars />
      </div>

      <div className="left_2">Best</div>

      <div className="Home-cards">
        <div className="cards">
          <div className="card-sec" onClick={handleProductClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="nickname">@nickname</div>
          </div>
          <div className="card-sec" onClick={handleProductClick}>
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
