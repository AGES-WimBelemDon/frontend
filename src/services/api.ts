import axios, { type AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
});

// Add request interceptor to include auth token if present
axiosClient.interceptors.request.use(
  (config) => {
    const api_token = localStorage.getItem('api_token');
    if (api_token) {
      config.headers.Authorization = `Bearer ${api_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for global error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export { axiosClient as api };
