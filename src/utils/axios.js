// src/utils/axios.js
import axios from 'axios';

// Kiem tra
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
