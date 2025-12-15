import { SensorApiResponse } from '@/features/sensors/types';
import { httpClient } from '@/lib/http-client';
import { HttpError } from '@/errors/HttpError';

export const sensorService = {
  getByVehicleId: async (vehicleId: string): Promise<SensorApiResponse | null> => {
    try {
      return await httpClient<SensorApiResponse>(`/vehicles/${vehicleId}/sensors`);
    } catch (error: any) {
      if (error instanceof HttpError && error.status === 404) {
        return null;
      }
      
      console.error(`Erro sensorService.getByVehicleId(${vehicleId}):`, error);
      return null;
    }
  }
};