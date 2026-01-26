'use client';

import { useState } from 'react';
import { OBDCommand } from '@/features/sensors/types';
import SensorTable from '@/features/sensors/components/SensorTable';
import AnalysisModal from '@/features/sensors/components/AnalysisModal';

interface Props {
  vehicleId: string;
  configId: string;
  sensors: OBDCommand[];
}

export default function DrivingConfigSensorsClient({ vehicleId, configId, sensors }: Props) {
  const [selectedSensor, setSelectedSensor] = useState<OBDCommand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnalyze = (sensor: OBDCommand) => {
    setSelectedSensor(sensor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSensor(null);
  };

  return (
    <>
      <SensorTable 
        sensors={sensors} 
        emptyMessage="Esta configuração não coleta dados de sensores OBD."
        onAnalyze={handleAnalyze} 
      />

      {isModalOpen && selectedSensor && (
        <AnalysisModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          vehicleId={vehicleId}
          configId={configId}
          sensor={selectedSensor}
        />
      )}
    </>
  );
}