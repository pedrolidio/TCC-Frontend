import { OBDCommand } from '@/features/sensors/types';
import { SENSOR_LABELS } from '@/features/sensors/constants';

interface SensorTableProps {
  sensors: OBDCommand[];
  emptyMessage?: string;
}

export default function SensorTable({ 
  sensors, 
  emptyMessage = "Nenhum sensor disponível." 
}: SensorTableProps) {
  
  const hasSensors = sensors && sensors.length > 0;

  if (!hasSensors) {
    return (
      <p className="px-4 py-5 text-sm text-gray-500 sm:px-6">
        {emptyMessage}
      </p>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
            Comando (Sensor)
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Unidade
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {sensors.map((sensor) => (
          <tr key={sensor.command}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {SENSOR_LABELS[sensor.command] || sensor.command}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
              {sensor.unit ?? 'N/A'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}