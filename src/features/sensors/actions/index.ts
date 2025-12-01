'use server';

import { sensorDataReadingService } from '../services/sensorDataReadingService';

export async function getLatestReadings(vehicleId: string, configId: string) {
  return await sensorDataReadingService.getByConfigIdAndVehicleId(vehicleId, configId);
}