'use client';

import { useState, useEffect, useMemo } from 'react';
import { DrivingConfiguration } from '@/features/configurations/types';
import { SensorDataReading } from '../types';
import { getLatestReadings } from '../actions';
import SensorRouteViewer from './SensorRouteViewer';
import SensorDataTable from './SensorDataTable';
import CollapsibleSection from '@/components/ui/CollapsibleSection';

interface LiveSensorMonitorProps {
  initialReadings: SensorDataReading[];
  config: DrivingConfiguration;
  vehicleId: string;
}

export default function LiveSensorMonitor({ 
  initialReadings, 
  config, 
  vehicleId 
}: LiveSensorMonitorProps) {
  
  const [readings, setReadings] = useState<SensorDataReading[]>(initialReadings);
  
  const isActive = config.end_date === null;

  useEffect(() => {
    if (!isActive) return;

    const intervalMs = (config.sample_interval > 1 ? config.sample_interval : 1) * 1000;

    const intervalId = setInterval(async () => {
      try {
        const newReadings = await getLatestReadings(vehicleId, String(config.id));
        setReadings(newReadings);
      } catch (error) {
        console.error("Falha ao atualizar dados dos sensores:", error);
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [isActive, config.sample_interval, config.id, vehicleId]);

  const { validGpsData, hasGpsData, showMap } = useMemo(() => {
    const validData = readings
      .filter(r => 
        r.latitude !== undefined && r.longitude !== undefined && 
        r.latitude !== null && r.longitude !== null
      )
      .map(r => ({
        latitude: Number(r.latitude),
        longitude: Number(r.longitude),
        timestamp: r.timestamp
      }));

    const hasData = validData.length > 0;
    const show = config.include_gps && hasData;

    return { validGpsData: validData, hasGpsData: hasData, showMap: show };
  }, [readings, config.include_gps]);

  return (
    <>
      {config.include_gps && (
        <CollapsibleSection
          title="Rota Realizada"
          description="Visualização do trajeto com base nos dados de GPS coletados."
          defaultOpen={true}
        >
          <div className="p-4">
            {showMap ? (
              <SensorRouteViewer gpsData={validGpsData} />
            ) : (
              <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                <p className="text-sm text-gray-500">
                  {isActive 
                    ? "Aguardando dados de GPS..." 
                    : "Nenhum dado de GPS válido registrado nesta sessão."}
                </p>
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}

      {isActive && (
        <div className="mt-8 flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Monitoramento Ativo: Atualizando a cada {config.sample_interval} segundos.
        </div>
      )}

      <CollapsibleSection
        title="Dados Coletados"
        description="Leituras registradas pelos sensores durante o percurso."
        defaultOpen={true}
      >
        <SensorDataTable config={config} data={readings} />
      </CollapsibleSection>
    </>
  );
}