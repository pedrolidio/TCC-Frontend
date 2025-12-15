import { cookies } from 'next/headers';
import { env } from '@/config/env';
import { Vehicle } from '@/features/vehicles/types';

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${env.api.url}/vehicles`, { 
        cache: 'no-store',
        headers: headers,
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
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${env.api.url}/vehicles/${id}`, {
        cache: 'no-store',
        headers: headers,
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