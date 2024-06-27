import React from "react";
import { useNavigate } from "react-router-dom";

import LongModal from "./LongModal";
import card from "../../../assets/card/card_sample_3.png";

import "./InterestModal.css";

// import { IoCloseOutline } from "react-icons/io5";
// import CheckButton from "../../Button/CheckButton";

const InterestModal = ({ closeModal, cardSec }) => {
  const navigate = useNavigate();

  const handleCardSecClick = () => {
    navigate(`/home_product?cardsec=${cardSec}`);
  };

  return (
    <LongModal isOpen={true} closeModal={closeModal}>
      <div className="interest-modal">
        <div className="topline"></div>
        <div className="title">나의 관심 상품</div>
        <div className="line"></div>

        <div className="interest-cards">
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="category">category</div>
            <div className="price">50,000 won</div>
          </div>
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="category">category</div>
            <div className="price">50,000 won</div>
          </div>
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="category">category</div>
            <div className="price">50,000 won</div>
          </div>
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="category">category</div>
            <div className="price">50,000 won</div>
          </div>
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="category">category</div>
            <div className="price">50,000 won</div>
          </div>
          <div className="card-sec" onClick={handleCardSecClick}>
            <img src={card} alt="Card" className="card" />
            <div className="name">username</div>
            <div className="category">category</div>
            <div className="price">50,000 won</div>
          </div>
        </div>
      </div>
    </LongModal>
  );
};

export default InterestModal;
