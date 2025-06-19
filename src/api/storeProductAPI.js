import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/store/products",
  withCredentials: true,
});

export const getProducts = async () => {
  const response = await axiosInstance.get("/all-products");
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axiosInstance.post("/create-product", productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axiosInstance.delete(`/${id}`);
};
