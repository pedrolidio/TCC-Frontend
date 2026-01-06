'use client';

import { User } from '../types';
import { ROLES, ROLE_LABELS } from '@/features/auth/constants';

interface UserTableProps {
  users: User[];
  onChangePassword?: (userId: number) => void;
  onChangeRole?: (userId: number) => void;
}

const ROLE_STYLES: Record<number, string> = {
  [ROLES.ADMIN]: 'bg-purple-50 text-purple-700 ring-purple-700/10',
  [ROLES.MANAGER]: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
  [ROLES.MONITOR]: 'bg-gray-50 text-gray-600 ring-gray-500/10',
};

export default function UserTable({ users, onChangePassword, onChangeRole }: UserTableProps) {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Usuário
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Cargo
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:pr-6">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${ROLE_STYLES[user.role_id] || ROLE_STYLES[3]}`}>
                        {ROLE_LABELS[user.role_id] || 'Desconhecido'}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onChangeRole?.(user.id)}
                          className="text-indigo-600 hover:text-indigo-900 border border-indigo-200 rounded px-2 py-1 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                        >
                          Alterar Cargo
                        </button>
                        <button
                          onClick={() => onChangePassword?.(user.id)}
                          className="text-amber-600 hover:text-amber-900 border border-amber-200 rounded px-2 py-1 bg-amber-50 hover:bg-amber-100 transition-colors"
                        >
                          Alterar Senha
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}