import React from "react";
import CenterModal from "./CenterModal";

import "./NameModal.css";

import { IoCloseOutline } from "react-icons/io5";
import CheckButton from "../../Button/CheckButton";

const NickModal = ({ closeModal }) => {
  return (
    <CenterModal isOpen={true}>
      <div className="name-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">닉네임 변경하기</div>
        <div className="line"></div>
        <div className="text">@nickname</div>
        <div className="button">
          <CheckButton onClick={closeModal} />
        </div>
      </div>
    </CenterModal>
  );
};

export default NickModal;
