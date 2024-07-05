import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./Product.css";
import BottomNav from "../../components/BottomNav/BottomNav";

import { IoIosArrowBack } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { BiSolidHeartSquare } from "react-icons/bi";
import QuestButton from "../../components/Button/QuestButton";
import { article_detail } from "../../api/articles";

const Product = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const article_pk = searchParams.get("detail");

  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Current URL:", window.location.href);
    console.log("searchParams:", searchParams.toString());
    console.log("article_pk:", article_pk);
  }, [searchParams, article_pk]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const access = localStorage.getItem("access");
        if (!access) {
          throw new Error("Access token not found");
        }
        const data = await article_detail(article_pk, access);
        setArticle(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching article detail:", err);
      }
    };

    if (article_pk) {
      fetchArticle();
    } else {
      console.error("Article ID is undefined");
    }
  }, [article_pk]);

  const handleBackClick = () => {
    navigate(`/search`);
  };

  const handleQuestClick = () => {
    navigate(`/chat`);
  };

  const handleAlarmClick = () => {
    navigate(`/alarm`);
  };

  const handleUserClick = () => {
    navigate(`/user`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Product">
      <div className="header-sec">
        <div className="back" onClick={handleBackClick}>
          <IoIosArrowBack size={26} />
        </div>
        <div className="title">{article.title}</div>
        <div className="alarm">
          <GoBell size={26} onClick={handleAlarmClick} />
        </div>
      </div>

      <div className="photo-sec">
        {article.product.product_images.map((image) => (
          <img
            key={image.id}
            src={image.image_url}
            alt="Product"
            className="card"
            width={355}
            height={355}
          />
        ))}
      </div>

      <div className="product-sec">
        <div className="info">
          <div className="name">{article.title}</div>
          <div className="interest">
            <BiSolidHeartSquare size={40} />
          </div>
        </div>
        <div className="nickname" onClick={handleUserClick}>
          @{article.user}
        </div>
        <div className="price">{article.product.price} 원</div>
      </div>
      <div className="question-sec">
        <div className="button">
          <QuestButton onClick={handleQuestClick} />
        </div>
      </div>
      <div className="content">{article.content}</div>

      <BottomNav />
    </div>
  );
};

export default Product;
