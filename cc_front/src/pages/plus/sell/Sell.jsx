import React, { useState } from "react";

import "./Sell.css";

import BottomNav from "../../../components/BottomNav/BottomNav";
import GuideModal from "../../../components/modal/GuideModal";

import { FaCirclePlus } from "react-icons/fa6";
import SellCategoryModal from "../../../components/modal/SellCategoryModal";
import { IoIosArrowForward } from "react-icons/io";

const Sell = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
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
            <div className="box">
              <FaCirclePlus size={26} className="box-icon" />
              <div className="box-text">0/10</div>
            </div>
          </div>
        </div>
        <div className="info">
          <div className="title">
            <div className="title-text">
              <div className="left">상품 제목</div>
              <div className="right">0 / 30</div>
            </div>
            <div className="title-box">상품 제목 입력</div>
          </div>
          <div className="content">
            <div className="content-text">
              <div className="left">상품 설명</div>
              <div className="right">0 / 2500</div>
            </div>
            <div className="content-box">
              상품 설명을 자세하게 적어주세요. <br /> 문의가 줄어들고, 판매율이
              올라갈 수 있어요. <br />
              ex.) 실측 사이트, 소재, 제품 상태
              <br />
              <br />
              아이템 관련 해쉬태그를 작성할 수 있어요.
              <br /># 추천태그 # 특수문자 제외
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="category-sec">
          <div className="text">카테고리</div>
          <div className="select" onClick={handleShowCategoryModal}>
            선택 <IoIosArrowForward size={22} className="icon" />
          </div>
        </div>
        {showCategoryModal && (
          <SellCategoryModal closeModal={handleCloseCategoryModal} />
        )}
        <div className="line"></div>
        <div className="option">옵션</div>
        <div className="sell-button">상품을 판매할래요</div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Sell;
