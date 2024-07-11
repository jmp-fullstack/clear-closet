import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CenterModal from "./CenterModal";
import { delete_user } from "../../../api/auth";

import "./OutModal.css";

import { IoCloseOutline } from "react-icons/io5";
import DeleteButton from "../../Button/DeleteButton";

const OutModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) {
      setError("로그인이 필요합니다. 다시 로그인해 주세요.");
    }
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/login"); // 로그인이 필요하면 로그인 페이지로 이동
    }
  }, [error, navigate]);

  const handleOut = async () => {
    try {
      const response = await delete_user(email, username, password);
      navigate("/login");
      console.log("Account deletion successful:", response);
    } catch (error) {
      console.error("Account deletion failed:", error);
      if (error.message === "No access token available") {
        setError("로그인이 필요합니다. 다시 로그인해 주세요.");
      } else {
        setError("계정 삭제에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <CenterModal isOpen={true}>
      <div className="out-modal">
        <div className="cancel">
          <IoCloseOutline size={30} onClick={closeModal} />
        </div>
        <div className="title">회원 탈퇴</div>
        <div className="line"></div>
        <div className="text-1">정말 탈퇴하시겠어요?</div>
        <div className="text-2">
          탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다
        </div>
        <div className="input-field">
          <input
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-fields"
          />
          <input
            type="text"
            placeholder="이름을 입력해 주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-fields"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-fields"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button">
          <DeleteButton onClick={handleOut} />
        </div>
      </div>
    </CenterModal>
  );
};

export default OutModal;
