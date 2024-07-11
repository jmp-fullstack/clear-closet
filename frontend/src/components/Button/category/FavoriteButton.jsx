import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { article_list } from "../../../api/articles";
import { favorite_article } from "../../../api/favorite";
import "./FavoriteButton.css";

const FavoriteButton = ({
  article_id,
  initialFavoriteCount,
  initialIsFavorited,
}) => {
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  useEffect(() => {
    setFavoriteCount(initialFavoriteCount);
    setIsFavorited(initialIsFavorited);
  }, [initialFavoriteCount, initialIsFavorited]);

  const handleFavoriteClick = async () => {
    try {
      await favorite_article(article_id); // 좋아요 토글 요청
      const access = localStorage.getItem("access");
      const articleData = { detail: article_id }; // 필요한 요청 파라미터 설정
      const data = await article_list(articleData, access); // 게시글 목록 API 호출

      console.log("API 응답 데이터:", data); // 응답 데이터 구조 확인을 위한 로그 출력

      const updatedArticle = data.results.find(
        (article) => article.id === article_id
      );
      if (updatedArticle) {
        setFavoriteCount(updatedArticle.num_favorites); // 좋아요 카운트 업데이트
        setIsFavorited(updatedArticle.is_favorited); // 좋아요 상태 업데이트
      } else {
        console.error("게시글을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("좋아요 토글 중 오류 발생:", error);
    }
  };

  return (
    <div className="favorite-button" onClick={handleFavoriteClick}>
      {isFavorited ? (
        <FaHeart size={26} color="#ff1c8e" />
      ) : (
        <FaRegHeart size={26} />
      )}
      <div className="favorite-count">{favoriteCount}</div>
    </div>
  );
};

export default FavoriteButton;
