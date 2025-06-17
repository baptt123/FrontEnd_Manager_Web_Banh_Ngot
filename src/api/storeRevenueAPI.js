// revenueService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/store/revenue';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const revenueService = {
  getWeeklyRevenue: async (startDate) => {
    const response = await axiosInstance.get('/weekly', {
      params: { startDate: startDate.toISOString() },
    });
    return response.data;
  },

  getMonthlyRevenue: async (startDate) => {
    const response = await axiosInstance.get('/monthly', {
      params: { startDate: startDate.toISOString() },
    });
    return response.data;
  },

  getYearlyRevenue: async (year) => {
    const response = await axiosInstance.get('/yearly', {
      params: { year },
    });
    return response.data;
  },

  getRevenueHistory: async (period, startDate, endDate) => {
    const response = await axiosInstance.get('/history', {
      params: {
        period,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
    return response.data;
  },

  getRevenueByProducts: async (startDate, endDate) => {
    const response = await axiosInstance.get('/by-products', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
    return response.data;
  },
};
