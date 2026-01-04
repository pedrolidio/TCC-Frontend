'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { configurationService } from '../services/configurationService';
import { CreateDrivingConfigurationPayload } from '../types';

export async function createConfigAction(vehicleId: string, prevState: any, formData: FormData) {
  try {
    const driverId = Number(formData.get('driver_id'));
    const samplingInterval = Number(formData.get('sampling_interval'));    
    const gpsEnabled = formData.get('gps_enabled') === 'on';
    const sensorIds = formData.getAll('sensors').map(id => Number(id));

    if (!driverId || !samplingInterval) {
      return { error: 'Preencha os campos obrigatórios (Condutor e Intervalo).' };
    }

    if (sensorIds.length === 0 && !gpsEnabled) {
      return { error: 'Selecione pelo menos um sensor OBD ou habilite a coleta de dados de GPS.' };
    }

    const payload: CreateDrivingConfigurationPayload = {
      driver_id: driverId,
      gps_enabled: gpsEnabled,
      sampling_interval: samplingInterval,
      sensor_ids: sensorIds
    };

    await configurationService.create(vehicleId, payload);

  } catch (error: any) {
    return { error: error.message || 'Erro ao criar configuração.' };
  }

  revalidatePath(`/vehicles/${vehicleId}`);
  redirect(`/vehicles/${vehicleId}`);
}