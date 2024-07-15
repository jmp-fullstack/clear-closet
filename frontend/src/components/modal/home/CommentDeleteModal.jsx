import React from "react";
import CenterModal from "../my/CenterModal";
import "./CommentDeleteModal.css";
import CheckButton from "../../Button/CheckButton";

const CommentDeleteModal = ({ closeModal }) => {
  return (
    <CenterModal isOpen={true}>
      <div className="comment-modal">
        <div className="title">댓글이 삭제 되었습니다</div>
        <div className="button">
          <CheckButton onClick={closeModal} />
        </div>
      </div>
    </CenterModal>
  );
};

export default CommentDeleteModal;
