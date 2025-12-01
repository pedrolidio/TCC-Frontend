import { Vehicle } from '@/features/vehicles/types';
import DetailRow from '@/components/ui/DetailRow';

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <dl className="divide-y divide-gray-200">
      <DetailRow 
        label="Fabricante" 
        value={vehicle.manufacturer} 
        isGray={true} 
      />
      <DetailRow 
        label="Modelo" 
        value={vehicle.model} 
        isGray={false} 
      />
      <DetailRow 
        label="Ano" 
        value={vehicle.year} 
        isGray={true} 
      />
      <DetailRow 
        label="Placa" 
        value={vehicle.license_plate} 
        isGray={false} 
      />
    </dl>
  );
}