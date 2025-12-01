import Link from 'next/link';

// Homepage provisória
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          TCC - Frontend
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/vehicles"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ver Lista de Veículos
          </Link>
        </div>
      </div>
    </main>
  );
}