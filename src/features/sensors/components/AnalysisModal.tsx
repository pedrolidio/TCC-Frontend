'use client';

import { useState, useEffect, useMemo } from 'react';
import { SingleSensorReading, OBDCommand } from '@/features/sensors/types';
import { getSensorDataAction } from '../actions/getSensorDataAction';
import { calculateStatistics } from '../utils/statistics';
import { SENSOR_LABELS } from '@/features/sensors/constants';
import TelemetryChart from './TelemetryChart';
import StatCard from './StatCard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: string;
  configId: string;
  sensor: OBDCommand;
}

export default function AnalysisModal({ 
  isOpen, 
  onClose, 
  vehicleId, 
  configId, 
  sensor
}: Props) {
  const [loading, setLoading] = useState(false);
  const [readings, setReadings] = useState<SingleSensorReading[]>([]);

  const sensorDisplayName = SENSOR_LABELS[sensor.command] || sensor.command;

  useEffect(() => {
    if (isOpen && configId && sensor.id) {
      setLoading(true);
      setReadings([]);

      getSensorDataAction(vehicleId, configId, sensor.id)
        .then((res) => {
          if (res.data) {
            setReadings(res.data);
          } else {
            console.error(res.error);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, configId, vehicleId, sensor.id]);

  const { chartData, stats } = useMemo(() => {
    if (readings.length === 0) {
      return { chartData: [], stats: null };
    }

    const sortedData = [...readings].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const dataForChart = sortedData.map(r => ({
      time: r.timestamp,
      value: Number(r.value)
    }));

    const valuesOnly = sortedData.map(r => Number(r.value));

    return {
      chartData: dataForChart,
      stats: calculateStatistics(valuesOnly)
    };
  }, [readings]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Análise de {sensorDisplayName}
            </h2>
            <p className="text-sm text-gray-500">
              Unidade: {sensor.unit || 'N/A'}
            </p>
          </div>
          <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
              <span className="text-indigo-600 font-medium text-sm">Carregando dados...</span>
            </div>
          ) : readings.length === 0 ? (
             <div className="flex flex-col justify-center items-center h-64 bg-gray-50 rounded-xl border border-dashed border-gray-200">
               <p className="text-gray-500">Nenhum dado encontrado para este sensor.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Evolução Temporal</h3>
                <TelemetryChart data={chartData} unit={sensor.unit || ''} sensor={sensorDisplayName} />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Estatísticas</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                  <StatCard 
                    label="Média" 
                    value={stats?.mean} 
                    unit={sensor.unit || ''} 
                    color="bg-blue-50 text-blue-700" 
                  />
                  <StatCard 
                    label="Mediana" 
                    value={stats?.median} 
                    unit={sensor.unit || ''} 
                    color="bg-indigo-50 text-indigo-700" 
                  />
                  <StatCard 
                    label="Máximo" 
                    value={stats?.max} 
                    unit={sensor.unit || ''} 
                    color="bg-green-50 text-green-700" 
                  />
                  <StatCard 
                    label="Mínimo" 
                    value={stats?.min} 
                    unit={sensor.unit || ''} 
                    color="bg-red-50 text-red-700" 
                  />
                  <StatCard 
                    label="Desvio Padrão" 
                    value={stats?.stdDev} 
                    unit={sensor.unit || ''} 
                    color="bg-gray-50 text-gray-700" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}