'use client';

import { useActionState } from 'react';
import { loginAction } from '../actions/loginAction';

const initialState = {
  error: '',
};

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Acesse sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={action} className="space-y-6">
          {state?.error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-500 border border-red-200">
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Usuário
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}