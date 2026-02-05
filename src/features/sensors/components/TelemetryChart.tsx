'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  time: string;
  value: number;
}

interface TelemetryChartProps {
  data: ChartData[];
  unit: string;
  sensor: string;
  color?: string;
}

export default function TelemetryChart({ data, unit, sensor, color = '#4f46e5' }: TelemetryChartProps) {
  const formatTime = (isoString: any) => {
    if (typeof isoString !== 'string') {
      return isoString;
    }

    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Sao_Paulo',
      });
    } catch (error) {
      return isoString;
    }
  };

  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 5, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            tickFormatter={formatTime}
            minTickGap={30}
            label={{
              value: 'Tempo (Horário da Coleta)',
              position: 'insideBottom',
              offset: -15,
              style: {
                textAnchor: 'middle',
                fill: '#6b7280',
                fontSize: 12,
                fontWeight: 500
              }
            }}
          />

          <YAxis 
            tick={{ fontSize: 12 }} 
            label={{ 
              value: `${sensor} (${unit})`, 
              angle: -90, 
              position: 'insideLeft',
              style: { 
                textAnchor: 'middle', 
                fill: '#6b7280',
                fontSize: 12,
                fontWeight: 500
              }
            }}
          />

          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelFormatter={formatTime}
            formatter={(value: any) => [
              typeof value === 'number' ? `${value.toFixed(2)} ${unit}` : value, 
              'Valor'
            ]}
          />
          
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}