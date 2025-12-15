import Link from 'next/link';
import { notFound } from 'next/navigation';
import { vehicleService } from '@/features/vehicles/services/vehicleService';
import { sensorService } from '@/features/sensors/services/sensorService';
import { configurationService } from '@/features/configurations/services/configurationService';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import SensorTable from '@/features/sensors/components/SensorTable';
import DrivingConfigListClient from './DrivingConfigListClient';
import VehicleDetails from '@/features/vehicles/components/VehicleDetails';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Detalhes do Veículo',
  description: 'Exibição dos dados veículares e listagem do histórico de configurações de condução',
};

interface VehicleDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VehicleDetailsPage({ params }: VehicleDetailsProps) {
  const { id } = await params;
  
  const [vehicle, sensorData, drivingConfigs] = await Promise.all([
    vehicleService.getById(id),
    sensorService.getByVehicleId(id),
    configurationService.getByVehicleId(id)
  ]);

  if (!vehicle) {
    notFound();
  }

  const sensors = sensorData?.supported_obd_commands ?? [];

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="mb-6">
        <Link
          href="/vehicles"
          className="rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
        >
          &larr; Voltar para a Lista
        </Link>
      </div>

      <CollapsibleSection
        title={`Detalhes do Veículo`}
        description="Informações detalhadas sobre o veículo."
        defaultOpen={false}
      >
        <VehicleDetails vehicle={vehicle} />
      </CollapsibleSection>

      <CollapsibleSection
        title="Sensores Suportados (Comandos OBD)"
        description="Lista de comandos OBD que o veículo suporta."
        defaultOpen={false}
      >
        <SensorTable 
          sensors={sensors} 
          emptyMessage="Este veículo não possui sensores cadastrados."
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="Histórico de Configurações de Condução"
        description="Lista de configurações de sensores usadas por este veículo."
        defaultOpen={true}
      >
        <DrivingConfigListClient 
          configs={drivingConfigs} 
          vehicleId={id} 
        />
      </CollapsibleSection>
    </main>
  );
}