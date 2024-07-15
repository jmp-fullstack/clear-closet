import api from "./utils/axios";

export const sell_ai = async (aiData) => {
  const token = localStorage.getItem("access");

  if (!token) {
    throw new Error("액세스 토큰을 찾을 수 없습니다");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };

  const formData = new FormData();
  formData.append("image", aiData.files.image);
  formData.append("product_brand", aiData.data.product_brand);
  formData.append("product_status", aiData.data.product_status);

  const response = await api.post("/api/prediction/ai/", formData, { headers });

  return response.data;
};
