// src/api/orderAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/orders'; // sửa lại nếu bạn có prefix khác

// Lấy tất cả đơn hàng của cửa hàng (storeId mặc định là 1 ở backend)
export const fetchAllOrdersByStore = async () => {
  const response = await axios.get(`${BASE_URL}/getallordersbystore`);
  return response.data;
};

// Lấy chi tiết một đơn hàng theo id
export const fetchOrderById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Tạo đơn hàng mới (dành cho phía quản lý cửa hàng)
export const createOrder = async (orderData) => {
  const response = await axios.post(`${BASE_URL}/create-order-store`, orderData);
  return response.data;
};

// Cập nhật đơn hàng theo id
export const updateOrder = async (id, orderData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, orderData);
  return response.data;
};

// Xóa đơn hàng theo id
export const deleteOrder = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
