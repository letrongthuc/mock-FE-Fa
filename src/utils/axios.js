// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mock-be-fa.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
