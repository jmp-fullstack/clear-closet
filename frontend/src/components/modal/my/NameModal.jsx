import React from "react";
import CenterModal from "./CenterModal";

import "./NameModal.css";

import { IoCloseOutline } from "react-icons/io5";
import CheckButton from "../../Button/CheckButton";

const NameModal = ({ closeModal }) => {
  return (
    <CenterModal isOpen={true}>
      <div className="name-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">이름 변경하기</div>
        <div className="line"></div>
        <div className="text">이름</div>
        <div className="button">
          <CheckButton onClick={closeModal} />
        </div>
      </div>
    </CenterModal>
  );
};

export default NameModal;
