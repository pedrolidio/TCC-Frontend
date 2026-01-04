import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { vehicleService } from '@/features/vehicles/services/vehicleService';
import { sensorService } from '@/features/sensors/services/sensorService';
import { configurationService } from '@/features/configurations/services/configurationService';
import { decodeJWTPayload } from '@/features/auth/utils/jwt';
import { PERMISSIONS } from '@/features/auth/constants';
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

  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  const [vehicle, sensorData, drivingConfigs] = await Promise.all([
    vehicleService.getById(id),
    sensorService.getByVehicleId(id),
    configurationService.getByVehicleId(id)
  ]);

  if (!vehicle) {
    notFound();
  }

  let canCreateConfiguration = false;

  if (token) {
    const user = decodeJWTPayload(token);

    if (user && PERMISSIONS.VEHICLE_CONFIGURATION.includes(user.role_id)) {
      canCreateConfiguration = true;
    }
  }

  const sensors = sensorData?.supported_obd_commands ?? [];

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/vehicles"
          className="rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
        >
          &larr; Voltar para a Lista
        </Link>

        {canCreateConfiguration && (
          <Link
            href={`/vehicles/${id}/configurations/new`}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Criar Nova Configuração
          </Link>
        )}
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