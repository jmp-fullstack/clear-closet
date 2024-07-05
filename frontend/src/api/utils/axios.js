import axios from "axios";
import { logout } from "../auth"; // 로그아웃 함수를 가져옵니다. 위치에 맞게 수정해주세요.

// 기본 API 설정
const api = axios.create({
  baseURL: "", // 프록시 설정을 사용하여 baseURL을 빈 문자열로 설정
  withCredentials: true, // 쿠키를 포함한 요청을 보낼 수 있도록 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터 추가하여 access 저장
api.interceptors.response.use(
  (response) => {
    if (response.headers["authorization"]) {
      const access = response.headers["authorization"].split(" ")[1]; // 'Bearer ' 제거 후 토큰 추출
      localStorage.setItem("access", access); // 로컬 스토리지에 access 저장
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // accessToken이 만료되었을 때
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          "/api/accounts/refresh/",
          {},
          {
            withCredentials: true, // 쿠키를 포함하여 요청
          }
        );
        const { access } = response.data;
        // localStorage.setItem("access", access);
        localStorage.setItem("access", "expired_access");

        originalRequest.headers["Authorization"] = `Bearer ${access}`;

        return api(originalRequest); // 원래 요청을 재시도합니다
      } catch (refreshError) {
        console.error("Failed to refresh access token", refreshError);
        logout(); // 로그아웃 함수 호출
      }
    }

    return Promise.reject(error);
  }
);

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
