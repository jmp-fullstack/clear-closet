import React, { useEffect, useState } from "react";
import { sell_ai } from "../../../api/ai";

import Modal from "../Modal";
import card from "../../../assets/card/product_sample_1.png";
import { won } from "../../../api/utils/currency";

import { IoCloseOutline } from "react-icons/io5";

import "./AiRecoModal.css";

const AiRecoModal = ({
  closeModal,
  brand,
  productStatus,
  imageFile,
  setPrice,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    if (!brand || !productStatus || !imageFile) {
      setError(new Error("Invalid brand, product status, or image file"));
      setLoading(false);
      console.error("Invalid brand, product status, or image file");
      return;
    }

    const fetchData = async () => {
      try {
        const aiData = {
          files: {
            image: imageFile,
          },
          data: {
            product_brand: brand,
            product_status: productStatus,
          },
        };
        console.log("Sending article data to AI:", aiData);
        const response = await sell_ai(aiData);
        setRecommendations(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [brand, productStatus, imageFile]);

  if (loading) {
    console.log("Loading...");
    return null;
  }

  if (error) {
    console.error("Error:", error.message);
    return null;
  }

  const handleWriteClick = () => {
    closeModal();
  };

  const handlePriceClick = () => {
    setPrice(recommendations.e_price); // 추천 가격을 설정합니다.
    closeModal();
  };

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <div className="AiReco-modal">
        <div className="cancel" onClick={closeModal}>
          <IoCloseOutline size={30} />
        </div>
        <div className="recommened-sec">
          <div className="title">AI가 추천해 드릴게요</div>
          <div className="result">
            <div className="price">
              {won(recommendations.s_pirce)} ~ {won(recommendations.e_price)}
            </div>
            <div className="how">결과는 어떠신가요?</div>
          </div>
          <div className="buttons">
            <button className="button enabled" onClick={handleWriteClick}>
              직접 작성할래요
            </button>
            <button className="button enabled" onClick={handlePriceClick}>
              {won(recommendations.e_price)}으로 할래요
            </button>
          </div>
        </div>

        <div className="AiReco-cards">
          <div className="show">비슷한 상품을 보여드릴게요</div>
          <div className="reco">
            <div className="reco-1">
              <div className="info-1">놀부심보의 상품</div>
              {recommendations.our_site_products.length > 0 ? (
                recommendations.our_site_products.map((product, index) => (
                  <div className="card-sec" key={index}>
                    <img
                      src={
                        product.product_images.length > 0
                          ? product.product_images[0].image_url
                          : card
                      }
                      alt="Card"
                      className="card"
                    />
                    <div className="name">{product.product_title}</div>
                    <div className="price">{won(product.price)}원</div>
                  </div>
                ))
              ) : (
                <div>비슷한 상품이 존재하지 않습니다</div>
              )}
            </div>
            <div className="reco-2">
              <div className="info-2">다른 사이트의 상품</div>
              {recommendations.other_site_products.length > 0 ? (
                recommendations.other_site_products.map((product, index) => (
                  <div className="card-sec" key={index}>
                    <img
                      src={
                        product.product_images.length > 0
                          ? product.product_images[0].image_url
                          : card
                      }
                      alt="Card"
                      className="card"
                    />
                    <div className="name">{product.product_title}</div>
                    <div className="price">{won(product.price)}원</div>
                  </div>
                ))
              ) : (
                <div>비슷한 상품이 존재하지 않습니다</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AiRecoModal;
