'use client';

import { DrivingConfiguration } from '@/features/configurations/types';
import { SensorDataReading } from '@/features/sensors/types';
import { SENSOR_LABELS } from '@/features/sensors/constants';

const formatSensorValue = (value: string | number | string[] | undefined): React.ReactNode => {
  if (value === undefined || value === null) return '-';
  if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : '-';
  return value;
};

interface SensorDataTableProps {
  config: DrivingConfiguration;
  data: SensorDataReading[];
}

export default function SensorDataTable({ config, data }: SensorDataTableProps) {
  if (!data || data.length === 0) {
    return (
      <p className="px-4 py-5 text-sm text-gray-500 sm:px-6">
        Nenhum dado coletado encontrado para esta configuração.
      </p>
    );
  }

  const showGps = config.include_gps;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Data/Hora
            </th>

            {showGps && (
              <>
                <th scope="col" className="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Latitude
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Longitude
                </th>
              </>
            )}

            {config.sensors.map((sensor) => (
              <th 
                key={sensor.command} 
                scope="col" 
                className="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                {SENSOR_LABELS[sensor.command] || sensor.command} 
                {sensor.unit ? ` (${sensor.unit})` : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((reading) => (
            <tr key={reading._id} className="hover:bg-gray-50">
              
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {new Date(reading.timestamp).toLocaleString('pt-BR')}
              </td>

              {showGps && (
                <>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {reading.latitude ?? '-'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {reading.longitude ?? '-'}
                  </td>
                </>
              )}

              {config.sensors.map((sensor) => (
                <td key={`${reading._id}-${sensor.command}`} className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  {formatSensorValue(reading[sensor.command])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}