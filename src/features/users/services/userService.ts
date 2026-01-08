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
  },

  updateRole: async (userId: number, roleId: number): Promise<void> => {
    await httpClient(`/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role_id: roleId }),
    });
  },

  updatePassword: async (userId: number, password: string): Promise<void> => {
    await httpClient(`/users/${userId}/password`, {
      method: 'PATCH',
      body: JSON.stringify({ password }),
    });
  }
};