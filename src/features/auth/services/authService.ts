import { AuthResponse, LoginCredentials } from '../types';
import { httpClient } from '@/lib/http-client';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return await httpClient<AuthResponse>('/sessions/user', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};