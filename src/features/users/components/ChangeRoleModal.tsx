'use client';

import { useActionState, useEffect } from 'react';
import { updateUserRoleAction } from '../actions/updateUserRoleAction';
import { ROLES, ROLE_LABELS } from '@/features/auth/constants';

interface ChangeRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  username?: string;
  currentRoleId?: number;
}

const initialState = {
  error: '',
  success: false
};

export default function ChangeRoleModal({ isOpen, onClose, userId, username, currentRoleId }: ChangeRoleModalProps) {
  const updateRoleWithId = updateUserRoleAction.bind(null, userId!);
  const [state, action, isPending] = useActionState(updateRoleWithId, initialState);

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  if (!isOpen || !userId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-gray-900">Alterar Permissões de Usuário</h2>
        <p className="mt-2 text-sm text-gray-500">
          Selecione a nova função para o usuário <span className="font-semibold text-gray-700">{username}</span>.
        </p>

        <form action={action} className="mt-6 space-y-4">
          
          {state.error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">
              Novo Cargo
            </label>
            <select
              id="role_id"
              name="role_id"
              defaultValue={currentRoleId}
              className="mt-1 block w-full h-9 rounded-md border-gray-300 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ring-1 ring-inset ring-gray-300"
            >
              {Object.values(ROLES).map((roleId) => (
                <option key={roleId} value={roleId}>
                  {ROLE_LABELS[roleId]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
            >
              {isPending ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}