import axios from "axios";

const api = axios.create({
  baseURL: "", // 프록시 설정을 사용하여 baseURL을 빈 문자열로 설정
});

export const signUp = async (
  username,
  password,
  phone_number,
  nickname,
  email,
  profile_image = null
) => {
  const requestData = {
    username,
    password,
    phone_number,
    nickname,
    email,
    profile_image,
  };
  console.log("Request Data:", requestData); // 요청 데이터 출력

  try {
    const response = await api.post("/api/accounts/signup/", requestData);
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
  console.log("Login Request Data:", requestData); // 요청 데이터 출력

  try {
    const response = await api.post("/api/accounts/login/", requestData);
    return response.data; // access token이 포함된 응답 데이터 반환
  } catch (error) {
    if (error.response) {
      console.error("Login Response Data:", error.response.data); // 서버 응답 데이터 출력
    }
    throw error;
  }
};
