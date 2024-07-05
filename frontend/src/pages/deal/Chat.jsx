import React from "react";
import { useNavigate } from "react-router-dom";

import card from "../../assets/card/card_sample.png";

import { IoIosArrowBack } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";

import "./Chat.css";

const Chat = () => {
  const navigate = useNavigate();

  const handleProductClick = (cardSec) => {
    navigate(`/product?cardsec=${cardSec}`);
  };

  return (
    <div className="Chat">
      <div className="header-sec">
        <div className="left">
          <IoIosArrowBack size={26} onClick={handleProductClick} />
        </div>
        <div className="right">
          <div className="profile">
            <img src={card} alt="Card" className="card" />
          </div>
          <div className="chat-username">@username</div>
        </div>
      </div>
      <div className="chat-sec">
        <div className="my-tell"></div>
        <div className="time"></div>
        <div className="you">
          <div className="you-profile"></div>
          <div className="you-tell"></div>
        </div>
      </div>
      <div className="input-sec">
        <input
          type="text"
          className="chat-input"
          placeholder="메세지를 입력하세요"
        />
        <div className="chat-icon">
          <FaRegSmile size={22} className="smile" />
          <TbPhoto size={22} className="photo" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Chat;
