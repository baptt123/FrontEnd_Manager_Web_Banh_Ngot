import axios from "axios";

const API_URL = "http://localhost:8080/api/store/promotions";

export const fetchAllPromotions = async () => {
  const response = await axios.get(`${API_URL}/get-all-promotions`);
  return response.data;
};

export const fetchPromotionById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/get-promotion`);
  return response.data;
};

export const createPromotion = async (promotion) => {
  const response = await axios.post(`${API_URL}/create-promotion`, promotion);
  return response.data;
};

export const updatePromotion = async (id, promotion) => {
  const response = await axios.put(`${API_URL}/${id}/update-promotion`, promotion);
  return response.data;
};

export const deletePromotion = async (id) => {
  await axios.delete(`${API_URL}/${id}/delete-promotion`);
};
