import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Start.css";

import logo from "../../assets/logo/logo_white.png";

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="Start">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default Start;
