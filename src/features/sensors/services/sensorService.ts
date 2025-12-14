import { env } from '@/config/env';
import { SensorApiResponse } from '@/features/sensors/types';

export const sensorService = {
  getByVehicleId: async (vehicleId: string): Promise<SensorApiResponse | null> => {
    try {
      const res = await fetch(`${env.api.url}/vehicles/${vehicleId}/sensors`, { 
        cache: 'no-store' 
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