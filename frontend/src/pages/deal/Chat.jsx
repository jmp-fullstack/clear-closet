import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getNickname } from "../../api/auth";

import card from "../../assets/card/card_sample.png";

import { IoIosArrowBack } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";

import "./Chat.css";

const Chat = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const storedNickname = getNickname();
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  const handleProductClick = (article_pk) => {
    navigate(`/product?detail=${article_pk}`);
  };

  const handleNicknameClick = () => {
    navigate(`/user`);
  };

  const articles = []; // 필요시 여기에 articles 데이터를 채워넣으세요.

  return (
    <div className="Chat">
      <div className="header-sec">
        <div className="left">
          <IoIosArrowBack size={26} onClick={() => navigate(-1)} />
        </div>
        <div className="right" onClick={handleNicknameClick}>
          <div className="profile">
            <img src={card} alt="Card" className="card" />
          </div>
          <div className="nickname">@{nickname}</div>
        </div>
      </div>
      <div className="chat-sec">
        <div className="me-case">
          <div className="me">Hello there !</div>
        </div>
        <div className="time">July 6, 2024, 7:47 PM</div>
        <div className="you-case">
          <div className="profile">
            <img src={card} alt="Card" className="photo" />
          </div>
          <div className="you">
            <div className="text">Oh ?</div>
            <div className="text">Hello</div>
            <div className="text">What happen</div>
          </div>
        </div>
        <div className="me-case">
          <div className="me">Is there any T-shirts for dating?</div>
        </div>
        <div className="you-case">
          <div className="profile">
            <img src={card} alt="Card" className="photo" />
          </div>
          <div className="you">
            <div className="text">
              Sorry, it is all booked. is there any problem this product ?
            </div>
          </div>
        </div>
        <div className="me-case">
          <div className="me">
            It's all good. But the thing is I want more big size.
          </div>
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
      <div>
        {articles.map((article) => (
          <div key={article.id} onClick={() => handleProductClick(article.id)}>
            <p>{article.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
