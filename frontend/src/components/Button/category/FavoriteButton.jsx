import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { favorite_article } from "../../../api/favorite";
import "./FavoriteButton.css";

const FavoriteButton = ({
  article_id,
  initialFavoriteCount,
  initialIsFavorited,
}) => {
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  const handleFavoriteClick = async () => {
    try {
      const data = await favorite_article(article_id);
      console.log("Response data:", data);
      setIsFavorited(data.is_favorited);
      setFavoriteCount(data.favorite_count);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="favorite-button" onClick={handleFavoriteClick}>
      {isFavorited ? <FaHeart size={26} /> : <FaRegHeart size={26} />}
      <div className="favorite-count">{favoriteCount}</div>
    </div>
  );
};

export default FavoriteButton;
