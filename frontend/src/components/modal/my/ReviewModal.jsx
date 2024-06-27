import React from "react";

import LongModal from "./LongModal";

import "./ReviewModal.css";

import { IoIosArrowForward } from "react-icons/io";

// import { IoCloseOutline } from "react-icons/io5";
// import CheckButton from "../../Button/CheckButton";

const ReviewModal = ({ closeModal, cardSec }) => {
  return (
    <LongModal isOpen={true} closeModal={closeModal}>
      <div className="review-modal">
        <div className="topline"></div>
        <div className="title">나의 리뷰</div>
        <div className="line"></div>
        <div className="receive-sec">
          <div className="manner">
            <div className="receive-text">받은 매너 평가</div>
            <div className="icon">
              <IoIosArrowForward size={20} />
            </div>
          </div>
          <div className="line"></div>
          <div className="manner">
            <div className="receive-text">받은 거래 후기</div>
            <div className="icon">
              <IoIosArrowForward size={20} />
            </div>
          </div>
        </div>
      </div>
    </LongModal>
  );
};

export default ReviewModal;
