import { cookies } from 'next/headers';
import { env } from '@/config/env';
import { SensorApiResponse } from '@/features/sensors/types';

export const sensorService = {
  getByVehicleId: async (vehicleId: string): Promise<SensorApiResponse | null> => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${env.api.url}/vehicles/${vehicleId}/sensors`, { 
        cache: 'no-store',
        headers: headers,
      });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Erro ao buscar sensores');
      
      return res.json();
    } catch (error) {
      console.error(`Erro sensorService.getByVehicleId(${vehicleId}):`, error);
      return null;
    }
  }
};