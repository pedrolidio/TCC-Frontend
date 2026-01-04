import { Driver } from '../types';
import { httpClient } from '@/lib/http-client';

export const driverService = {
  getAll: async (): Promise<Driver[]> => {
    try {
      return await httpClient<Driver[]>('/drivers');
    } catch (error) {
      console.error('Erro ao buscar condutores:', error);
      return [];
    }
  }
};