'use client';

import { Driver } from '@/features/drivers/types';
import DriverTable from '@/features/drivers/components/DriverTable';

interface DriverListClientProps {
  drivers: Driver[];
}

export default function DriverListClient({ drivers }: DriverListClientProps) {
  return (
    <DriverTable 
      drivers={drivers} 
    />
  );
}