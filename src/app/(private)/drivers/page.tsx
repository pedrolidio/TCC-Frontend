import Link from 'next/link';
import { driverService } from '@/features/drivers/services/driverService';
import DriverListClient from '@/features/drivers/components/DriverListClient';
import LogoutButton from '@/features/auth/components/LogoutButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Condutores',
  description: 'Gestão de motoristas cadastrados',
};

export default async function DriversPage() {
  const drivers = await driverService.getAll();
  const hasDrivers = drivers && drivers.length > 0;

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Lista de Condutores
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href="/drivers/new"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Novo Condutor
          </Link>
          
          <Link
            href="/vehicles"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Lista de Veículos
          </Link>

          <LogoutButton />
        </div>
      </div>

      {hasDrivers ? (
        <DriverListClient drivers={drivers} />
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <p className="text-gray-600">
            Nenhum condutor encontrado.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Clique no botão acima para cadastrar o primeiro.
          </p>
        </div>
      )}
    </main>
  );
}