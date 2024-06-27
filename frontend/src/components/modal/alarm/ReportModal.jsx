import React from "react";

import DownModal from "./DownModal";

import "./ReportModal.css";

const ReportModal = ({ closeModal }) => {
  return (
    <DownModal isOpen={true} closeModal={closeModal}>
      <div className="report-modal">
        <div className="topline"></div>

        <div className="report-sec">
          <div className="text">신고하기</div>
          <div className="line"></div>
          <div className="text">숨기기</div>
        </div>
      </div>
    </DownModal>
  );
};

export default ReportModal;
