import Link from 'next/link';
import { cookies } from 'next/headers';
import { vehicleService } from '@/features/vehicles/services/vehicleService';
import { decodeJWTPayload } from '@/features/auth/utils/jwt';
import { PERMISSIONS } from '@/features/auth/constants';
import VehicleListClient from '@/features/vehicles/components/VehicleListClient';
import LogoutButton from '@/features/auth/components/LogoutButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Veículos',
  description: 'Listagem completa da frota monitorada',
};

export default async function VehiclesPage() {
  const vehicles = await vehicleService.getAll();
  const hasVehicles = vehicles && vehicles.length > 0;

  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  let canViewDrivers = false;
  let canViewUsers = false;
  
  if (token) {
    const user = decodeJWTPayload(token);

    if (user && PERMISSIONS.DRIVERS.includes(user.role_id)) {
      canViewDrivers = true;
    }

    if (user && PERMISSIONS.USERS.includes(user.role_id)) {
      canViewUsers = true;
    }
  }

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Lista de Veículos
        </h1>

        <div className="flex items-center gap-3">
          {canViewUsers && (
            <Link
              href="/users"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              Lista de Usuários
            </Link>
          )}

          {canViewDrivers && (
            <Link
              href="/drivers"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              Lista de Condutores
            </Link>
          )}

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
            Cadastre um veículo utilizando o sistema embarcado para visualizar suas informações.
          </p>
        </div>
      )}
    </main>
  );
}
