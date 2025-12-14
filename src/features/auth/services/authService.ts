import { env } from '@/config/env';
import { AuthResponse, LoginCredentials } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await fetch(`${env.api.url}/sessions/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Falha na autenticação');
    }

    return data;
  },
};