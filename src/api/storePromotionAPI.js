import axios from "axios";
const BASE_URL = "http://localhost:8080";

// Get all promotion codes for store ID 1
export const getPromotions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/stores/1/promotions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new promotion code
export const createPromotion = async (promotionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/stores/1/promotions`, promotionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing promotion code
export const updatePromotion = async (promotionId, promotionData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/stores/1/promotions/${promotionId}`,
      promotionData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a promotion code
export const deletePromotion = async (promotionId) => {
  try {
    await axios.delete(`${BASE_URL}/api/stores/1/promotions/${promotionId}`);
    return true;
  } catch (error) {
    throw error;
  }
};