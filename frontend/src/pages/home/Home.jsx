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
  const { user, loading } = useUser(); // Context에서 사용자 정보와 로딩 상태 가져오기
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

  const handleCardSecClick = (article_pk) => {
    navigate(`/product?detail=${article_pk}`);
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
        <div className="item" onClick={() => handleSearchClick("상의")}>
          <span className="icon-circle">
            <IoShirtSharp size={28} />
          </span>
          <div className="items-text">상의</div>
        </div>
        <div className="item" onClick={() => handleSearchClick("하의")}>
          <span className="icon-circle">
            <PiPantsFill size={30} />
          </span>
          <div className="items-text">하의</div>
        </div>
        <div className="item" onClick={() => handleSearchClick("아우터")}>
          <span className="icon-circle">
            <PiHoodieFill size={32} />
          </span>
          <div className="items-text">아우터</div>
        </div>
        <div className="item" onClick={() => handleSearchClick("원피스")}>
          <span className="icon-circle">
            <GiLargeDress size={32} />
          </span>
          <div className="items-text">원피스</div>
        </div>
        <div className="item" onClick={() => handleSearchClick("스커트")}>
          <span className="icon-circle">
            <GiSkirt size={26} />
          </span>
          <div className="items-text">스커트</div>
        </div>
      </div>

      {loading ? (
        <div className="loading">로딩 중...</div> // 로딩 중일 때 표시
      ) : (
        <div className="welcome">
          <BsStars />
          &nbsp;{user.username} 님 환영합니다!&nbsp;
          <BsStars />
        </div>
      )}

      <div className="left_2">
        <div className="text-1">Best</div>
      </div>

      <div className="Home-cards">
        <div className="cards">
          {topArticles.map((article) => (
            <div
              key={article.id}
              className="card-sec"
              onClick={() => handleCardSecClick(article.id)}
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
