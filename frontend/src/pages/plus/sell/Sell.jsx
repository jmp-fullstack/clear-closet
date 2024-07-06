import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { article_create } from "../../../api/articles";

import BottomNav from "../../../components/BottomNav/BottomNav";
import GuideModal from "../../../components/modal/GuideModal";
import SellCategoryModal from "../../../components/modal/plus/SellCategoryModal";
import BrendCategoryModal from "../../../components/modal/plus/BrendCategoryModal";
import StatusCategoryModal from "../../../components/modal/plus/StatusCategoryModal";
import Placeholder from "../../../components/placeholder/Placeholder";
import SellOptionModal from "../../../components/modal/plus/SellOptionModal";

import { FaCirclePlus } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

import "./Sell.css";

const Sell = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBrendCategoryModal, setShowBrendCategoryModal] = useState(false);
  const [selectedBrendCategory, setSelectedBrendcategory] = useState("");
  const [showStatusCategoryModal, setShowStatusCategoryModal] = useState(false);
  const [selectedStatusCategory, setSelectedStatuscategory] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedcategory] = useState("");
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [title, setTitle] = useState("");
  const [priceLength, setPriceLength] = useState(0);
  const [price, setPrice] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.imageUrl) {
      setImageUrl(location.state.imageUrl);
    }
  }, [location]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowBrendCategoryModal = () => {
    setShowBrendCategoryModal(true);
  };

  const handleCloseBrendCategoryModal = () => {
    setShowBrendCategoryModal(false);
  };

  const handleShowStatusCategoryModal = () => {
    setShowStatusCategoryModal(true);
  };

  const handleCloseStatusCategoryModal = () => {
    setShowStatusCategoryModal(false);
  };

  const handleShowCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };

  const handleShowOptionModal = () => {
    setShowOptionModal(true);
  };

  const handleCloseOptionModal = () => {
    setShowOptionModal(false);
  };

  const handleQuestClick = () => {
    navigate(`/search`);
  };

  const handleCameraClick = () => {
    navigate(`/camera-sell`);
  };

  const handleTitleChange = (event) => {
    const title = event.target.value;
    setTitle(title);
    setTitleLength(title.length);
  };

  const handlePriceChange = (event) => {
    const price = event.target.value;
    setPrice(price);
    setPriceLength(price.length);
  };

  const handleContentChange = (event) => {
    const content = event.target.value;
    setContent(content);
    setContentLength(content.length);
  };

  const handleSubmit = async () => {
    const optionParts = selectedOption.split(" / ");
    const size = optionParts.length > 1 ? optionParts[1].split(": ")[1] : "";
    const color = optionParts.length > 0 ? optionParts[0].split(": ")[1] : "";
    const topCategory = selectedCategory.split(" > ")[0];
    const bottomCategory = selectedCategory.split(" > ")[1] || "";

    try {
      const response = await article_create(
        [imageUrl],
        selectedBrendCategory,
        1,
        selectedStatusCategory,
        price,
        topCategory,
        bottomCategory,
        size,
        color,
        title,
        content
      );
      console.log("Article posted successfully:", response);
      const article_pk = response.id; // 서버에서 반환된 article ID
      navigate(`/product?detail=${article_pk}`);
    } catch (error) {
      console.error("Failed to post article:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  const isAIButtonEnabled = selectedBrendCategory && selectedStatusCategory;
  const isSellButtonEnabled = selectedCategory && selectedOption;

  return (
    <div className="Sell">
      <div className="guide-sec" onClick={handleShowModal}>
        <div className="guide-text-1">상품을 올리기 전에 사진촬영 가이드를</div>
        <div className="guide-text-2">꼭 읽어주세요</div>
      </div>
      {showModal && <GuideModal closeModal={handleCloseModal} />}
      <div className="form-sec">
        <div className="photo">
          <div className="photo-text">상품 사진</div>
          <div className="photo-box">
            <div className="box">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="상품 이미지"
                  className="uploaded-img"
                />
              ) : (
                <FaCirclePlus size={26} onClick={handleCameraClick} />
              )}
            </div>
          </div>
        </div>
        <div className="brend">
          <div className="text">브랜드</div>
          <div className="select" onClick={handleShowBrendCategoryModal}>
            {selectedBrendCategory ? selectedBrendCategory : "선택"}{" "}
            <IoIosArrowForward size={22} className="icon" />
          </div>
        </div>
        {showBrendCategoryModal && (
          <BrendCategoryModal
            closeModal={handleCloseBrendCategoryModal}
            setSelectedBrendcategory={setSelectedBrendcategory}
          />
        )}
        <div className="status">
          <div className="text">상품 상태</div>
          <div className="select" onClick={handleShowStatusCategoryModal}>
            {selectedStatusCategory ? selectedStatusCategory : "선택"}{" "}
            <IoIosArrowForward size={22} className="icon" />
          </div>
        </div>
        {showStatusCategoryModal && (
          <StatusCategoryModal
            closeModal={handleCloseStatusCategoryModal}
            setSelectedStatuscategory={setSelectedStatuscategory}
          />
        )}
        <div className="ai-button">
          <button
            className="apply-button"
            onClick={handleQuestClick}
            style={{
              backgroundColor: isAIButtonEnabled ? "#8f0456" : "#dadada",
              color: "#ffffff",
              cursor: isAIButtonEnabled ? "pointer" : "not-allowed",
            }}
            disabled={!isAIButtonEnabled}
          >
            AI 측정하기
          </button>
        </div>

        <div className="info">
          <div className="title">
            <div className="title-text">
              <div className="left">상품 제목</div>
              <div className="right">{titleLength} / 30</div>
            </div>
            <div className="title-box">
              <input
                type="text"
                className="product-input"
                placeholder="상품 제목을 입력하세요"
                maxLength={30}
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          </div>
          <div className="price">
            <div className="price-text">
              <div className="left">상품 가격</div>
              <div className="right">{priceLength} / 30</div>
            </div>
            <div className="price-box">
              <input
                type="text"
                className="product-input"
                placeholder="상품 가격을 입력하세요"
                maxLength={30}
                value={price}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          <div className="content">
            <div className="content-text">
              <div className="left">상품 설명</div>
              <div className="right">{contentLength} / 2500</div>
            </div>
            <div className="content-box">
              <Placeholder
                value={content}
                onChange={handleContentChange}
                maxLength={2500}
              />
            </div>
          </div>
        </div>
        <div className="category">
          <div className="text">카테고리</div>
          <div className="select" onClick={handleShowCategoryModal}>
            {selectedCategory ? selectedCategory : "선택"}{" "}
            <IoIosArrowForward size={22} className="icon" />
          </div>
        </div>
        {showCategoryModal && (
          <SellCategoryModal
            closeModal={handleCloseCategoryModal}
            setSelectedcategory={setSelectedcategory}
          />
        )}
        <div className="option">
          <div className="text">옵션</div>
          <div className="select" onClick={handleShowOptionModal}>
            {selectedOption ? selectedOption : "선택"}{" "}
            <IoIosArrowForward size={22} className="icon" />
          </div>
        </div>
        {showOptionModal && (
          <SellOptionModal
            closeModal={handleCloseOptionModal}
            setSelectedOption={setSelectedOption}
          />
        )}
        <div className="sell-button">
          <button
            className="apply-button"
            onClick={handleSubmit} // 게시글 등록 함수 호출
            style={{
              backgroundColor: isSellButtonEnabled ? "#8f0456" : "#dadada",
              color: "#ffffff",
              cursor: isSellButtonEnabled ? "pointer" : "not-allowed",
            }}
            disabled={!isSellButtonEnabled}
          >
            상품을 판매할래요
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Sell;
