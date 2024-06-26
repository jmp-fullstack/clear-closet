import React, { useState } from "react";
import "./Deal.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import DealTabs from "../../components/tabs/DealTabs";
import { GoBell } from "react-icons/go";
import ChatNone from "./ChatNone";

const tabs = ["채팅", "구매", "판매"];

const Deal = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const renderContent = () => {
    switch (currentTab) {
      case "채팅":
        return (
          <div>
            <ChatNone />
          </div>
        );
      case "구매":
        return <div>구매 페이지</div>;
      case "판매":
        return <div>판매 페이지</div>;
      default:
        return null;
    }
  };

  return (
    <div className="Deal">
      <div className="header-sec">
        <div className="title">거래</div>
        <div className="alarm-icon">
          <GoBell size={26} />
        </div>
      </div>
      <div className="tab-sec">
        <DealTabs
          tabs={tabs.map((label) => ({ label }))}
          onTabClick={handleTabClick}
        />
      </div>
      <div className="content-sec">{renderContent()}</div>
      <BottomNav />
    </div>
  );
};

export default Deal;
