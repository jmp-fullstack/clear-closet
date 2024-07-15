import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  article_delete,
  article_is_sell,
  article_detail,
} from "../../../api/articles";

import ShortModal from "../../modal/my/ShortModal";
import DeleteModal from "../../modal/deal/DeleteModal";

import "./DealSellModal.css";

const DealSellModal = ({ closeModal, articleId, isSell, onStatusChange }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const access = localStorage.getItem("access");
        if (!access) {
          throw new Error("액세스 토큰을 찾을 수 없습니다");
        }
        const data = await article_detail(articleId, access);
        setArticleData(data);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error.message);
      }
    };

    fetchArticleData();
  }, [articleId]);

  const handleEditClick = () => {
    if (!articleData) {
      console.error("게시글 데이터를 불러오지 못했습니다.");
      return;
    }
    navigate(`/sell?modify=${articleId}`, {
      state: { articleData, articleId },
    });
    closeModal();
  };

  const handleDeleteClick = async () => {
    try {
      const access = localStorage.getItem("access");
      if (!access) {
        throw new Error("액세스 토큰을 찾을 수 없습니다");
      }

      setShowDeleteModal(true); // 삭제 모달 표시
      await article_delete(articleId, access);
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error.message);
    }
  };

  const handleStatusToggle = async () => {
    try {
      const access = localStorage.getItem("access");
      if (!access) {
        throw new Error("액세스 토큰을 찾을 수 없습니다");
      }
      await article_is_sell(articleId, access);
      onStatusChange(!isSell);
      navigate("/deal?isSell=true");
      window.location.reload();
    } catch (error) {
      console.error("게시글 상태 변경 중 오류 발생:", error.message);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    navigate("/deal?isSell=true");
    window.location.reload();
  };

  return (
    <>
      <ShortModal isOpen={!showDeleteModal} closeModal={closeModal}>
        <div className="dealSell-modal">
          <div className="topline"></div>

          <div className="dealSell-sec">
            {isSell ? (
              <div className="text" onClick={handleStatusToggle}>
                판매 완료
              </div>
            ) : (
              <div className="text" onClick={handleStatusToggle}>
                판매중
              </div>
            )}
            <div className="text" onClick={handleEditClick}>
              게시물 수정
            </div>
            <div className="text" onClick={handleDeleteClick}>
              삭제하기
            </div>
          </div>
        </div>
      </ShortModal>
      {showDeleteModal && <DeleteModal closeModal={handleCloseDeleteModal} />}
    </>
  );
};

export default DealSellModal;
