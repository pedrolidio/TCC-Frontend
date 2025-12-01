'use client';

import { DrivingConfiguration } from '@/features/configurations/types';

interface DrivingConfigurationTableProps {
  configs: DrivingConfiguration[];
  onConfigClick: (configId: number) => void;
}

export default function DrivingConfigurationTable({ configs, onConfigClick }: DrivingConfigurationTableProps) {
  const hasConfigs = configs && configs.length > 0;

  if (!hasConfigs) {
    return (
      <p className="px-4 py-5 text-sm text-gray-500 sm:px-6">
        Nenhuma configuração de condução encontrada para este veículo.
      </p>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
            Condutor
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Data de Início
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Data de Fim
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {configs.map((config) => (
          <tr 
            key={config.id}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => onConfigClick(config.id)}
          >
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {config.driver}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
              {new Date(config.start_date).toLocaleString('pt-BR')}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
              {config.end_date ? (
                new Date(config.end_date).toLocaleString('pt-BR')
              ) : (
                <span className="font-medium text-green-600">
                  Em andamento
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}