import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import logo from "../../assets/logo/logo_basic.png";
import LoginButton from "../../components/Button/LoginButton";
import KakaoButton from "../../components/Button/KakaoButton";
import GoogleButton from "../../components/Button/GoogleButton";
import { login } from "../../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Login successful:", response);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      // 로그인 실패 시의 처리 (에러 메시지 등) - 여기서는 생략
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleFindClick = () => {
    navigate("/find");
  };

  const handleNoneClick = () => {
    navigate("/login");
  };

  return (
    <div className="login-con">
      <div className="logo-sec">
        <img src={logo} alt="Logo" />
      </div>
      <div className="sign-sec">
        <form className="form">
          <input
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="email"
            className="input-field"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            className="input-field"
            autoComplete="current-password"
          />
          <LoginButton type="submit" onClick={handleLoginSubmit} />
          <p className="bar-1"></p>
          <KakaoButton onClick={handleNoneClick} />
          <GoogleButton onClick={handleNoneClick} />
        </form>
      </div>
      <div className="find-sec">
        <div className="info">
          <div className="left" onClick={handleSignupClick}>
            회원 가입
          </div>
          <div className="bar-2">|</div>
          <div className="right" onClick={handleFindClick}>
            아이디 찾기 / 비밀번호 재설정
          </div>
        </div>
        <div className="error">로그인에 문제가 있으신가요?</div>
      </div>
    </div>
  );
};

export default Login;
