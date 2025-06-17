// src/api/orderAPI.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/orders',
  withCredentials: true,
});

export const fetchAllOrdersByStore = async () => {
  const response = await axiosInstance.get('/getallordersbystore');
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await axiosInstance.get(`/${id}`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post('/create-order-store', orderData);
  return response.data;
};

export const updateOrder = async (id, orderData) => {
  const response = await axiosInstance.put(`/${id}`, orderData);
  return response.data;
};

export const deleteOrder = async (id) => {
  await axiosInstance.delete(`/${id}`);
};
