// storeUserAPI.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/store/users";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Lấy danh sách user
export const getUsers = async () => {
  const response = await axiosInstance.get("/getusers");
  return response.data;
};

// Xoá user theo ID
export const deleteUser = async (id) => {
  await axiosInstance.delete(`/${id}`);
};
