import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth";

import "./SignUp.css";

import SignupButton from "../../components/Button/SignupButton";
import { GoCheckCircle } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";

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

  const handleCardSecClick = () => {
    navigate(`/login`);
  };

  return (
    <div className="SignUp">
      <div className="header-sec">
        <div className="left">
          <IoIosArrowBack size={26} onClick={handleCardSecClick} />
        </div>
        <div className="right">회원가입</div>
      </div>

      <div className="putin-sec">
        <form className="sign-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
            className="sign-field"
            autoComplete="email"
          />
          <div className="line"></div>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            className="sign-field"
            autoComplete="current-password"
          />
          <div className="line"></div>
          <input
            type="text"
            placeholder="이름을 입력해 주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
            className="sign-field"
          />
          <div className="line"></div>
          <input
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            aria-label="Nickname"
            className="sign-field"
          />
          <div className="line"></div>
          <input
            type="text"
            placeholder="휴대폰 번호를 -없이 입력해 주세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-label="Phone"
            className="sign-field"
          />
          <div className="line"></div>
          {/* 프로필 이미지 업로드 필드를 추가할 수도 있습니다. */}
        </form>
      </div>
      {error && <div className="error-message">{error}</div>}

      <div className="marketing-sec">
        <div className="icon">
          <GoCheckCircle size={30} />
        </div>
        <div className="text">
          신제품, 이벤트 안내 등 광고성 마케팅 수신 동의 (선택)
        </div>
      </div>

      <div className="terms-sec">
        <div className="term">
          <div className="title">놀부심보 이용 약관</div>
          <div className="icon">
            <SlArrowDown size={18} />
          </div>
        </div>
        <div className="content">
          본인은 만 14세 이상이며, 위 약관 내용을 확인하였습니다
        </div>
      </div>

      <div className="signup-sec">
        <SignupButton onClick={handleSignupClick} />
      </div>
    </div>
  );
};

export default SignUp;
