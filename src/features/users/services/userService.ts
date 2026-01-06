import { User, CreateUserPayload } from '../types';
import { httpClient } from '@/lib/http-client';

export const userService = {
  getAll: async (): Promise<User[]> => {
    try {
      return await httpClient<User[]>('/users');
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  },

  create: async (payload: CreateUserPayload): Promise<void> => {
    await httpClient('/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
};