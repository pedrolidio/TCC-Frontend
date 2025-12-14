import { env } from '@/config/env';
import { Vehicle } from '@/features/vehicles/types';

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    try {
      const res = await fetch(`${env.api.url}/vehicles`, { 
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        throw new Error(`Erro API: ${res.status}`);
      }

      const data: Vehicle[] = await res.json();
      return data;
    } catch (error) {
      console.error('Falha ao buscar veículos:', error);
      return [];
    }
  },

  getById: async (id: string): Promise<Vehicle | null> => {
    try {
      const res = await fetch(`${env.api.url}/vehicles/${id}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`Erro ao buscar veículo: ${res.status}`);
      }

      return res.json();
    } catch (error) {
      console.error(`Erro no getById(${id}):`, error);
      return null;
    }
  }
};