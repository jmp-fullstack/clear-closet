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
    localStorage.setItem("product_images", articleData.product.image_urls);

    return response.data;
  } catch (error) {
    console.error("Post Article Response Data:", error.response?.data);
    throw error;
  }
};

// 게시글 전체 조회 API
export const article_list = async (articleData, access) => {
  try {
    const response = await api.get("/api/articles/list/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`, // 액세스 토큰을 헤더에 추가
      },
      params: articleData,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Get Article List Error Response Data:",
      error.response?.data
    );
    throw error;
  }
};

// 게시글 상세 정보 API
export const article_detail = async (article_pk, access) => {
  try {
    const response = await api.get(`/api/articles/detail/${article_pk}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시물 상세 정보 오류 응답 데이터:", error.response?.data);
    throw error;
  }
};

// 게시글 수정 API
export const article_modify = async (article_pk, access, modifiedData) => {
  console.log("Article modify Request Data:", modifiedData); // 수정 데이터 로그 출력

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
    console.log(`Deleting article with ID: ${article_pk}`); // 요청 전 로그
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
