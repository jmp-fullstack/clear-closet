import React, { useState } from "react";
import { findPwAuth } from "../../../api/auth";
import "./FindPw.css";

import FindPwButton from "../../Button/find/FindPwButton";
import FindPwModal from "../../modal/find/FindPwModal";

const FindPw = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showFindModal, setShowFindModal] = useState(false);

  const handleFindPwAuth = async () => {
    try {
      await findPwAuth(username, email, phone); // 응답을 변수에 저장할 필요가 없습니다
      setShowFindModal(true);
    } catch (error) {
      console.error("Authentication error:", error);
      setError("입력하신 정보가 일치하지 않습니다. 다시 확인해주세요.");
    }
  };

  const handleCloseFindModal = () => {
    console.log("Closing modal");
    setShowFindModal(false);
  };

  return (
    <div className="FindPw">
      <form className="find-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="이름을 입력해 주세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
          className="find-field"
        />
        <div className="line"></div>
        <input
          type="text"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          className="find-field"
        />
        <div className="line"></div>
        <input
          type="text"
          placeholder="휴대폰 번호를 -없이 입력해 주세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-label="Phone"
          className="find-field"
        />
        <div className="line"></div>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="id-button">
        <FindPwButton onClick={handleFindPwAuth} />
      </div>
      {showFindModal && <FindPwModal closeModal={handleCloseFindModal} />}
    </div>
  );
};

export default FindPw;
