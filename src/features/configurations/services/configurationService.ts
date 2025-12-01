import { DrivingConfiguration } from '@/features/configurations/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const configurationService = {
  getByVehicleId: async (vehicleId: string): Promise<DrivingConfiguration[]> => {
    try {
      const res = await fetch(`${API_URL}/vehicles/${vehicleId}/driving-configurations`, {
        cache: 'no-store',
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
      const res = await fetch(`${API_URL}/vehicles/${vehicleId}/driving-configurations/${configId}`, {
        cache: 'no-store',
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