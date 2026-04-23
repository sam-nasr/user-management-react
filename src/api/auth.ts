import { apiClient } from './client';
import type { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

/**
 * Authentication API calls.
 * We strongly type the return values using the ApiResponse generic interface.
 */
export const authApi = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return data;
  },
  
  register: async (userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    return data;
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/me');
    return data;
  }
};
