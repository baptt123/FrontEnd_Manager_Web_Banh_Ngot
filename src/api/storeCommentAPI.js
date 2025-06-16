import axios from "axios";

const BASE_URL = "http://localhost:8080/api/comments";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCommentsStore = async () => {
  const response = await axios.get(`${BASE_URL}/comments-store`, getAuthHeader());
  return response.data;
};

export const updateComment = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data, getAuthHeader());
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
  return response.data;
};
