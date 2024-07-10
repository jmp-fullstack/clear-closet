import React, { useState } from "react";
import CenterModal from "./CenterModal";
import CheckButton from "../../Button/CheckButton";
import { IoCloseOutline } from "react-icons/io5";
import { useUser } from "../../../pages/context/UserContext"; // Context 사용

import "./NameModal.css";

const NickModal = ({ closeModal, onSave }) => {
  const { user, updateUser } = useUser(); // Context에서 사용자 정보와 업데이트 함수 가져오기
  const [nickname, setNickname] = useState(user.nickname);

  const handleSave = () => {
    onSave(null, nickname); // 이름은 null로 두고 닉네임만 전달
    updateUser({ nickname }); // 중앙 상태 업데이트
    closeModal();
  };

  return (
    <CenterModal isOpen={true}>
      <div className="name-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">닉네임 변경하기</div>
        <div className="line"></div>
        <div className="text">
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="button">
          <CheckButton onClick={handleSave} />
        </div>
      </div>
    </CenterModal>
  );
};

export default NickModal;
