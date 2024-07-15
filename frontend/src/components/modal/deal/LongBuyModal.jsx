import React from "react";
import "./LongBuyModal.css";

const LongBuyModal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="longBuyModal" onClick={closeModal}>
      <div
        className="longBuyModal-content"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 막기
      >
        <button className="close" onClick={closeModal}></button>
        {children}
      </div>
    </div>
  );
};

export default LongBuyModal;
