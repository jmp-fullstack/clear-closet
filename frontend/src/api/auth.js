import api from "./utils/axios";

// 회원가입 API
export const signUp = async (
  username,
  password,
  phone_number,
  nickname,
  email
  // profile_image = null
) => {
  const requestData = {
    username,
    password,
    phone_number,
    nickname,
    email,
    // profile_image,
  };
  console.log("Request Data:", requestData); // 요청 데이터 출력

  try {
    const response = await api.post("/api/accounts/signup/", requestData);
    console.log("Sign Up Response Data:", response.data); // 응답 데이터 출력
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response Data:", error.response.data); // 서버 응답 데이터 출력
    }
    throw error;
  }
};

// 로그인 API
export const login = async (email, password) => {
  const requestData = {
    email,
    password,
  };
  // console.log("Login Request Data:", requestData);

  try {
    const response = await api.post("/api/accounts/login/", requestData);
    // console.log("Login Response Data:", response.data);
    const { access, refresh, username, nickname, id, email, profile_images } =
      response.data;

    // access_token과 user_id를 로컬 스토리지에 저장
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("username", username);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("user_pk", id);
    localStorage.setItem("email", email);
    localStorage.setItem("profile_image_url", profile_images.image_url);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Login Response Error:", error.response.data);
    }
    throw error;
  }
};

// 저장된 사용자 이름 가져오기 함수
export const getUsername = () => {
  return localStorage.getItem("username");
};

// 저장된 사용자 이름 가져오기 함수
export const getNickname = () => {
  return localStorage.getItem("nickname");
};

// 저장된 프로필 이미지 가져오기 함수
export const getProfileImageURL = () => {
  return localStorage.getItem("profile_image_url");
};

// 저장된 사용자 ID 가져오기 함수
export const getUserPk = () => {
  return localStorage.getItem("user_pk");
};

// 저장된 사용자 이메일 가져오기 함수
export const getEmail = () => {
  return localStorage.getItem("email");
};

// 로그아웃 API
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");
  localStorage.removeItem("nickname");
  localStorage.removeItem("refresh");
  localStorage.removeItem("profile_image_url");
  localStorage.removeItem("profile_images");
  localStorage.removeItem("user_pk");
  localStorage.removeItem("email");
  document.cookie = "refresh=; Max-Age=0; path=/;"; // 쿠키에서 refresh_token 제거
  window.location.href = "/login"; // 로그인 페이지로 리다이렉트
};

// 아이디 찾기 API
export const findId = async (username, phone_number) => {
  const requestData = {
    username,
    phone_number,
  };
  console.log("FindId Request Data:", requestData); // 요청 데이터 출력

  try {
    const response = await api.post("/api/accounts/find/user/", requestData);
    return response.data; // access token이 포함된 응답 데이터 반환
  } catch (error) {
    if (error.response) {
      console.error("FindId Response Data:", error.response.data); // 서버 응답 데이터 출력
    }
    throw error;
  }
};

// 비밀번호 재설정 인증 함수
export const findPwAuth = async (username, email, phone_number) => {
  const requestData = {
    username,
    email,
    phone_number,
  };
  console.log("FindPwAuth Request Data:", requestData);

  try {
    const response = await api.post(
      "/api/accounts/find/password/",
      requestData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("PasswordAuth Response Data:", error.response.data);
      if (error.response.status === 401) {
        console.error("Authentication failed: Unauthorized");
      }
    }
    throw error;
  }
};

// 비밀번호 재설정 완료 API (`resetPassword`)
export const resetPassword = async (newPassword) => {
  const requestData = {
    new_password: newPassword,
  };

  try {
    const response = await api.post(
      "/api/accounts/change/password/",
      requestData,
      {
        withCredentials: true, // 쿠키를 함께 보냄
      }
    );

    // 쿠키에서 reset 삭제
    document.cookie = `reset=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

    return response.data; // 응답 데이터 반환
  } catch (error) {
    if (error.response) {
      console.error("Reset Password Response Data:", error.response.data); // 서버 응답 데이터 출력
    }
    throw error;
  }
};

// 회원 탈퇴 API
export const delete_user = async (email, username, password) => {
  const requestData = {
    email: email,
    username: username,
    password: password,
  };

  const access = localStorage.getItem("access");

  if (!access) {
    throw new Error("No access token available");
  }

  const headers = {
    Authorization: `Bearer ${access}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await api.delete(`/api/accounts/`, {
      headers: headers,
      data: requestData,
    });

    // 응답 데이터 반환
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Delete Response Data:", error.response.data);
    }
    throw error;
  }
};
