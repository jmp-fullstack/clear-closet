import React from "react";
import "./WideModal.css";

const WideModal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="wideModal" onClick={closeModal}>
      <div className="wideModal-content">
        {/* <button className="modal-close"></button> */}
        {children}
      </div>
    </div>
  );
};

export default WideModal;
