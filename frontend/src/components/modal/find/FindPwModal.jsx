import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CenterModal from "../my/CenterModal";

import "./FindPwModal.css";

import { IoCloseOutline } from "react-icons/io5";
import CheckButton from "../../Button/CheckButton";

const FindPwModal = ({ closeModal, foundPwAuth }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // Here, you would call your API to reset the password
    // For demonstration, we just log to console
    console.log("Resetting password to:", newPassword);
    closeModal();
  };

  const handleCardSecClick = () => {
    navigate(`/login`);
  };

  return (
    <CenterModal isOpen={true}>
      <div className="findPw-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">비밀번호 재설정</div>
        <div className="line"></div>
        <div className="findPw-input">
          <input
            type="password"
            placeholder="새로운 비밀번호를 입력해 주세요"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            aria-label="New Password"
            className="find-field"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Confirm Password"
            className="find-field"
          />
          <div className="line"></div>
          {error && <div className="error-message">{error}</div>}
          <button onClick={handleResetPassword}>재설정</button>
        </div>
        <div className="findPW-button">
          <CheckButton onClick={handleCardSecClick} />
        </div>
      </div>
    </CenterModal>
  );
};

export default FindPwModal;
