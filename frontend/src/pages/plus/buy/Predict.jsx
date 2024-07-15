import React from "react";
import { useLocation } from "react-router-dom";
import "./Predict.css";
import BuyModal from "../../../components/modal/camera/BuyModal";

const Predict = () => {
  const location = useLocation();
  const {
    imageUrls,
    imageFile,
    selectedBrendCategory,
    selectedStatusCategory,
  } = location.state || {};

  return (
    <div className="Predict">
      <div className="image">
        {imageUrls && imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <div key={index} className="imgBox">
              <img src={url} alt="캡처된 이미지" className="img" />
            </div>
          ))
        ) : (
          <p>이미지가 없습니다</p>
        )}
      </div>
      <div className="modal">
        <BuyModal
          imageFile={imageFile}
          selectedBrendCategory={selectedBrendCategory}
          selectedStatusCategory={selectedStatusCategory}
        />
      </div>
    </div>
  );
};

export default Predict;
