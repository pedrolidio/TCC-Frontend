import Link from 'next/link';
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

        <div className="flex items-center gap-3">
          <Link
            href="/drivers"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Lista de Condutores
          </Link>

          <LogoutButton />
        </div>
      </div>

      {hasVehicles ? (
        <VehicleListClient vehicles={vehicles} />
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
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
