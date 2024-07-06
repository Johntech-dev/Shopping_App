// src/api/timbuApi.js
import axios from 'axios';

const TIMBU_API_KEY = 'Bearer 8b1145491d57428197ef67f6c82da62c20240704212401327534'; // Replace with your API key
const API_BASE_URL = 'https://api.timbu.cloud/v1';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${TIMBU_API_KEY}`,
      },
    });
    return response.data.products;
  } catch (error) {
    throw error;
  }
};
