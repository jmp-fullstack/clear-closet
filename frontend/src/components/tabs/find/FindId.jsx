import React, { useState } from "react";
import { findId } from "../../../api/auth";
import "./FindId.css";

import FindButton from "../../Button/find/FindButton";
import FindIdModal from "../../modal/find/FindIdModal";

const FindId = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showFindModal, setShowFindModal] = useState(false);
  const [foundId, setFoundId] = useState("");

  const handleShowFindModal = () => {
    console.log("Opening modal");
    setShowFindModal(true);
  };

  const handleCloseFindModal = () => {
    console.log("Closing modal");
    setShowFindModal(false);
  };

  const handleFindIdClick = async () => {
    try {
      const response = await findId(username, phone);
      console.log("FindId response:", response); // 응답 전체를 출력
      if (response && response.email) {
        setFoundId(response.email); // id 대신 email 사용
        // console.log("Found ID (email):", response.email);
        handleShowFindModal();
      } else {
        console.log("ID not found");
        setError("아이디를 찾을 수 없습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("FindId error", error);
      setError("아이디 찾기에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="FindId">
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
        <FindButton onClick={handleFindIdClick} />
      </div>
      {showFindModal && (
        <FindIdModal closeModal={handleCloseFindModal} foundId={foundId} />
      )}
    </div>
  );
};

export default FindId;
