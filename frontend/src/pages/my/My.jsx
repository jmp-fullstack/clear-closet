import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileImageURL } from "../../api/auth";
import { user_profile, update_user_profile } from "../../api/myPage";
import ProfileUpload from "../../assets/ProfileUpload";

import BottomNav from "../../components/BottomNav/BottomNav";
import NameModal from "../../components/modal/my/NameModal";
import NickModal from "../../components/modal/my/NickModal";
import InterestModal from "../../components/modal/my/InterestModal";
import ReviewModal from "../../components/modal/my/ReviewModal";
import OutModal from "../../components/modal/my/OutModal";
import LogoutModal from "../../components/modal/my/LogoutModal";

import { IoIosArrowForward } from "react-icons/io";
import { useUser } from "../../pages/context/UserContext"; // Context 사용

import "./My.css";

const My = () => {
  const [showNameModal, setShowNameModal] = useState(false);
  const [showNickModal, setShowNickModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showOutModal, setShowOutModal] = useState(false);
  const [profileImageURL, setProfileImageURL] =
    useState();
    // "/default_profile.jpg"
  const { user, updateUser } = useUser(); // Context에서 사용자 정보와 업데이트 함수 가져오기
  const user_pk = localStorage.getItem("user_pk");
  const navigate = useNavigate();
  const profileUploadRef = useRef();

  useEffect(() => {
    const storedProfileImageURL = getProfileImageURL();
    if (storedProfileImageURL) {
      setProfileImageURL(storedProfileImageURL);
    }

    const loadUserProfile = async () => {
      try {
        const profileData = await user_profile(user_pk);
        updateUser({
          username: profileData.username,
          nickname: profileData.nickname,
        });
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    loadUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_pk]);

  const handleFileClick = () => {
    profileUploadRef.current.openFileDialog();
  };

  const handleUploadSuccess = (uploadedImages) => {
    if (uploadedImages.url) {
      const newProfileImageUrl = uploadedImages.url;
      setProfileImageURL(newProfileImageUrl);
      localStorage.setItem("profile_image_url", newProfileImageUrl);
    }
  };

  const handleShowNameModal = () => {
    setShowNameModal(true);
  };
  const handleCloseNameModal = () => {
    setShowNameModal(false);
  };

  const handleSaveUserProfile = async (newName, newNickname) => {
    try {
      const updatedProfile = await update_user_profile(user_pk, {
        username: newName || user.username,
        nickname: newNickname || user.nickname,
      });
      updateUser({
        username: updatedProfile.username,
        nickname: updatedProfile.nickname,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleShowNickModal = () => {
    setShowNickModal(true);
  };
  const handleCloseNickModal = () => {
    setShowNickModal(false);
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

  return (
    <div className="My">
      <div className="header-sec">
        <div className="title">My Page</div>
      </div>
      <div className="info-sec">
        <div className="photo">
          <img src={profileImageURL} alt="Profile" className="profile_images" />
          <div className="photo-text" onClick={handleFileClick}>
            사진 변경하기
          </div>
          <ProfileUpload
            ref={profileUploadRef}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>

        <div className="info-modal">
          <div className="name">
            <div>이름</div>
            <div className="input">{user.username}</div>
            <div className="arrow" onClick={handleShowNameModal}>
              <IoIosArrowForward size={20} />
            </div>
            {showNameModal && (
              <NameModal
                closeModal={handleCloseNameModal}
                onSave={handleSaveUserProfile}
                user_pk={user_pk}
              />
            )}
          </div>
          <div className="name">
            <div>닉네임</div>
            <div className="input">{user.nickname}</div>
            <div className="arrow" onClick={handleShowNickModal}>
              <IoIosArrowForward size={20} />
            </div>
            {showNickModal && (
              <NickModal
                closeModal={handleCloseNickModal}
                onSave={handleSaveUserProfile}
                user_pk={user_pk}
              />
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
          {showOutModal && <OutModal closeModal={handleCloseOutModal} />}
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
