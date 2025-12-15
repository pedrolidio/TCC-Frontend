import { cookies } from 'next/headers';
import { env } from '@/config/env';
import { DrivingConfiguration } from '@/features/configurations/types';

export const configurationService = {
  getByVehicleId: async (vehicleId: string): Promise<DrivingConfiguration[]> => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${env.api.url}/vehicles/${vehicleId}/driving-configurations`, {
        cache: 'no-store',
        headers: headers,
      });

      if (res.status === 404) return [];
      if (!res.ok) throw new Error('Erro ao buscar configurações');

      const data: DrivingConfiguration[] = await res.json();
      
      return data.sort((a, b) => 
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
    } catch (error) {
      console.error('Erro configurationService.getByVehicleId:', error);
      return [];
    }
  },

  getByIdAndVehicleId: async (vehicleId: string, configId: string): Promise<DrivingConfiguration | null> => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const res = await fetch(`${env.api.url}/vehicles/${vehicleId}/driving-configurations/${configId}`, {
        cache: 'no-store',
        headers: headers,
      });

      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Erro ao buscar configuração');

      return res.json();
    } catch (error) {
      console.error(`Erro configurationService.getById(${configId}):`, error);
      return null;
    }
  }
};