import React, { useState } from "react";
// import { findPwAuth } from "../../api/auth";
import "./FindPw.css";

import FindPwButton from "../Button/find/FindPwButton";
import FindPwModal from "../modal/find/FindPwModal";

const FindPw = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [error, setError] = useState("");
  const [showFindModal, setShowFindModal] = useState(false);
  // const [foundPwAuth, setFoundPwAuth] = useState("");

  // 액세스 토큰을 환경 변수에서 가져오기 (또는 하드코딩된 값 사용)
  // const acToken =
  //   process.env.REACT_APP_ACCESS_TOKEN || "your-access-token-here";

  const handleShowFindModal = () => {
    setShowFindModal(true);
  };

  const handleCloseFindModal = () => {
    setShowFindModal(false);
  };

  // const handleFindPwAuthClick = async () => {
  //   try {
  //     const response = await findPwAuth(username, email, phone);
  //     console.log("FindId response:", response); // 응답 전체를 출력
  //     if (response) {
  //       setFoundPwAuth(response);
  //       handleShowFindModal();
  //     } else {
  //       console.log("PW not found");
  //       setError("비밀번호를 찾을 수 없습니다. 다시 시도해주세요.");
  //     }
  //   } catch (error) {
  //     console.error("FindPwAuth error", error);
  //     setError("비밀번호 찾기에 실패했습니다. 다시 시도해주세요.");
  //   }
  // };

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
      {/* {error && <div className="error-message">{error}</div>} */}
      <div className="id-button">
        <FindPwButton onClick={handleShowFindModal} />
      </div>
      {/* {showFindModal && (
        <FindPwModal
          closeModal={handleCloseFindModal}
          foundPwAuth={foundPwAuth}
        />
      )} */}
    </div>
  );
};

export default FindPw;
