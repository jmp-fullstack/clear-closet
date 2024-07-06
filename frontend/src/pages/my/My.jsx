import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav/BottomNav";
import card from "../../assets/card/profile_photo_1.jpg";
import PhotoModal from "../../components/modal/my/PhotoModal";
import NameModal from "../../components/modal/my/NameModal";
import NickModal from "../../components/modal/my/NickModal";
import EmailModal from "../../components/modal/my/EmailModal";
import InterestModal from "../../components/modal/my/InterestModal";
import ReviewModal from "../../components/modal/my/ReviewModal";
import OutModal from "../../components/modal/my/OutModal";
import LogoutModal from "../../components/modal/my/LogoutModal";

import { IoIosArrowForward } from "react-icons/io";

import "./My.css";

const My = () => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showNickModal, setShowNickModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showOutModal, setShowOutModal] = useState(false);

  // const [profileImage, setProfileImage] = useState(() => {
  //   return localStorage.getItem("profileImage") || card;
  // });
  const navigate = useNavigate();

  // useEffect(() => {
  //   localStorage.setItem("profileImage", profileImage);
  // }, [profileImage]);

  const handleShowPhotoModal = () => {
    setShowPhotoModal(true);
  };
  const handleClosePhotoModal = () => {
    setShowPhotoModal(false);
  };

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

  const handleShowInterestModal = () => {
    setShowInterestModal(true);
  };
  const handleCloseInterestModal = () => {
    setShowInterestModal(false);
  };

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  };
  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const handleShowOutModal = () => {
    setShowOutModal(true);
  };
  const handleCloseOutModal = () => {
    setShowOutModal(false);
  };

  const handleDealClick = () => {
    navigate("/deal");
  };

  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const userId = 2;

  return (
    <div className="My">
      <div className="header-sec">
        <div className="title">My Page</div>
      </div>
      <div className="info-sec">
        <div className="photo">
          <img src={card} alt="Card" className="card" />
          <div className="photo-text" onClick={handleShowPhotoModal}>
            사진 변경하기
          </div>
          {showPhotoModal && (
            <PhotoModal
              closeModal={handleClosePhotoModal}
              // setProfileImage={setProfileImage}
            />
          )}
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
      </div>
      <div className="my-sec">
        <div className="interest">
          <div>나의 관심 상품</div>
          <div className="arrow" onClick={handleShowInterestModal}>
            <IoIosArrowForward size={20} />
          </div>
          {showInterestModal && (
            <InterestModal closeModal={handleCloseInterestModal} />
          )}
        </div>
        <div className="deal">
          <div>나의 거래</div>
          <div className="arrow" onClick={handleDealClick}>
            <IoIosArrowForward size={20} />
          </div>
        </div>
        <div className="review">
          <div>나의 리뷰</div>
          <div className="arrow" onClick={handleShowReviewModal}>
            <IoIosArrowForward size={20} />
          </div>
          {showReviewModal && (
            <ReviewModal closeModal={handleCloseReviewModal} />
          )}
        </div>
      </div>
      <div className="out-sec">
        <div className="out">
          <div>회원 탈퇴</div>
          <div className="arrow" onClick={handleShowOutModal}>
            <IoIosArrowForward size={20} />
          </div>
          {showOutModal && (
            <OutModal closeModal={handleCloseOutModal} userId={userId} />
          )}
        </div>
        <div className="logout">
          <div className="input" onClick={handleShowLogoutModal}>
            로그아웃
          </div>
          {showLogoutModal && (
            <LogoutModal closeModal={handleCloseLogoutModal} />
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default My;
