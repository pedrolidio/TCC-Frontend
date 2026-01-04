import Link from 'next/link';
import DriverForm from '@/features/drivers/components/DriverForm';

export const metadata = {
  title: 'Novo Condutor',
  description: 'Cadastro de um novo motorista no sistema.',
};

export default function NewDriverPage() {
  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-x-4">
          <Link
            href="/drivers"
            className="rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
          >
            &larr; Voltar para a Lista
          </Link>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          Cadastrar Condutor
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Preencha os dados abaixo para registrar um novo motorista habilitado.
        </p>
      </div>

      <div className="max-w-2xl">
        <DriverForm />
      </div>
    </main>
  );
}