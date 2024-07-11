import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { list_favorites } from "../../../api/favorite";
import LongModal from "./LongModal";
import "./InterestModal.css";

const InterestModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await list_favorites();
        setFavorites(data);
      } catch (err) {
        setError(err);
        console.error("좋아요한 목록을 가져오는 중 오류 발생:", err);
      }
    };

    fetchFavorites();
  }, []);

  const handleCardSecClick = (article_pk) => {
    navigate(`/product?detail=${article_pk}`);
  };

  if (error) {
    return <div>오류: {error.message}</div>;
  }

  return (
    <LongModal isOpen={true} closeModal={closeModal}>
      <div className="interest-modal">
        <div className="topline"></div>
        <div className="title">나의 관심 상품</div>
        <div className="line"></div>

        <div className="interest-cards">
          {favorites.map((favorite) => {
            const article = favorite.article;
            const product = article.product;
            const imageUrl =
              product.product_images[0]?.image_url || "기본이미지경로";
            return (
              <div
                key={favorite.id}
                className="card-sec"
                onClick={() => handleCardSecClick(article.id)}
              >
                <img src={imageUrl} alt="Card" className="card" />
                <div className="name">{article.title}</div>
                <div className="price">{product.price} 원</div>
              </div>
            );
          })}
        </div>
      </div>
    </LongModal>
  );
};

export default InterestModal;
