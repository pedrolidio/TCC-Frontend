'use client';

import { useActionState } from 'react';
import { createUserAction } from '../actions/createUserAction';

const initialState = {
  error: '',
};

export default function UserForm() {
  const [state, action, isPending] = useActionState(createUserAction, initialState);

  return (
    <form action={action} className="space-y-8 bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      {state?.error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Nome de Usuário (Username)
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="username"
              id="username"
              required
              minLength={4}
              placeholder="Ex: novo.usuario"
              className="block w-full h-9 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Senha
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength={8}
              placeholder="******"
              className="block w-full h-9 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-6 border-t border-gray-100 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Cadastrando...' : 'Cadastrar Usuário'}
        </button>
      </div>
    </form>
  );
}