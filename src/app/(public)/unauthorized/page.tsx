import LogoutButton from '@/features/auth/components/LogoutButton';
import Link from 'next/link';

export const metadata = {
  title: 'Acesso Negado',
  description: 'Você não tem permissão para acessar esta página.',
};

export default function UnauthorizedPage() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">403</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Acesso Negado
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          A sua conta de usuário não possui as permissões necessárias para visualizar o conteúdo desta página.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/vehicles"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Voltar para a lista de veículos
          </Link>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}