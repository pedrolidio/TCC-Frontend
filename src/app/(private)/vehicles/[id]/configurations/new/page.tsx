import Link from 'next/link';
import { notFound } from 'next/navigation';
import { driverService } from '@/features/drivers/services/driverService';
import { sensorService } from '@/features/sensors/services/sensorService';
import { vehicleService } from '@/features/vehicles/services/vehicleService';
import DrivingConfigForm from '@/features/configurations/components/DrivingConfigForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewConfigurationPage({ params }: PageProps) {
  const { id } = await params;

  const [vehicle, drivers, sensorData] = await Promise.all([
    vehicleService.getById(id),
    driverService.getAll(),
    sensorService.getByVehicleId(id)
  ]);

  if (!vehicle) {
    notFound();
  }

  const supportedSensors = sensorData?.supported_obd_commands || [];

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-x-4">
          <Link
            href={`/vehicles/${id}`}
            className="rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
          >
            &larr; Voltar para Detalhes do Veículo
          </Link>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          Nova Configuração de Condução
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Defina os parâmetros de coleta de dados para o veículo <span className="font-semibold">{vehicle.manufacturer} {vehicle.model} ({vehicle.year})</span>.
        </p>
      </div>

      <DrivingConfigForm 
        vehicleId={id}
        drivers={drivers}
        availableSensors={supportedSensors}
      />
    </main>
  );
}