import React, { useState } from "react";
import CenterModal from "./CenterModal";
import CheckButton from "../../Button/CheckButton";
import { IoCloseOutline } from "react-icons/io5";
import { useUser } from "../../../pages/context/UserContext"; // Context 사용

import "./NameModal.css";

const NameModal = ({ closeModal, onSave, user_pk }) => {
  const { user } = useUser(); // Context에서 사용자 정보 가져오기
  const [username, setUsername] = useState(user.username);

  const handleSave = () => {
    onSave(username);
    closeModal();
  };

  return (
    <CenterModal isOpen={true}>
      <div className="name-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">이름 변경하기</div>
        <div className="line"></div>
        <div className="text">
          <input
            type="text"
            placeholder="이름"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="button">
          <CheckButton onClick={handleSave} />
        </div>
      </div>
    </CenterModal>
  );
};

export default NameModal;
