import axios from "axios";

const BASE_URL = "http://localhost:8080/api/store/products";

export const getProducts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(BASE_URL, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
