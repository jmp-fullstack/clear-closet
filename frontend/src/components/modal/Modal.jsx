import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close"></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
