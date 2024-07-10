import React from "react";
import { useNavigate } from "react-router-dom";
import { article_delete, article_detail } from "../../../api/articles";
import DownModal from "../alarm/DownModal";
import "./ProductModal.css";

const ProductModal = ({ closeModal, article_pk }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const access = localStorage.getItem("access");
      if (!access) {
        throw new Error("액세스 토큰을 찾을 수 없습니다");
      }

      console.log(`게시글 삭제 성공: ${article_pk}`); // 성공 로그
      navigate("/search");
      closeModal();
      // 삭제 API 호출
      await article_delete(article_pk, access);
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
    }
  };

  const handleModify = async () => {
    try {
      const access = localStorage.getItem("access");
      if (!access) {
        throw new Error("액세스 토큰을 찾을 수 없습니다");
      }

      // 게시글 상세 정보 가져오기
      const articleData = await article_detail(article_pk, access);

      console.log(`게시글 수정 페이지로 이동: ${article_pk}`); // 성공 로그
      navigate(`/sell?modify=${article_pk}`, {
        state: { articleData, article_pk },
      });
      closeModal();
    } catch (error) {
      console.error("게시글 수정 중 오류 발생:", error);
    }
  };

  return (
    <DownModal isOpen={true} closeModal={closeModal}>
      <div className="Product-modal">
        <div className="topline"></div>
        <div className="Product-sec">
          <div className="text" onClick={handleDelete}>
            게시글 삭제하기
          </div>
          <div className="line"></div>
          <div className="text" onClick={handleModify}>
            게시글 수정하기
          </div>
        </div>
      </div>
    </DownModal>
  );
};

export default ProductModal;
