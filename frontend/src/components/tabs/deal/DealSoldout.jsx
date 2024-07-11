import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { article_sales_list } from "../../../api/myPage";

import SoldoutButton from "../../Button/deal/SoldoutButton";
import ReviewButton from "../../Button/deal/ReviewButton";
import DealSellModal from "../../modal/deal/DealSellModal";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

import "./DealSoldout.css";

const DealSoldout = ({ onStatusToggle }) => {
  const navigate = useNavigate();
  const [soldoutList, setSoldoutList] = useState([]);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  useEffect(() => {
    const getSalesList = async () => {
      try {
        const user_pk = localStorage.getItem("user_pk"); // 유저 pk 가져오기
        const articles = await article_sales_list(user_pk, "false");
        setSoldoutList(articles);
      } catch (error) {
        console.error("판매 완료 목록을 불러오는 중 오류 발생:", error);
      }
    };

    getSalesList();
  }, []);

  const handleClick = (id) => {
    navigate(`/search?detail=${id}`);
  };

  const handleShowSellModal = (articleId) => {
    setSelectedArticleId(articleId);
    setShowSellModal(true);
  };

  const handleCloseSellModal = () => {
    setShowSellModal(false);
    setSelectedArticleId(null);
  };

  const handleStatusChange = (newIsSell) => {
    onStatusToggle(newIsSell);
    handleCloseSellModal();
  };

  return (
    <div className="DealSoldout">
      {soldoutList.map((article) => (
        <div key={article.id} className="soldout-sec">
          <div className="soldout">
            <div className="photo">
              <img
                src={
                  article.product.product_images[0]?.image_url ||
                  "/path/to/default_image.png"
                }
                alt="card"
                className="card"
              />
            </div>
            <div className="info">
              <div className="deal-title">{article.title}</div>
              <div className="where">2주 전 {article.created_at}</div>
              <div className="price">
                <SoldoutButton onClick={() => handleClick(article.id)} />
                {article.product.price} 원
              </div>
              {showSellModal && selectedArticleId === article.id && (
                <DealSellModal
                  closeModal={handleCloseSellModal}
                  articleId={selectedArticleId}
                  isSell={false}
                  onStatusChange={handleStatusChange}
                />
              )}
            </div>
          </div>
          <div className="review-sec">
            <div className="review">
              <ReviewButton onClick={() => handleClick(article.id)} />
            </div>
            <div className="add">
              <HiOutlineDotsHorizontal
                size={22}
                onClick={() => handleShowSellModal(article.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DealSoldout;
