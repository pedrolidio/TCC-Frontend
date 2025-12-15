import { cookies } from 'next/headers';
import { env } from '@/config/env';
import { SensorDataReading } from '@/features/sensors/types';

export const sensorDataReadingService = {
  getByConfigIdAndVehicleId: async (vehicleId: string, configId: string): Promise<SensorDataReading[]> => {
    try {
      const params = new URLSearchParams({
        driving_configuration_id: configId,
        vehicle_id: vehicleId
      });

      const cookieStore = await cookies();
      const token = cookieStore.get('session_token')?.value;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${env.api.url}/sensors-data?${params.toString()}`, {
        cache: 'no-store',
        headers: headers,
      });

      if (!res.ok) throw new Error('Erro ao buscar leituras do sensor');

      return res.json();
    } catch (error) {
      console.error('Erro sensorDataReadingService.getByConfigId:', error);
      return [];
    }
  }
};