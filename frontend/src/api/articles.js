import api from "./utils/axios";

// 게시글 등록 API
export const article_create = async (
  product_image,
  brand,
  product_type,
  product_status,
  price,
  top_category,
  bottom_category,
  size,
  color,
  title,
  content
) => {
  const requestData = {
    product: {
      product_image,
      brand,
      product_type,
      product_status,
      price,
      category: {
        top_category,
        bottom_category,
      },
      option: {
        size,
        color,
      },
    },
    title,
    content,
  };

  console.log("Article create Request Data:", requestData);
  try {
    const response = await api.post("/api/articles/", requestData, {
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

// 게시글 상세 조회 API
export const article_detail = async (article_pk, access) => {
  try {
    const response = await api.get(`/api/articles/detail/${article_pk}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`, // 액세스 토큰을 헤더에 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Get Article Detail Error Response Data:",
      error.response?.data
    );
    throw error;
  }
};
