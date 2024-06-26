import React from "react";
import { useNavigate } from "react-router-dom";

import "./Plus.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import AiSellButton from "../../components/Button/plus/AiSellButton";
import AiBuyButton from "../../components/Button/plus/AiBuyButton";
import logo from "../../assets/logo/logo_basic.png";

const Plus = () => {
  const navigate = useNavigate();

  const handleAiSellClick = () => {
    setTimeout(() => {
      navigate("/sell");
    }, 200);
  };

  const handleAiBuyClick = () => {
    setTimeout(() => {
      navigate("/camera");
    }, 200);
  };

  return (
    <div className="Plus">
      <div className="logo-sec">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="button-sec">
        <div className="ai-sell">
          <AiSellButton onClick={handleAiSellClick} />
        </div>
        <div className="ai-buy">
          <AiBuyButton onClick={handleAiBuyClick} />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Plus;
