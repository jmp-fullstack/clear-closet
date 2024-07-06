import React from "react";
import { useNavigate } from "react-router-dom";

import QuestButton from "../Button/QuestButton";

import { FaRegHeart } from "react-icons/fa";

import "./BottomQuest.css";

const BottomQuest = () => {
  const navigate = useNavigate();

  const handleQuestClick = () => {
    navigate(`/chat`);
  };

  return (
    <div className="bottom-quest">
      <div className="interest">
        <FaRegHeart size={26} />
        999
      </div>
      <div className="button">
        <QuestButton onClick={handleQuestClick} />
      </div>
    </div>
  );
};

export default BottomQuest;
