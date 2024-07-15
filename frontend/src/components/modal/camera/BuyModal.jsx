import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sell_ai } from "../../../api/ai";

import card from "../../../assets/card/product_sample_1.png";
import LongBuyModal from "../deal/LongBuyModal";

import "./BuyModal.css";

const BuyModal = ({
  imageFile,
  selectedBrendCategory,
  selectedStatusCategory,
  closeModal,
}) => {
  const [recommendations, setRecommendations] = useState({
    our_site_products: [],
    other_site_products: [],
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (imageFile && selectedBrendCategory && selectedStatusCategory) {
        try {
          const aiData = {
            files: { image: imageFile },
            data: {
              product_brand: selectedBrendCategory,
              product_status: selectedStatusCategory,
            },
          };
          const response = await sell_ai(aiData);
          setRecommendations(
            response || { our_site_products: [], other_site_products: [] }
          );
        } catch (error) {
          console.error("AI 추천 데이터를 가져오는 중 오류 발생:", error);
        }
      }
    };

    fetchRecommendations();
  }, [imageFile, selectedBrendCategory, selectedStatusCategory]);

  const handleOtherClick = (url) => {
    window.open(url, "_blank");
  };

  const handleOurClick = (url) => {
    navigate(url, {
      state: {
        fromBuyPage: true,
        searchParams: searchParams.toString(),
        imageFile,
        selectedBrendCategory,
        selectedStatusCategory,
        imageUrls: [URL.createObjectURL(imageFile)],
      },
    });
  };

  return (
    <LongBuyModal isOpen={true} closeModal={closeModal}>
      <div className="Buy-modal">
        <div className="topline"></div>
        <div className="title-1">이 상품들은 어떤가요?</div>
        <div className="reco">
          <div className="reco-1">
            <div className="info-1">놀부심보의 상품</div>
            {recommendations.our_site_products.length > 0 ? (
              recommendations.our_site_products.map((product, index) => (
                <div
                  className="card-sec"
                  key={index}
                  onClick={() => handleOurClick(product.connect_url)}
                >
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
                  <div className="price">{product.price}원</div>
                </div>
              ))
            ) : (
              <p>추천 상품이 없습니다</p>
            )}
          </div>
          <div className="reco-2">
            <div className="info-2">다른 사이트의 상품</div>
            {recommendations.other_site_products.length > 0 ? (
              recommendations.other_site_products.map((product, index) => (
                <div
                  className="card-sec"
                  onClick={() => handleOtherClick(product.connect_url)}
                  key={index}
                >
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
                  <div className="price">{product.price}원</div>
                </div>
              ))
            ) : (
              <p>추천 상품이 없습니다</p>
            )}
          </div>
        </div>
      </div>
    </LongBuyModal>
  );
};

export default BuyModal;
