interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  isGray?: boolean;
}

export default function DetailRow({ label, value, isGray = false }: DetailRowProps) {
  return (
    <div className={`${isGray ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
}