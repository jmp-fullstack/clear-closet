import axios from "axios";

export async function user_profile(user_pk) {
  try {
    const access = localStorage.getItem("access");
    const response = await axios.get(`/api/profiles/${user_pk}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export async function update_user_profile(user_pk, updateData) {
  try {
    const access = localStorage.getItem("access");
    const response = await axios.patch(
      `/api/profiles/${user_pk}/`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}
export async function article_sales_list(user_pk, isSell) {
  try {
    const access = localStorage.getItem("access");
    const response = await axios.get(`/api/profiles/${user_pk}/sales/list/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      params: {
        isSell: isSell,
      },
    });
    return response.data;
  } catch (error) {
    console.error("판매 목록을 가져오는 중 오류 발생:", error);
    throw error;
  }
}
