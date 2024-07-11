import React from "react";

import MoveModal from "../../modal/camera/MoveModal";
import card from "../../../assets/card/product_sample_1.png";

import "./BuyModal.css";

const BuyModal = ({ closeModal }) => {
  return (
    <MoveModal isOpen={true} closeModal={closeModal}>
      <div className="Buy-modal">
        <div className="topline"></div>
        <div className="title">이 상품들은 어떤가요?</div>

        <div className="Buy-cards">
          <div className="card-sec">
            <img src={card} alt="Card" className="card" />
            <div className="name">아디다스 가젤 스니커즈</div>
            <div className="price">239,000원</div>
          </div>
          <div className="card-sec">
            <img src={card} alt="Card" className="card" />
            <div className="name">아디다스 가젤 스니커즈</div>
            <div className="price">239,000원</div>
          </div>
          <div className="card-sec">
            <img src={card} alt="Card" className="card" />
            <div className="name">아디다스 가젤 스니커즈</div>
            <div className="price">239,000원</div>
          </div>
          <div className="card-sec">
            <img src={card} alt="Card" className="card" />
            <div className="name">아디다스 가젤 스니커즈</div>
            <div className="price">239,000원</div>
          </div>
          <div className="card-sec">
            <img src={card} alt="Card" className="card" />
            <div className="name">아디다스 가젤 스니커즈</div>
            <div className="price">239,000원</div>
          </div>
        </div>
      </div>
    </MoveModal>
  );
};

export default BuyModal;
