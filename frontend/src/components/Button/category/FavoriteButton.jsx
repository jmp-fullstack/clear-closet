import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { favorite_article } from "../../../api/favorite";
import { article_detail } from "../../../api/articles";

import "./FavoriteButton.css";

const FavoriteButton = ({ article_id, access }) => {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const data = await article_detail(article_id, access);
        setFavoriteCount(data.num_favorites);
        setIsFavorited(data.is_favorited);
      } catch (error) {
        console.error("게시물 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchArticleDetails();
  }, [article_id, access]);

  const handleFavoriteClick = async () => {
    try {
      await favorite_article(article_id);

      // 서버에서 좋아요 상태와 카운트를 다시 가져오기
      const data = await article_detail(article_id, access);
      setFavoriteCount(data.num_favorites);
      setIsFavorited(data.is_favorited);
    } catch (error) {
      console.error("좋아요 토글 중 오류 발생:", error);
    }
  };

  const buttonColor = favoriteCount > 0 ? "#ff1c8e" : "#bdbdbd";

  return (
    <div
      className="favorite-button"
      onClick={handleFavoriteClick}
      style={{ color: buttonColor }}
    >
      {isFavorited ? <FaHeart size={26} /> : <FaRegHeart size={26} />}
      <div className="favorite-count">
        {Number.isNaN(favoriteCount) ? "0" : favoriteCount}
      </div>
    </div>
  );
};

export default FavoriteButton;
