import axios from "axios";

export async function list_comments(article_pk) {
  try {
    const access = localStorage.getItem("access");
    const response = await axios.get(`/api/comments/${article_pk}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("좋아요한 목록을 가져오는 중 오류 발생:", error);
    throw error;
  }
}

// 댓글 등록 API
export const create_comment = async (article_pk, commentData) => {
  console.log("Comment create Request Data:", commentData);
  try {
    const response = await axios.post(
      `/api/comments/create/${article_pk}/`,
      commentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Post Article Response Data:", error.response?.data);
    throw error;
  }
};

// 댓글 수정 API
export const fetch_comment = async (
  article_pk,
  comment_pk,
  modifiedData,
  access
) => {
  try {
    const response = await axios.patch(
      `/api/comments/modify/${article_pk}/${comment_pk}`,
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
    console.error("댓글 수정 중 오류 발생:", error.response?.data);
    throw error;
  }
};

// 댓글 삭제 API
export const delete_comment = async (article_pk, comment_pk, access) => {
  try {
    const response = await axios.delete(
      `/api/comments/delete/${article_pk}/${comment_pk}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      }
    );
    console.log("Delete response data:", response.data); // 응답 데이터 로그
    return response.data;
  } catch (error) {
    console.error(
      "댓글 삭제 중 오류 발생:",
      error.response?.data || error.message
    );
    throw error;
  }
};
