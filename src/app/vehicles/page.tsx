import { vehicleService } from '@/features/vehicles/services/vehicleService';
import VehicleListClient from './VehicleListClient';
import LogoutButton from '@/features/auth/components/LogoutButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Veículos',
  description: 'Listagem completa da frota monitorada',
};

export default async function VehiclesPage() {
  const vehicles = await vehicleService.getAll();
  
  const hasVehicles = vehicles && vehicles.length > 0;

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Lista de Veículos
        </h1>
        <LogoutButton />
      </div>

      {hasVehicles ? (
        <VehicleListClient vehicles={vehicles} />
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow ring-1 ring-black ring-opacity-5">
          <p className="text-gray-600">
            Nenhum veículo encontrado.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Verifique a conexão com a API de dados veículares.
          </p>
        </div>
      )}
    </main>
  );
}
