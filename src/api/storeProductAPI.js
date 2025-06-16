import axios from "axios";

const BASE_URL = "http://localhost:8080/api/store/products";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProducts = async () => {
  const response = await axios.get(BASE_URL, getAuthHeader());
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(BASE_URL, productData, getAuthHeader());
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, productData, getAuthHeader());
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
};
