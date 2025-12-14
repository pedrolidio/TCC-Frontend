export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  role_id: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface AuthState {
  error?: string;
  success?: boolean;
}