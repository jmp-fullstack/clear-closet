import React from "react";
import "./DownModal.css";

const DownModal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="downModal" onClick={closeModal}>
      <div
        className="downModal-content"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 막기
      >
        <button className="close" onClick={closeModal}></button>
        {children}
      </div>
    </div>
  );
};

export default DownModal;
