import axios, { type AxiosInstance } from "axios";

import { getAuthToken } from "./auth.firebase";

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 60_000, // 10 minutes
});

// Add request interceptor to include auth token if present
axiosClient.interceptors.request.use(
  async(config) => {
    try {
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    } catch (error) {
      console.error("Error fetching token for API:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for global error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export { axiosClient as api };
