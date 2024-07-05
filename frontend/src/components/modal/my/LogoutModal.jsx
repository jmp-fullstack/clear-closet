import React from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../../../api/auth";
import CenterModal from "./CenterModal";

import "./LogoutModal.css";

import CheckButton from "../../Button/CheckButton";

const LogoutModal = ({ closeModal }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log("Logout successful:", response);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <CenterModal isOpen={true}>
      <div className="logout-modal">
        <div className="title">로그아웃 되었습니다</div>
        <div className="button">
          <CheckButton onClick={handleLogout} />
        </div>
      </div>
    </CenterModal>
  );
};

export default LogoutModal;
