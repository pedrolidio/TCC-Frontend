import Link from 'next/link';
import { notFound } from 'next/navigation';
import { configurationService } from '@/features/configurations/services/configurationService';
import { sensorDataReadingService } from '@/features/sensors/services/sensorDataReadingService';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import DrivingConfigSensorsClient from '@/features/configurations/components/DrivingConfigSensorsClient';
import LiveSensorMonitor from '@/features/sensors/components/LiveSensorMonitor';
import DrivingConfigurationDetails from '@/features/configurations/components/DrivingConfigurationDetails';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Configuração de Condução',
  description: 'Exibição dos dados da configuração de condução e listagem dos dados coletados pelos sensores',
};

interface ConfigDetailsProps {
  params: Promise<{
    id: string;
    configId: string;
  }>;
}

export default async function ConfigurationDetailsPage({ params }: ConfigDetailsProps) {
  const { id, configId } = await params;

  const [config, sensorReadings] = await Promise.all([
    configurationService.getByIdAndVehicleId(id, configId),
    sensorDataReadingService.getByConfigIdAndVehicleId(id, configId)
  ]);

  if (!config) {
    notFound();
  }

  const sensors = config.sensors || [];
  
  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="mb-6 flex items-center gap-x-4">
        <Link
          href={`/vehicles/${id}`}
          className="rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
        >
          &larr; Voltar para Detalhes do Veículo
        </Link>
      </div>

      <CollapsibleSection
        title={`Detalhes da Configuração`}
        description="Informações detalhadas sobre a configuração de condução."
        defaultOpen={true}
      >
        <DrivingConfigurationDetails config={config} />
      </CollapsibleSection>

      <CollapsibleSection
        title="Sensores Utilizados (Comandos OBD)"
        description="Sensores habilitados nesta configuração."
        defaultOpen={false}
      >
        <DrivingConfigSensorsClient 
          vehicleId={id}
          configId={configId}
          sensors={sensors}
        />
      </CollapsibleSection>

      <LiveSensorMonitor 
        initialReadings={sensorReadings} 
        config={config} 
        vehicleId={id} 
      />
    </main>
  );
}