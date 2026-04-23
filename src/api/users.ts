import { apiClient } from './client';
import type { ApiResponse, User } from '../types';

/**
 * Users API calls for CRUD operations.
 */
export const usersApi = {
  // Fetch paginated users
  getUsers: async (page: number = 1, limit: number = 10): Promise<ApiResponse<User[]>> => {
    const { data } = await apiClient.get<ApiResponse<User[]>>(`/users?page=${page}&limit=${limit}`);
    return data;
  },

  // Fetch a single user by ID
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const { data } = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return data;
  },

  // Update a user by ID
  updateUser: async (id: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
    const { data } = await apiClient.put<ApiResponse<User>>(`/users/${id}`, userData);
    return data;
  },

  // Create a new user
  createUser: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    const { data } = await apiClient.post<ApiResponse<User>>(`/users`, userData);
    return data;
  },

  // Delete a user by ID
  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/users/${id}`);
    return data;
  }
};
