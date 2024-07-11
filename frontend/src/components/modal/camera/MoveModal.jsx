import React from "react";
import "./MoveModal.css";

const MoveModal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="MoveModal" onClick={closeModal}>
      <div
        className="MoveModal-content"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 막기
      >
        <button className="close" onClick={closeModal}></button>
        {children}
      </div>
    </div>
  );
};

export default MoveModal;
