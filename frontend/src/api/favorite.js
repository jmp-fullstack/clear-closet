import axios from "axios";

export async function favorite_article(article_id) {
  try {
    const access = localStorage.getItem("access");
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
    console.error("Error toggling favorite:", error);
    throw error;
  }
}

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
    console.error("Error fetching favorite list:", error);
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
