'use server';

import { sensorDataReadingService } from '../services/sensorDataReadingService';

export async function getSensorDataAction(
  vehicleId: string, 
  configId: string, 
  sensorId: number
) {
  try {
    const data = await sensorDataReadingService.getBySensorId(vehicleId, configId, sensorId);
    return { data };
  } catch (error) {
    console.error('Erro ao buscar dados do sensor:', error);
    return { error: 'Falha ao carregar dados do sensor.' };
  }
}