import axios from "axios";

const BASE_URL = "http://localhost:8080/api/store/categories";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Lấy danh sách category
export const getCategories = async () => {
  const response = await axios.get(BASE_URL, getAuthHeader());
  return response.data;
};

// Tạo mới category
export const createCategory = async (category) => {
  const response = await axios.post(BASE_URL, category, getAuthHeader());
  return response.data;
};

// Cập nhật category theo id
export const updateCategory = async (id, category) => {
  const response = await axios.put(`${BASE_URL}/${id}`, category, getAuthHeader());
  return response.data;
};

// Xóa category (soft delete)
export const deleteCategory = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
};
