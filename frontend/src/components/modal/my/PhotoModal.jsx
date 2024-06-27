import React from "react";

import ShortModal from "./ShortModal";

import "./PhotoModal.css";

import { FaRegFile } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

const PhotoModal = ({ closeModal, cardSec }) => {
  return (
    <ShortModal isOpen={true} closeModal={closeModal}>
      <div className="photo-modal">
        <div className="topline"></div>
        <div className="title">사진 변경하기</div>
        <div className="line"></div>

        <div className="photo-sec">
          <div className="content">
            <div className="icon">
              <FaRegFile size={26} />
            </div>
            <div className="file">파일로 불러오기</div>
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
