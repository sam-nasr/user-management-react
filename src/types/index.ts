export interface User {
  id: string; // Using string as ID is common for UUIDs, but this can hold numbers too if converted
  name: string;
  email: string;
}

// Generic API response matching the backend format: { data: ..., error: null }
export interface ApiResponse<T> {
  data: T;
  error: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Request payload types
export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password?: string;
  age: number;
}
