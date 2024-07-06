import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Find.css";

import FindTabs from "../../components/tabs/find/FindTabs";
import FindId from "../../components/tabs/find/FindId";

import { IoIosArrowBack } from "react-icons/io";
import FindPw from "../../components/tabs/find/FindPw";

const tabs = ["아이디 찾기", "비밀번호 재설정"];

const Find = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const navigate = useNavigate();

  const handleCardSecClick = () => {
    navigate(`/login`);
  };

  const renderContent = () => {
    switch (currentTab) {
      case "아이디 찾기":
        return (
          <div>
            <FindId />
          </div>
        );
      case "비밀번호 재설정":
        return (
          <div>
            <FindPw />
          </div>
        );
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="Find">
      <div className="header-sec">
        <div className="left">
          <IoIosArrowBack size={26} onClick={handleCardSecClick} />
        </div>
        <div className="right">아이디 찾기 / 비밀번호 재설정</div>
      </div>

      <div className="tab-sec">
        <FindTabs
          tabs={tabs.map((label) => ({ label }))}
          onTabClick={handleTabClick}
        />
      </div>

      <div className="content-sec">{renderContent()}</div>
    </div>
  );
};

export default Find;
