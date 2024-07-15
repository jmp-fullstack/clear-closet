import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NameModal from "../../components/modal/my/NameModal";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import "./Review.css";

const Review = () => {
  const navigate = useNavigate();
  const [showNameModal, setShowNameModal] = useState(false);

  const handleShowNameModal = () => {
    setShowNameModal(true);
  };
  const handleCloseNameModal = () => {
    setShowNameModal(false);
  };

  return (
    <div className="Review">
      <div className="header-sec">
        <div className="left">
          <IoIosArrowBack size={26} onClick={() => navigate(-1)} />
        </div>
        <div className="right">나의 리뷰</div>
      </div>

      <div className="review-sec">
        <div className="review-you">
          <div>받은 리뷰 후기</div>
          <div className="arrow" onClick={handleShowNameModal}>
            <IoIosArrowForward size={20} />
          </div>
          {showNameModal && <NameModal closeModal={handleCloseNameModal} />}
        </div>
        <div className="review-me">
          <div>작성 리뷰 후기</div>
          <div className="arrow" onClick={handleShowNameModal}>
            <IoIosArrowForward size={20} />
          </div>
          {showNameModal && <NameModal closeModal={handleCloseNameModal} />}
        </div>
      </div>
    </div>
  );
};

export default Review;
