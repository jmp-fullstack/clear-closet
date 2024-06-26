import React, { useState } from "react";

import "./My.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import card from "../../assets/card/card_sample.png";
import NameModal from "../../components/modal/my/NameModal";

import { IoIosArrowForward } from "react-icons/io";
import NickModal from "../../components/modal/my/NickModal";
import EmailModal from "../../components/modal/my/EmailModal";

const My = () => {
  const [showNameModal, setShowNameModal] = useState(false);
  const [showNickModal, setShowNickModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleShowNameModal = () => {
    setShowNameModal(true);
  };
  const handleCloseNameModal = () => {
    setShowNameModal(false);
  };

  const handleShowNickModal = () => {
    setShowNickModal(true);
  };
  const handleCloseNickModal = () => {
    setShowNickModal(false);
  };

  const handleShowEmailModal = () => {
    setShowEmailModal(true);
  };
  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
  };

  return (
    <div className="My">
      <div className="header-sec">
        <div className="title">My Page</div>
        <div className="line"></div>
      </div>
      <div className="info-sec">
        <div className="photo">
          <img src={card} alt="Card" className="card" />
          <div className="photo-text">사진 변경하기</div>
        </div>

        <div className="info-modal">
          <div className="name">
            <div>이름</div>
            <div className="input">이름</div>
            <div className="arrow" onClick={handleShowNameModal}>
              <IoIosArrowForward size={20} />
            </div>
            {showNameModal && <NameModal closeModal={handleCloseNameModal} />}
          </div>
          <div className="name">
            <div>닉네임</div>
            <div className="input">@nickname</div>
            <div className="arrow" onClick={handleShowNickModal}>
              <IoIosArrowForward size={20} />
            </div>
            {showNickModal && <NickModal closeModal={handleCloseNickModal} />}
          </div>
          <div className="name">
            <div>이메일</div>
            <div className="input">name@domain.com</div>
            <div className="arrow" onClick={handleShowEmailModal}>
              <IoIosArrowForward size={20} />
            </div>
            {showEmailModal && (
              <EmailModal closeModal={handleCloseEmailModal} />
            )}
          </div>
        </div>
        <div className="line"></div>
      </div>
      <div className="my-sec">
        <div>나의 관심 상품</div>
        <div>나의 거래</div>
        <div>나의 리뷰</div>
      </div>
      <div className="out-sec">
        <div>회원 탈퇴</div>
        <div>로그아웃</div>
      </div>
      <BottomNav />
    </div>
  );
};

export default My;
