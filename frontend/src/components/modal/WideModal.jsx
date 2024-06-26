import React from "react";
import "./WideModal.css";

const WideModal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="wideModal">
      <div className="wideModal-content">
        {/* <button className="modal-close"></button> */}
        {children}
      </div>
    </div>
  );
};

export default WideModal;
