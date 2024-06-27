import React from "react";
import CenterModal from "./CenterModal";

import "./OutModal.css";

import { IoCloseOutline } from "react-icons/io5";
import CheckButton from "../../Button/CheckButton";

const OutModal = ({ closeModal }) => {
  return (
    <CenterModal isOpen={true}>
      <div className="out-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">회원 탈퇴</div>
        <div className="line"></div>
        <div className="text-1">정말 탈퇴하시겠어요?</div>
        <div className="text-2">
          탈퇴 버튼 선택 시, 계정은 <br />
          삭제되며 복구되지 않습니다
        </div>
        <div className="button">
          <CheckButton onClick={closeModal} />
        </div>
      </div>
    </CenterModal>
  );
};

export default OutModal;
