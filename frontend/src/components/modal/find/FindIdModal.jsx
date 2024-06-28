import React from "react";
import { useNavigate } from "react-router-dom";
import CenterModal from "../my/CenterModal";

import "./FindIdModal.css";

import { IoCloseOutline } from "react-icons/io5";
import CheckButton from "../../Button/CheckButton";

const FindIdModal = ({ closeModal, foundId }) => {
  const navigate = useNavigate();

  const handleCardSecClick = () => {
    navigate(`/login`);
  };

  return (
    <CenterModal isOpen={true}>
      <div className="findId-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="text-sec">
          <div className="text">회원님의 아이디는</div>
          <div className="user-email">{foundId}</div>
          <div className="text">입니다</div>
        </div>
        <div className="find-button">
          <CheckButton onClick={handleCardSecClick} />
        </div>
      </div>
    </CenterModal>
  );
};

export default FindIdModal;
