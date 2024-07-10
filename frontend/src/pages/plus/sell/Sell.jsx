import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { article_create, article_modify } from "../../../api/articles";

import BottomNav from "../../../components/BottomNav/BottomNav";
import GuideModal from "../../../components/modal/plus/GuideModal";
import SellCategoryModal from "../../../components/modal/plus/SellCategoryModal";
import BrendCategoryModal from "../../../components/modal/plus/BrendCategoryModal";
import StatusCategoryModal from "../../../components/modal/plus/StatusCategoryModal";
import Placeholder from "../../../components/placeholder/Placeholder";
import SellOptionModal from "../../../components/modal/plus/SellOptionModal";
import ImageUpload from "../../../assets/ImageUpload";

import { FaCirclePlus } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

import "./Sell.css";

const Sell = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBrendCategoryModal, setShowBrendCategoryModal] = useState(false);
  const [selectedBrendCategory, setSelectedBrendCategory] = useState("");
  const [showStatusCategoryModal, setShowStatusCategoryModal] = useState(false);
  const [selectedStatusCategory, setSelectedStatusCategory] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [image_urls, setImage_urls] = useState([]);
  const [titleLength, setTitleLength] = useState(0);
  const [title, setTitle] = useState("");
  const [priceLength, setPriceLength] = useState(0);
  const [price, setPrice] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [content, setContent] = useState("");
  const [articlePk, setArticlePk] = useState(null); // 게시글 ID 상태 추가
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태 추가

  const navigate = useNavigate();
  const location = useLocation();
  const imageUploadRef = useRef();

  useEffect(() => {
    if (location.state && location.state.image_urls) {
      setImage_urls(location.state.image_urls);
    }
    if (location.state && location.state.articleData) {
      const { articleData } = location.state;
      setArticlePk(articleData.id); // 게시글 ID 설정
      setImage_urls(
        articleData.product.product_images.map((img) => img.image_url) || [""]
      );
      setSelectedBrendCategory(articleData.product.brand || "");
      setSelectedStatusCategory(articleData.product.product_status || "");
      setTitle(articleData.title || "");
      setContent(articleData.content || "");
      setTitleLength(articleData.title?.length || 0);
      setContentLength(articleData.content?.length || 0);
      setPriceLength(articleData.product.price?.toString().length || 0);
      setPrice(articleData.product.price || "");
      setSelectedCategory(
        `${articleData.product.category.top_category} > ${articleData.product.category.bottom_category}` ||
          ""
      );
      setSelectedOption(
        `Color: ${articleData.product.option.color} / Size: ${articleData.product.option.size}` ||
          ""
      );
      setIsEditMode(true); // 수정 모드로 설정
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

  const handleCreateSubmit = async () => {
    const optionParts = selectedOption.split(" / ");
    const size = optionParts.length > 1 ? optionParts[1].split(": ")[1] : "";
    const color = optionParts.length > 0 ? optionParts[0].split(": ")[1] : "";
    const categoryParts = selectedCategory.split(" > ");
    const topCategory = categoryParts[0] || "";
    const bottomCategory = categoryParts[1] || "";

    const articleData = {
      title,
      content,
      product: {
        image_urls,
        brand: selectedBrendCategory,
        product_status: selectedStatusCategory,
        price,
        category: {
          top_category: topCategory,
          bottom_category: bottomCategory,
        },
        option: {
          size,
          color,
        },
      },
    };

    try {
      const response = await article_create(articleData);
      const newArticlePk = response.id;
      navigate(`/product?detail=${newArticlePk}`);
    } catch (error) {
      console.error("Failed to submit article:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  const handleModifySubmit = async () => {
    const optionParts = selectedOption.split(" / ");
    const size = optionParts.length > 1 ? optionParts[1].split(": ")[1] : "";
    const color = optionParts.length > 0 ? optionParts[0].split(": ")[1] : "";
    const topCategory = selectedCategory.split(" > ")[0];
    const bottomCategory = selectedCategory.split(" > ")[1] || "";

    const modifiedData = {
      title,
      content,
      product: {
        image_urls,
        brand: selectedBrendCategory,
        product_status: selectedStatusCategory,
        price,
        category: {
          top_category: topCategory,
          bottom_category: bottomCategory,
        },
        option: {
          size,
          color,
        },
      },
    };

    try {
      const access = localStorage.getItem("access");
      await article_modify(articlePk, access, modifiedData);
      navigate(`/product?detail=${articlePk}`);
    } catch (error) {
      console.error("Failed to modify article:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  const isAIButtonEnabled = selectedBrendCategory && selectedStatusCategory;
  const isSellButtonEnabled = selectedCategory && selectedOption;

  const handleUploadSuccess = (uploadedImages) => {
    const uploadedUrls = uploadedImages.map((img) => img.image_url);
    setImage_urls((prevUrls) => [...prevUrls, ...uploadedUrls]);
  };

  const handleImageUploadClick = () => {
    imageUploadRef.current.openFileDialog();
  };

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
            <div className="box" onClick={handleImageUploadClick}>
              {image_urls.length > 0 ? (
                image_urls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt="상품 이미지"
                    className="uploaded-img"
                  />
                ))
              ) : (
                <FaCirclePlus size={26} />
              )}
            </div>
          </div>
        </div>
        <ImageUpload
          ref={imageUploadRef}
          onUploadSuccess={handleUploadSuccess}
        />
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
            setSelectedBrendCategory={setSelectedBrendCategory}
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
            setSelectedStatusCategory={setSelectedStatusCategory}
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
            setSelectedCategory={setSelectedCategory}
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
          {isEditMode ? (
            <button
              className="apply-button"
              onClick={handleModifySubmit}
              style={{
                backgroundColor: isSellButtonEnabled ? "#8f0456" : "#dadada",
                color: "#ffffff",
                cursor: isSellButtonEnabled ? "pointer" : "not-allowed",
              }}
              disabled={!isSellButtonEnabled}
            >
              상품을 수정할래요
            </button>
          ) : (
            <button
              className="apply-button"
              onClick={handleCreateSubmit}
              style={{
                backgroundColor: isSellButtonEnabled ? "#8f0456" : "#dadada",
                color: "#ffffff",
                cursor: isSellButtonEnabled ? "pointer" : "not-allowed",
              }}
              disabled={!isSellButtonEnabled}
            >
              상품을 판매할래요
            </button>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Sell;
