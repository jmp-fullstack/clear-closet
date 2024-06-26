import React from "react";
import "./CenterModal.css";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="center-modal">
      <div className="content">
        <button className="close"></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
