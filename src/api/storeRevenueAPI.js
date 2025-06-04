import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/store/revenue';

export const revenueService = {
    // Lấy dữ liệu doanh thu theo tuần
    getWeeklyRevenue: async (startDate) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/weekly`, {
                params: { startDate: startDate.toISOString() }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy dữ liệu doanh thu theo tháng
    getMonthlyRevenue: async (startDate) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/monthly`, {
                params: { startDate: startDate.toISOString() }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy dữ liệu doanh thu theo năm
    getYearlyRevenue: async (year) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/yearly`, {
                params: { year }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy lịch sử doanh thu
    getRevenueHistory: async (period, startDate, endDate) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/history`, {
                params: {
                    period,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                }
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
                endDate: endDate.toISOString()
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
};