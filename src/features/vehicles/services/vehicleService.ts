import { Vehicle } from '@/features/vehicles/types';
import { httpClient } from '@/lib/http-client';
import { HttpError } from '@/errors/HttpError';

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    try {
      return await httpClient<Vehicle[]>('/vehicles');
    } catch (error) {
      console.error('Erro vehicleService.getAll:', error);
      return [];
    }
  },

  getById: async (id: string): Promise<Vehicle | null> => {
    try {
      return await httpClient<Vehicle>(`/vehicles/${id}`);
    } catch (error: any) {
      if (error instanceof HttpError && error.status === 404) {
        return null;
      }
      
      console.error(`Erro vehicleService.getById(${id}):`, error);
      return null;
    }
  }
};