import { SensorDataReading, SingleSensorReading } from '@/features/sensors/types';
import { httpClient } from '@/lib/http-client';
import { HttpError } from '@/errors/HttpError';

export const sensorDataReadingService = {
  getByConfigIdAndVehicleId: async (vehicleId: string, configId: string): Promise<SensorDataReading[]> => {
    try {
      const params = new URLSearchParams({
        driving_configuration_id: configId,
        vehicle_id: vehicleId
      });

      return await httpClient<SensorDataReading[]>(`/sensors-data?${params.toString()}`);
    } catch (error) {
      if (error instanceof HttpError && error.status === 404) {
        return [];
      }
      
      console.error('Erro sensorDataReadingService.getByConfigId:', error);
      return [];
    }
  },

  getBySensorId: async (
    vehicleId: string, 
    configId: string, 
    sensorId: number
  ): Promise<SingleSensorReading[]> => {
    try {
      const params = new URLSearchParams({
        driving_configuration_id: configId,
        vehicle_id: vehicleId
      });

      return await httpClient<SingleSensorReading[]>(`/sensors-data/${sensorId}?${params.toString()}`);
    } catch (error) {
      if (error instanceof HttpError && error.status === 404) {
        return [];
      }
      
      console.error('Erro sensorDataReadingService.getBySensorId:', error);
      return [];
    }
  }
};