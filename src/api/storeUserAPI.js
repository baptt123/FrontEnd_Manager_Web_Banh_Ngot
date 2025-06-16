// storeUserAPI.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/store/users";

// Lấy JWT từ localStorage và tạo header Authorization
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Lấy danh sách user (đã đính kèm JWT)
export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/getusers`, getAuthHeader());
  return response.data;
};

// Xoá user theo ID (đã đính kèm JWT)
export const deleteUser = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
};
