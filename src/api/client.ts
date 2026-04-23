import axios from 'axios';

/**
 * We create a custom Axios instance here.
 * Why? 
 * 1. It centralizes our API configuration (like base URL).
 * 2. It allows us to set up "interceptors" which run before every request or after every response.
 */
export const apiClient = axios.create({
  // Use relative path by default to route through the Vite proxy in development
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Automatically attach the token if we are logged in
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
