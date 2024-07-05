import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CenterModal from "../my/CenterModal";
import { resetPassword } from "../../../api/auth";

import "./FindPwModal.css";

import { IoCloseOutline } from "react-icons/io5";
import CheckButton from "../../Button/CheckButton";

const FindPwModal = ({ closeModal }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다!");
      return;
    }

    try {
      const response = await resetPassword(newPassword);
      console.log("Password reset successful:", response);
      closeModal();
      navigate("/login");
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <CenterModal isOpen={true}>
      <div className="findPw-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="title">비밀번호 재설정</div>
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
            placeholder="한번 더 입력해 주세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Confirm Password"
            className="find-field"
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="button">
          <CheckButton onClick={handleResetPassword} />
        </div>
      </div>
    </CenterModal>
  );
};

export default FindPwModal;
