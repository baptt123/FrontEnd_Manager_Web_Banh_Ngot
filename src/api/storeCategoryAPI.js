import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/store/categories",
  withCredentials: true,
});

// Lấy danh sách category
export const getCategories = async () => {
  const response = await axiosInstance.get("/");
  return response.data;
};

// Tạo mới category
export const createCategory = async (category) => {
  const response = await axiosInstance.post("/", category);
  return response.data;
};

// Cập nhật category theo id
export const updateCategory = async (id, category) => {
  const response = await axiosInstance.put(`/${id}`, category);
  return response.data;
};

// Xóa category (soft delete)
export const deleteCategory = async (id) => {
  await axiosInstance.delete(`/${id}`);
};
