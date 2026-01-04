import { Driver, CreateDriverPayload } from '../types';
import { httpClient } from '@/lib/http-client';

export const driverService = {
  getAll: async (): Promise<Driver[]> => {
    try {
      return await httpClient<Driver[]>('/drivers');
    } catch (error) {
      console.error('Erro ao buscar condutores:', error);
      return [];
    }
  },

  create: async (payload: CreateDriverPayload): Promise<void> => {
    await httpClient('/drivers', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
};