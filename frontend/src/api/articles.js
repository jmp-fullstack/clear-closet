import api from "./utils/axios";

// 게시글 등록 API
export const article_create = async (articleData) => {
  console.log("Article create Request Data:", articleData);
  try {
    const response = await api.post("/api/articles/", articleData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Post Article Response Data:", error.response?.data);
    throw error;
  }
};

// 게시글 전체 조회 API
export const article_list = async (
  articleData,
  access,
  page = 1,
  limit = 20
) => {
  try {
    const response = await api.get("/api/articles/list/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      params: { ...articleData, page, limit },
    });

    // 응답 데이터를 로그로 출력
    console.log("응답 데이터:", response.data);

    return response.data;
  } catch (error) {
    console.error("게시글 목록 조회 오류 응답 데이터:", error.response?.data);
    throw error;
  }
};

// 게시글 상세 정보 API
export const article_detail = async (article_pk, access) => {
  try {
    const response = await api.get(`/api/articles/detail/${article_pk}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시물 상세 조회 오류:", error.response?.data);
    throw error;
  }
};

// 게시글 수정 API
export const article_modify = async (article_pk, access, modifiedData) => {
  try {
    const response = await api.patch(
      `/api/articles/modify/${article_pk}`,
      modifiedData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      }
    );
    console.log(modifiedData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 수정 중 오류 발생:", error.response?.data);
    throw error;
  }
};

// 게시글 삭제 API
export const article_delete = async (article_pk, access) => {
  try {
    const response = await api.delete(`/api/articles/delete/${article_pk}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    console.log(`Delete response data:`, response.data); // 응답 데이터 로그

    localStorage.removeItem("product_images");
    return response.data;
  } catch (error) {
    console.error(
      "게시글 삭제 중 오류 발생:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 게시글 판매 상태 변경 함수
export async function article_is_sell(article_pk, accessToken) {
  try {
    const response = await api.post(
      `/api/articles/isSell/${article_pk}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("게시글 상태 변경 중 오류 발생:", error);
    throw error;
  }
}
