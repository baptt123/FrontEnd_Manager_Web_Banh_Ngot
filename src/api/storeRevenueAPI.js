// revenueService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/store/revenue';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const revenueService = {
  getWeeklyRevenue: async (startDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/weekly`, {
        params: { startDate: startDate.toISOString() },
        ...getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMonthlyRevenue: async (startDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/monthly`, {
        params: { startDate: startDate.toISOString() },
        ...getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getYearlyRevenue: async (year) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/yearly`, {
        params: { year },
        ...getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRevenueHistory: async (period, startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`, {
        params: {
          period,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        ...getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRevenueByProducts: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/by-products`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        ...getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
