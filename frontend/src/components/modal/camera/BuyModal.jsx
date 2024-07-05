import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import card from "../../../assets/card/card_sample_3.png";
import "./BuyModal.css";
import MoveModal from "./MoveModal";
import Draggable from "react-draggable";

const BuyModal = ({ closeModal, cardSec }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleCardSecClick = () => {
    navigate(`/product?cardsec=${cardSec}`);
  };

  const cards = Array.from({ length: 20 }, (_, index) => {
    const cardRef = React.createRef();
    return (
      <Draggable key={index} nodeRef={cardRef}>
        <div className="card-sec" onClick={handleCardSecClick} ref={cardRef}>
          <img src={card} alt="Card" className="card" />
          <div className="name">username</div>
          <div className="category">category</div>
          <div className="price">50,000 won</div>
        </div>
      </Draggable>
    );
  });

  return (
    <MoveModal isOpen={true} closeModal={closeModal} ref={modalRef}>
      <div className="buy-modal">
        <div className="topline"></div>
        <div className="title">이 상품들은 어떤가요?</div>
        <div className="buy-cards">{cards}</div>
      </div>
    </MoveModal>
  );
};

export default BuyModal;
