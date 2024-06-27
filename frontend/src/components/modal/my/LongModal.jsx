import React from "react";
import "./LongModal.css";

const LongModal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="longModal" onClick={closeModal}>
      <div
        className="longModal-content"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 막기
      >
        <button className="close" onClick={closeModal}></button>
        {children}
      </div>
    </div>
  );
};

export default LongModal;
