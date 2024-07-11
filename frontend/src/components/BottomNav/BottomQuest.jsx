import React from "react";
import { useNavigate } from "react-router-dom";
import QuestButton from "../Button/QuestButton";
import FavoriteButton from "../Button/category/FavoriteButton";
import "./BottomQuest.css";

const BottomQuest = ({
  article_id,
  initialFavoriteCount,
  initialIsFavorited,
}) => {
  const navigate = useNavigate();

  const handleQuestClick = () => {
    navigate(`/chat`);
  };

  return (
    <div className="bottom-quest">
      <FavoriteButton
        article_id={article_id}
        initialFavoriteCount={initialFavoriteCount}
        initialIsFavorited={initialIsFavorited}
      />
      <div className="button">
        <QuestButton onClick={handleQuestClick} />
      </div>
    </div>
  );
};

export default BottomQuest;
