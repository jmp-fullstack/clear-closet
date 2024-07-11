import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import BottomNav from "../../components/BottomNav/BottomNav";
import DealTabs from "../../components/tabs/deal/DealTabs";
import ChatNone from "./ChatNone";

import { GoBell } from "react-icons/go";

import "./Deal.css";
import DealSoldout from "../../components/tabs/deal/DealSoldout";
import DealSell from "../../components/tabs/deal/DealSell";

const tabs = ["판매중", "판매 완료", "채팅"];

const Deal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isSell = params.get("isSell");
    if (isSell === "true") {
      setCurrentTab("판매중");
    } else if (isSell === "false") {
      setCurrentTab("판매 완료");
    } else {
      setCurrentTab("채팅");
    }
  }, [location.search]);

  const handleAlarmClick = () => {
    navigate("/alarm");
  };

  const handleTabClick = (tab) => {
    let queryParam = "";
    if (tab === "판매중") {
      queryParam = "isSell=true";
    } else if (tab === "판매 완료") {
      queryParam = "isSell=false";
    } else if (tab === "채팅") {
      queryParam = "chat";
    }
    setCurrentTab(tab);
    navigate(`/deal?${queryParam}`);
  };

  const handleStatusToggle = (newIsSell) => {
    const newTab = newIsSell ? "판매중" : "판매 완료";
    navigate(`/deal?isSell=${newIsSell}`);
    setCurrentTab(newTab);
    window.location.reload();
  };

  const renderContent = () => {
    switch (currentTab) {
      case "판매중":
        return <DealSell onStatusToggle={handleStatusToggle} />;
      case "판매 완료":
        return <DealSoldout onStatusToggle={handleStatusToggle} />;
      case "채팅":
        return <ChatNone />;
      default:
        return null;
    }
  };

  return (
    <div className="Deal">
      <div className="header-sec">
        <div className="title">거래</div>
        <div className="alarm-icon">
          <GoBell size={26} onClick={handleAlarmClick} />
        </div>
      </div>
      <div className="tab-sec">
        <DealTabs
          tabs={tabs.map((label) => ({ label }))}
          onTabClick={handleTabClick}
          currentTab={currentTab}
        />
      </div>
      <div className="content-sec">{renderContent()}</div>
      <BottomNav />
    </div>
  );
};

export default Deal;
