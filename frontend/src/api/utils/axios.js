import axios from "axios";
import { logout } from "../auth";

// 기본 API 설정
const api = axios.create({
  baseURL: "", // API의 기본 URL을 설정
  withCredentials: true, // 쿠키를 포함한 요청을 보낼 수 있도록 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터 추가하여 access 저장
api.interceptors.response.use(
  (response) => {
    if (response.headers["authorization"]) {
      const access = response.headers["authorization"].split(" ")[1];
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
        // 로컬 스토리지에서 리프레시 토큰을 가져옵니다.
        const refresh = localStorage.getItem("refresh");
        if (!refresh) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(
          "/api/accounts/refresh/",
          { refresh }, // 요청 바디에 리프레시 토큰을 포함
          {
            withCredentials: true, // 쿠키를 포함하여 요청
          }
        );
        const { access } = response.data;

        localStorage.setItem("access", access);

        originalRequest.headers["Authorization"] = `Bearer ${access}`;

        return api(originalRequest); // 원래 요청을 재시도합니다
      } catch (refreshError) {
        console.error("Failed to refresh access token", refreshError);
        logout(); // 로그아웃 함수 호출
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트
      }
    }

    if (error.response.status === 401) {
      // 로그아웃 처리 및 리다이렉트
      logout();
      window.location.href = "/login";
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
