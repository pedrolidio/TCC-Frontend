'use client';

import { useActionState } from 'react';
import { createDriverAction } from '../actions/createDriverAction';
import { DriverLicenseCategory } from '../types';

const CATEGORIES: DriverLicenseCategory[] = ['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE'];

const initialState = {
  error: '',
};

export default function DriverForm() {
  const [state, action, isPending] = useActionState(createDriverAction, initialState);

  return (
    <form action={action} className="space-y-8 bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      
      {state?.error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Nome Completo
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Ex: Fulano da Silva"
              className="block w-full h-9 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="license" className="block text-sm font-medium leading-6 text-gray-900">
            Nº da CNH
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="license"
              id="license"
              required
              placeholder="Insira os 11 dígitos"
              maxLength={11}
              pattern="\d*"
              className="block w-full h-9 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
            Categoria
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              required
              className="block w-full h-9 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Selecione...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-6 border-t border-gray-100 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Cadastrando...' : 'Cadastrar Condutor'}
        </button>
      </div>
    </form>
  );
}