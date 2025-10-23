import axios from 'axios';

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = async (signal) => {
  try {
    const response = await axios.get(`${BASE_URL}/latest-news`, {
      params: {
        apiKey: API_KEY,
      },
      signal,
    });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Запрос отменён');
    } else {
      console.error('Ошибка запроса новостей:', error);
      throw error;
    }
  }
};
