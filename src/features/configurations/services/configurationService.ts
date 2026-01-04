import { DrivingConfiguration, CreateDrivingConfigurationPayload } from '@/features/configurations/types';
import { httpClient } from '@/lib/http-client';
import { HttpError } from '@/errors/HttpError';

export const configurationService = {
  getByVehicleId: async (vehicleId: string): Promise<DrivingConfiguration[]> => {
    try {
      const data = await httpClient<DrivingConfiguration[]>(`/vehicles/${vehicleId}/driving-configurations`);

      return data.sort((a, b) => 
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
    } catch (error: any) {
      if (error instanceof HttpError && error.status === 404) {
        return [];
      }
      
      console.error('Erro configurationService.getByVehicleId:', error);
      return [];
    }
  },

  getByIdAndVehicleId: async (vehicleId: string, configId: string): Promise<DrivingConfiguration | null> => {
    try {
      return await httpClient<DrivingConfiguration>(`/vehicles/${vehicleId}/driving-configurations/${configId}`);
    } catch (error: any) {
      if (error instanceof HttpError && error.status === 404) {
        return null;
      }
      
      console.error(`Erro configurationService.getById(${configId}):`, error);
      return null;
    }
  },

  create: async (vehicleId: string, payload: CreateDrivingConfigurationPayload): Promise<void> => {
    await httpClient(`/vehicles/${vehicleId}/driving-configurations`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
};