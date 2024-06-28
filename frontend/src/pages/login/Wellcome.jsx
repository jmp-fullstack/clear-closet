import React from "react";
import { useNavigate } from "react-router-dom";

import "./Wellcome.css";
import CheckButton from "../../components/Button/CheckButton";

const Wellcome = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/login");
  };

  return (
    <div className="Wellcome">
      <div className="well-sec">
        <p className="text-gap">반갑습니다!</p>
        <p className="text-gap">회원이 되신 것을 환영합니다</p>
      </div>
      <div className="well_signin-sec">
        <CheckButton onClick={handleSignupClick} />
      </div>
    </div>
  );
};

export default Wellcome;
