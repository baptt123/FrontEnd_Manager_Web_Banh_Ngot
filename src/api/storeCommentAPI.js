import axios from "axios";

const BASE_URL = "http://localhost:8080/api/comments";

export const getCommentsStore = async () => {
  const response = await axios.get(`${BASE_URL}/comments-store`);
  return response.data;
};

export const updateComment = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
