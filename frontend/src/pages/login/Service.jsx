import React from "react";

import "./Service.css";

import { BsExclamationTriangle } from "react-icons/bs";

const Service = () => {
  return (
    <div className="Service">
      <div className="icon">
        <BsExclamationTriangle size={55} />
      </div>
      <div className="text">서비스 준비중 입니다</div>
    </div>
  );
};

export default Service;
