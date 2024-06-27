import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Alarm.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import card from "../../assets/card/card_sample.png";
import product from "../../assets/card/card_sample_4.png";

import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import AlarmButton from "../../components/Button/alarm/AlarmButton";
import ReviewButton from "../../components/Button/alarm/ReviewButton";
import ReportModal from "../../components/modal/alarm/ReportModal";

const Alarm = () => {
  const navigate = useNavigate();

  const [showReportModal, setShowReportModal] = useState(false);

  const handleSAlarmClick = () => {
    navigate(`/home`);
  };

  const handleChatClick = () => {
    navigate(`/chat`);
  };

  const handleReviewClick = () => {
    navigate(`/deal`);
  };

  const handleShowReportModal = () => {
    setShowReportModal(true);
  };
  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  return (
    <div className="Alarm">
      <div className="header-sec">
        <IoIosArrowBack size={26} onClick={handleSAlarmClick} />
      </div>
      <div className="alarm-sec">
        <div className="content">
          <div className="photo">
            <img src={card} alt="Card" className="card" />
          </div>
          <div className="info">
            <div className="title">
              <div className="text">
                username 님이 회원님의 상품에 관심을 보였어요.
              </div>
              <div className="dot">
                <HiOutlineDotsHorizontal
                  size={20}
                  onClick={handleShowReportModal}
                />
              </div>
              {showReportModal && (
                <ReportModal closeModal={handleCloseReportModal} />
              )}
            </div>
            <div className="time">3 min ago</div>
            <div>
              <img src={product} alt="Product" className="product" />
            </div>
            <div className="product-name">K87 워크웨어 포켓 반팔티셔츠</div>
            <div className="con">
              <div className="likes">
                <FaHeart color="#ff3358" className="icons" />
                21 likes
              </div>
              <div className="comments">
                <IoChatboxOutline size={18} className="icons" />4 comments
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="alarm-sec">
        <div className="content">
          <div className="photo">
            <img src={card} alt="Card" className="card" />
          </div>
          <div className="info">
            <div className="title">
              <div className="text">
                username 님이 회원님의 상품을 문의했어요.
              </div>
              <div className="dot">
                <HiOutlineDotsHorizontal
                  size={20}
                  onClick={handleShowReportModal}
                />
              </div>
              {showReportModal && (
                <ReportModal closeModal={handleCloseReportModal} />
              )}
            </div>
            <div className="time">5 hrs ago</div>
            <div className="product-name">K87 워크웨어 포켓 반팔티셔츠</div>
            <div className="button">
              <AlarmButton onClick={handleChatClick} />
            </div>
          </div>
        </div>
      </div>

      <div className="alarm-sec">
        <div className="content">
          <div className="photo">
            <img src={card} alt="Card" className="card" />
          </div>
          <div className="info">
            <div className="title">
              <div className="text">username 님과 거래가 완료되었습니다.</div>
              <div className="dot">
                <HiOutlineDotsHorizontal
                  size={20}
                  onClick={handleShowReportModal}
                />
              </div>
              {showReportModal && (
                <ReportModal closeModal={handleCloseReportModal} />
              )}
            </div>
            <div className="time">1 day ago</div>
            <div className="product-name">레이어드 라운드 반팔 티셔츠</div>
            <div className="button">
              <ReviewButton onClick={handleReviewClick} />
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Alarm;
