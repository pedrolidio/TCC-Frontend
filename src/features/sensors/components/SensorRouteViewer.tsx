'use client';

import dynamic from 'next/dynamic';
import { useGpsFilter, GpsPoint } from '@/features/sensors/hooks/useGpsFilter';

const SensorRouteMap = dynamic(() => import('./SensorRouteMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <span className="text-gray-400">Carregando mapa...</span>
    </div>
  ),
});

interface SensorRouteViewerProps {
  gpsData: GpsPoint[];
}

export default function SensorRouteViewer({ gpsData }: SensorRouteViewerProps) {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredPositions,
    initialStart,
    initialEnd,
    totalPoints,
    filteredCount
  } = useGpsFilter(gpsData);

  if (totalPoints === 0) {
    return <p className="text-gray-500">Sem dados de GPS para exibir.</p>;
  }

  return (
    <div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
            Início do Trecho
          </label>
          <input
            type="datetime-local"
            id="start-date"
            step="1"
            value={startDate}
            min={initialStart}
            max={endDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
            Fim do Trecho
          </label>
          <input
            type="datetime-local"
            id="end-date"
            step="1"
            value={endDate}
            min={startDate}
            max={initialEnd}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-2 text-right">
        Exibindo <strong>{filteredCount}</strong> de {totalPoints} pontos
      </div>

      <SensorRouteMap positions={filteredPositions} />
    </div>
  );
}