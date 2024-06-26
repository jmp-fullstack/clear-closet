import React from "react";

import "./ChatNone.css";

import { PiChatsLight } from "react-icons/pi";

const ChatNone = () => {
  return (
    <div className="ChatNone">
      <div className="icon">
        <PiChatsLight size={120} />
      </div>
      <div className="info">
        <p>채팅이 없습니다</p>
        <p>이곳에서 구매, 판매한 제품을</p>
        <p>확인할 수 있습니다</p>
      </div>
    </div>
  );
};

export default ChatNone;
