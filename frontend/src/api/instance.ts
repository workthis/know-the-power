import axios from 'axios';

// конектимось до api
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// використовуємо токен, якщо існує
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;