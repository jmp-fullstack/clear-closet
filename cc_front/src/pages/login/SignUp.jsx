import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth";

import Top from "../../components/top/Top";
import "./SignUp.css";
import { IoIosArrowBack } from "react-icons/io";
import SignupButton from "../../components/Button/SignupButton";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignupClick = async () => {
    try {
      const response = await signUp(
        username,
        password,
        phone,
        nickname,
        email,
        profileImage
      );
      console.log("SignUp success", response);
      navigate("/wellcome");
    } catch (error) {
      console.error("SignUp error", error);
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="SignUp">
      <Top />
      <div className="header-sec">
        <div className="left">
          <IoIosArrowBack size={26} />
        </div>
        <div className="right">회원가입</div>
      </div>

      <div className="putin-sec">
        <form className="sign-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
            className="sign-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            className="sign-field"
            autoComplete="current-password"
          />
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            aria-label="Nickname"
            className="sign-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
            className="sign-field"
            autoComplete="email"
          />
          <input
            type="text"
            placeholder="휴대폰 번호를 -없이 입력해주세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label="Phone"
            className="sign-field"
          />
          {/* 프로필 이미지 업로드 필드를 추가할 수도 있습니다. */}
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}
      <div className="terms-sec">약관 확인</div>
      <div className="signup-sec">
        <SignupButton onClick={handleSignupClick} />
      </div>
    </div>
  );
};

export default SignUp;
