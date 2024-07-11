import React, { useRef } from "react";
import { user_profile } from "../../../api/myPage"; // 필요한 API 함수 임포트
import ShortModal from "./ShortModal";

import { FaRegFile } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

import "./PhotoModal.css";

const PhotoModal = ({ closeModal, setProfileImageURL }) => {
  const fileInputRef = useRef(null);
  const user_pk = localStorage.getItem("user_pk"); // user_pk를 로컬 스토리지에서 가져옵니다.

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const newProfileImage = e.target.files[0];
    const access = localStorage.getItem("access");
    if (!user_pk) {
      console.error("user_pk가 로컬 스토리지에 없습니다.");
      return;
    }
    try {
      const response = await user_profile(user_pk, newProfileImage, access);
      localStorage.setItem("profile_images_url", response.profileimage);
      setProfileImageURL(response.profileimage);
      closeModal();
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  return (
    <ShortModal isOpen={true} closeModal={closeModal}>
      <div className="photo-modal">
        <div className="topline"></div>
        <div className="title">사진 변경하기</div>
        <div className="line"></div>

        <div className="photo-sec">
          <div className="content" onClick={handleFileClick}>
            <div className="icon">
              <FaRegFile size={26} />
            </div>
            <div className="file">파일로 불러오기</div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div className="content">
            <div className="icon">
              <TbPhoto size={26} />
            </div>
            <div className="file">사진앱에서 선택하기</div>
          </div>
          <div className="content">
            <div className="icon">
              <MdOutlinePhotoCamera size={26} />
            </div>
            <div className="file">직접 사진 찍기</div>
          </div>
          <div className="content">
            <div className="icon">
              <FaRegTrashCan size={26} />
            </div>
            <div className="file">현재 사진 삭제</div>
          </div>
        </div>
      </div>
    </ShortModal>
  );
};

export default PhotoModal;
