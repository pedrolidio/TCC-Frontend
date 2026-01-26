interface StatCardProps {
  label: string;
  value: number | undefined | null;
  unit: string;
  color: string;
}

export default function StatCard({ label, value, unit, color }: StatCardProps) {
  const formattedValue = 
    value !== undefined && value !== null && !isNaN(value) 
      ? value.toFixed(2) 
      : '-';

  return (
    <div className={`p-3 rounded-lg border border-transparent ${color}`}>
      <p className="text-xs font-medium opacity-80">{label}</p>
      <p className="text-lg font-bold">
        {formattedValue} <span className="text-xs font-normal">{unit}</span>
      </p>
    </div>
  );
}