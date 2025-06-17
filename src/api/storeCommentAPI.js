import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/comments",
  withCredentials: true,
});

export const getCommentsStore = async () => {
  const response = await axiosInstance.get("/comments-store");
  return response.data;
};

export const updateComment = async (id, data) => {
  const response = await axiosInstance.put(`/${id}`, data);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
};
