// src/api/orderAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/orders';

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchAllOrdersByStore = async () => {
  const response = await axios.get(`${BASE_URL}/getallordersbystore`, getAuthHeader());
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeader());
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post(`${BASE_URL}/create-order-store`, orderData, getAuthHeader());
  return response.data;
};

export const updateOrder = async (id, orderData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, orderData, getAuthHeader());
  return response.data;
};

export const deleteOrder = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
};
