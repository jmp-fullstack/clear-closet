import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/auth";
import { useUser } from "../../pages/context/UserContext";

import logo from "../../assets/logo/logo_basic.png";
import LoginButton from "../../components/Button/login/LoginButton";
import KakaoButton from "../../components/Button/login/KakaoButton";
import GoogleButton from "../../components/Button/login/GoogleButton";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 오류 메시지 상태 추가
  const navigate = useNavigate();
  const { updateUser } = useUser(); // Context에서 사용자 정보 업데이트 함수 가져오기

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError(""); // 기존 오류 메시지 초기화

    // 이메일 형식 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    // 비밀번호 길이 검사
    if (password.length < 10) {
      setError("비밀번호는 10자 이상이어야 합니다.");
      return;
    }

    try {
      const response = await login(email, password);
      console.log("로그인 성공:", response);

      // 로그인 성공 시 사용자 정보 업데이트
      const userData = {
        username: response.username,
        nickname: response.nickname,
        profileImageURL: response.profile_images.image_url,
      };
      updateUser(userData);

      navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error);
      const errorData = error.response?.data;
      if (errorData?.error) {
        if (
          errorData.error.includes("이메일") ||
          errorData.error.includes("비밀번호")
        ) {
          setError("이메일 또는 비밀번호를 잘못 입력했습니다");
        } else {
          setError("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleFindClick = () => {
    navigate("/find");
  };

  const handleNoneClick = () => {
    navigate("/service");
  };

  return (
    <div className="login-con">
      <div className="logo-sec">
        <img src={logo} alt="Logo" />
      </div>
      <div className="sign-sec">
        <form className="form" onSubmit={handleLoginSubmit}>
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
          <LoginButton onClick={handleLoginSubmit} />
          {error && <div className="error-message">{error}</div>}{" "}
          {/* 오류 메시지 표시 */}
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
        {/* <div className="error">로그인에 문제가 있으신가요?</div> */}
      </div>
    </div>
  );
};

export default Login;
