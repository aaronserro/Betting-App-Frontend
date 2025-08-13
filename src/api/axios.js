import axios from 'axios'

const api = axios.create({
 baseURL: import.meta.env.VITE_API_BASE ?? 'http://localhost:8080',
 //baseURL:'https://app-backend-c0t6.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const url = (config.url || '').toLowerCase();
  if (token && !url.endsWith('/auth/login')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api