import axios from 'axios';
import Config from '../config/config';

const Http = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
Http.interceptors.request.use(
  (config) => {
    // You can attach tokens here
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
Http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors like 401, 403 etc.
    if (error.response?.status === 401) {
      console.warn('Unauthorized! Redirecting to login...');
      // Redirect or logout logic
    }
    return Promise.reject(error);
  }
);

export default Http;
