'use client';

import { useRouter } from 'next/navigation';
import { Vehicle } from '@/features/vehicles/types';
import VehicleTable from '@/features/vehicles/components/VehicleTable';

interface VehicleListClientProps {
  vehicles: Vehicle[];
}

export default function VehicleListClient({ vehicles }: VehicleListClientProps) {
  const router = useRouter();

  const handleNavigation = (id: number) => {
    router.push(`/vehicles/${id.toString()}`);
  };

  return (
    <VehicleTable 
      vehicles={vehicles} 
      onRowClick={handleNavigation} 
    />
  );
}