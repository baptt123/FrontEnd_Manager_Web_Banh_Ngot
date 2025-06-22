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


export const updateOrder = async (id, orderData) => {
  const response = await axiosInstance.put(`/${id}/update-status`, orderData,);
  return response.data;
};


