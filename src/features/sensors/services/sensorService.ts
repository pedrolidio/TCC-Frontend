import { SensorApiResponse } from '@/features/sensors/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sensorService = {
  getByVehicleId: async (vehicleId: string): Promise<SensorApiResponse | null> => {
    try {
      const res = await fetch(`${API_URL}/vehicles/${vehicleId}/sensors`, { 
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