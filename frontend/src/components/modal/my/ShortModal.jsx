import React from "react";
import "./ShortModal.css";

const ShortModal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="shortModal" onClick={closeModal}>
      <div
        className="shortModal-content"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 막기
      >
        <button className="close" onClick={closeModal}></button>
        {children}
      </div>
    </div>
  );
};

export default ShortModal;
