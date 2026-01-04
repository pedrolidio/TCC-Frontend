'use client';

import { useActionState } from 'react';
import { createConfigAction } from '../actions/createConfigAction';
import { Driver } from '@/features/drivers/types';
import { OBDCommand } from '@/features/sensors/types';
import { SENSOR_LABELS } from '@/features/sensors/constants';

interface Props {
  vehicleId: string;
  drivers: Driver[];
  availableSensors: OBDCommand[];
}

const initialState = {
  error: '',
};

export default function DrivingConfigForm({ vehicleId, drivers, availableSensors }: Props) {
  const createConfigWithId = createConfigAction.bind(null, vehicleId);
  const [state, action, isPending] = useActionState(createConfigWithId, initialState);

  return (
    <form action={action} className="space-y-8 bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      
      {state?.error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="driver_id" className="block text-sm font-medium leading-6 text-gray-900">
            Condutor
          </label>
          <div className="mt-2">
            <select
              id="driver_id"
              name="driver_id"
              required
              className="block w-full h-9 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Selecione um condutor...</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name} (CNH: {driver.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="sampling_interval" className="block text-sm font-medium leading-6 text-gray-900">
            Intervalo de Amostragem (segundos)
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="sampling_interval"
              id="sampling_interval"
              min="0.5"
              step="0.5"
              defaultValue="5"
              required
              className="block w-full h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="gps_enabled"
                name="gps_enabled"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="gps_enabled" className="font-medium text-gray-900">
                Habilitar GPS
              </label>
              <p className="text-gray-500">Coletar dados de latitude e longitude durante o percurso.</p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-6 border-t border-gray-100 pt-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900 mb-4">Sensores OBD</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availableSensors.map((sensor) => (
              <div key={sensor.id} className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id={`sensor-${sensor.id}`}
                    name="sensors"
                    value={sensor.id}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor={`sensor-${sensor.id}`} className="font-medium text-gray-900">
                    {SENSOR_LABELS[sensor.command] || sensor.command}
                  </label>
                  {sensor.unit && <span className="text-gray-500 ml-1">({sensor.unit})</span>}
                </div>
              </div>
            ))}
          </div>
          {availableSensors.length === 0 && (
            <p className="text-sm text-gray-500 italic">Este veículo não possui sensores cadastrados.</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-6 border-t border-gray-100 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Criando...' : 'Criar Configuração'}
        </button>
      </div>
    </form>
  );
}