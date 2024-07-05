import React, { forwardRef } from "react";
import Draggable from "react-draggable";
import "./MoveModal.css";

const MoveModal = forwardRef(({ isOpen, closeModal, children }, ref) => {
  if (!isOpen) return null;

  return (
    <div className="moveModal" onClick={closeModal}>
      <Draggable nodeRef={ref} axis="y" bounds="parent">
        <div
          className="moveModal-content"
          ref={ref}
          onClick={(e) => e.stopPropagation()} // 이벤트 전파 방지
        >
          {children}
        </div>
      </Draggable>
    </div>
  );
});

export default MoveModal;
