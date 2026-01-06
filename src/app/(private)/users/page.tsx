import Link from 'next/link';
import { cookies } from 'next/headers';
import { userService } from '@/features/users/services/userService';
import { decodeJWTPayload } from '@/features/auth/utils/jwt';
import { PERMISSIONS } from '@/features/auth/constants';
import UserListClient from '@/features/users/components/UserListClient';
import LogoutButton from '@/features/auth/components/LogoutButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Gerenciamento de Usuários',
  description: 'Controle de acesso e permissões',
};

export default async function UsersPage() {
  const users = await userService.getAll();
  const hasUsers = users && users.length > 0;

  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  let canViewDrivers = false;

  if (token) {
    const user = decodeJWTPayload(token);

    if (user && PERMISSIONS.DRIVERS.includes(user.role_id)) {
      canViewDrivers = true;
    }
  }

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Usuários do Sistema
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {canViewDrivers && (
            <Link
              href="/drivers"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              Lista de Condutores
            </Link>
          )}

          <Link
            href="/vehicles"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Lista de Veículos
          </Link>
          
          <LogoutButton />
        </div>
      </div>

      {hasUsers ? (
        <UserListClient users={users} />
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <p className="text-gray-600">
            Nenhum usuário encontrado.
          </p>
        </div>
      )}
    </main>
  );
}