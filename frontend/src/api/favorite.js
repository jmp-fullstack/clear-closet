import axios from "axios";

export const favorite_article = async (article_id) => {
  try {
    const access = localStorage.getItem("access");
    if (!access) {
      throw new Error("액세스 토큰이 없습니다");
    }
    const response = await axios.post(
      `/api/favorites/${article_id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("좋아요 토글 오류:", error.response?.data);
    throw error;
  }
};

export async function list_favorites() {
  try {
    const access = localStorage.getItem("access");
    const response = await axios.get(`/api/favorites/list/`, {
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

export async function list_top_favorited_articles() {
  try {
    const access = localStorage.getItem("access");
    const response = await axios.get(`/api/favorites/articles/list/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite list:", error);
    throw error;
  }
}
