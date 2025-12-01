'use client';

import { useRouter } from 'next/navigation';
import { DrivingConfiguration } from '@/features/configurations/types';
import DrivingConfigurationTable from '@/features/configurations/components/DrivingConfigurationTable';

interface Props {
  configs: DrivingConfiguration[];
  vehicleId: string;
}

export default function DrivingConfigListClient({ configs, vehicleId }: Props) {
  const router = useRouter();

  const handleConfigClick = (configId: number) => {
    router.push(`/vehicles/${vehicleId}/configurations/${configId}`);
  };

  return (
    <DrivingConfigurationTable 
      configs={configs} 
      onConfigClick={handleConfigClick} 
    />
  );
}