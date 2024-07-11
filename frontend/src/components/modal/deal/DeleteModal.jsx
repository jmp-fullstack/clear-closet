import React from "react";
import CenterModal from "../my/CenterModal";
import CheckButton from "../../Button/CheckButton";

import "./DeleteModal.css";

const DeleteModal = ({ closeModal }) => {
  return (
    <CenterModal isOpen={true}>
      <div className="delete-modal">
        <div className="title">게시물이 삭제 되었습니다</div>
        <div className="button">
          <CheckButton onClick={closeModal} />
        </div>
      </div>
    </CenterModal>
  );
};

export default DeleteModal;
