import React from "react";
import { useLocation } from "react-router-dom";
import "./Upload.css";
import BuyModal from "../modal/camera/BuyModal";

const Upload = () => {
  const location = useLocation();
  const { imageUrl } = location.state || {}; // 전달받은 상태에서 imageUrl 추출

  return (
    <div className="upload">
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

export default Upload;
