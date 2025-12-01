import { SensorDataReading } from '@/features/sensors/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sensorDataReadingService = {
  getByConfigIdAndVehicleId: async (vehicleId: string, configId: string): Promise<SensorDataReading[]> => {
    try {
      const params = new URLSearchParams({
        driving_configuration_id: configId,
        vehicle_id: vehicleId
      });

      const res = await fetch(`${API_URL}/sensors-data?${params.toString()}`, {
        cache: 'no-store',
      });

      if (!res.ok) throw new Error('Erro ao buscar leituras do sensor');

      return res.json();
    } catch (error) {
      console.error('Erro sensorDataReadingService.getByConfigId:', error);
      return [];
    }
  }
};