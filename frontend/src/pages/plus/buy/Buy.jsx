import React from "react";
import { useLocation } from "react-router-dom";
import "./Buy.css";
import BuyModal from "../../../components/modal/camera/BuyModal";

const Buy = () => {
  const location = useLocation();
  const { imageUrl } = location.state || {}; // 전달받은 상태에서 imageUrl 추출

  return (
    <div className="Buy">
      <div className="image">
        {imageUrl ? (
          <div className="imgBox">
            <img src={imageUrl} alt="Captured" className="img" />
          </div>
        ) : (
          <p>No image captured</p>
        )}
      </div>
      <div className="modal">
        <BuyModal />
      </div>
    </div>
  );
};

export default Buy;
