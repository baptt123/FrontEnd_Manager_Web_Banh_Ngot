import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/store/promotions",
  withCredentials: true,
});

export const fetchAllPromotions = async () => {
  const response = await axiosInstance.get("/get-all-promotions");
  return response.data;
};

export const fetchPromotionById = async (id) => {
  const response = await axiosInstance.get(`/${id}/get-promotion`);
  return response.data;
};

export const createPromotion = async (promotion) => {
  const response = await axiosInstance.post("/create-promotion", promotion);
  return response.data;
};

export const updatePromotion = async (id, promotion) => {
  const response = await axiosInstance.put(`/${id}/update-promotion`, promotion);
  return response.data;
};

export const deletePromotion = async (id) => {
  await axiosInstance.delete(`/${id}/delete-promotion`);
};
