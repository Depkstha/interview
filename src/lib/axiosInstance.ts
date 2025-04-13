// lib/axios.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
      Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    error.message = message;
    
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    
    return Promise.reject(error);
  }
);