'use client';

import { useActionState, useEffect } from 'react';
import { updateUserPasswordAction } from '../actions/updateUserPasswordAction';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  username?: string;
}

const initialState = {
  error: '',
  success: false
};

export default function ChangePasswordModal({ isOpen, onClose, userId, username }: ChangePasswordModalProps) {
  const updatePasswordWithId = updateUserPasswordAction.bind(null, userId!);
  const [state, action, isPending] = useActionState(updatePasswordWithId, initialState);

  useEffect(() => {
    if (state.success) {
      onClose();
      alert('Senha alterada com sucesso!'); 
    }
  }, [state.success, onClose]);

  if (!isOpen || !userId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-gray-900">Alterar Senha</h2>
        <p className="mt-2 text-sm text-gray-500">
          Defina uma nova senha para o usuário <span className="font-semibold text-gray-700">{username}</span>.
        </p>

        <form action={action} className="mt-6 space-y-4">
          
          {state.error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Nova Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength={8}
              placeholder="******"
              className="mt-1 block w-full h-9 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="mt-1 text-xs text-gray-500">Mínimo de 8 caracteres.</p>
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