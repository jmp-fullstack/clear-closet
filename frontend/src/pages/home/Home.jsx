import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../pages/context/UserContext";
import { list_top_favorited_articles } from "../../api/favorite";

import BottomNav from "../../components/BottomNav/BottomNav";
import { GoBell } from "react-icons/go";
import { GiLargeDress, GiSkirt } from "react-icons/gi";
import { IoShirtSharp } from "react-icons/io5";
import { PiPantsFill, PiHoodieFill } from "react-icons/pi";
import { BsStars } from "react-icons/bs";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Context에서 사용자 정보 가져오기
  const [topArticles, setTopArticles] = useState([]);

  useEffect(() => {
    const fetchTopArticles = async () => {
      try {
        const articles = await list_top_favorited_articles();
        setTopArticles(articles.slice(0, 10));
      } catch (error) {
        console.error("Error fetching favorite list:", error);
      }
    };

    fetchTopArticles();
  }, []);

  const handleSearchClick = (category) => {
    navigate(`/search?category=${category}`);
  };

  const handleSAlarmClick = () => {
    navigate(`/alarm`);
  };

  return (
    <div className="Home">
      <div className="header">
        <div className="left_1">카테고리</div>
        <div className="right">
          <GoBell size={26} onClick={handleSAlarmClick} />
        </div>
      </div>

      <div className="category-sec">
        <div className="item">
          <span className="icon-circle">
            <IoShirtSharp size={28} onClick={() => handleSearchClick("상의")} />
          </span>
          <div className="items-text">상의</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <PiPantsFill size={30} onClick={() => handleSearchClick("하의")} />
          </span>
          <div className="items-text">하의</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <PiHoodieFill
              size={32}
              onClick={() => handleSearchClick("아우터")}
            />
          </span>
          <div className="items-text">아우터</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <GiLargeDress
              size={32}
              onClick={() => handleSearchClick("원피스")}
            />
          </span>
          <div className="items-text">원피스</div>
        </div>
        <div className="item">
          <span className="icon-circle">
            <GiSkirt size={26} onClick={() => handleSearchClick("스커트")} />
          </span>
          <div className="items-text">스커트</div>
        </div>
      </div>

      <div className="welcome">
        <BsStars />
        &nbsp;
        {user.username} 님 환영합니다! &nbsp;
        <BsStars />
      </div>

      <div className="left_2">베스트</div>

      <div className="Home-cards">
        <div className="cards">
          {topArticles.map((article) => (
            <div
              key={article.id}
              className="card-sec"
              onClick={() => handleSearchClick(article.id)}
            >
              <img
                src={article.product.product_images[0].image_url}
                alt="Card"
                className="card"
              />
              <div className="name">{article.title}</div>
              <div className="nickname">@{article.nickname}</div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
