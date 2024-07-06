import React from "react";

import DownModal from "../alarm/DownModal";

import "./ProductModal.css";

const ProductModal = ({ closeModal }) => {
  return (
    <DownModal isOpen={true} closeModal={closeModal}>
      <div className="Product-modal">
        <div className="topline"></div>

        <div className="Product-sec">
          <div className="text">게시글 수정하기</div>
          <div className="line"></div>
          <div className="text">게시글 삭제하기</div>
        </div>
      </div>
    </DownModal>
  );
};

export default ProductModal;
