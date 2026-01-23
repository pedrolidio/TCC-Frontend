import { DrivingConfiguration } from '@/features/configurations/types';
import DetailRow from '@/components/ui/DetailRow';

interface DrivingConfigurationDetailsProps {
  config: DrivingConfiguration;
}

export default function DrivingConfigurationDetails({ config }: DrivingConfigurationDetailsProps) {
  return (
    <dl className="divide-y divide-gray-200">
      <DetailRow 
        label="Veículo" 
        value={config.vehicle} 
        isGray={true} 
      />
      <DetailRow 
        label="Condutor" 
        value={config.driver} 
        isGray={false} 
      />
      <DetailRow 
        label="Início" 
        value={new Date(config.start_date).toLocaleString('pt-BR')} 
        isGray={true} 
      />
      <DetailRow 
        label="Fim" 
        value={
          config.end_date ? 
            new Date(config.end_date).toLocaleString('pt-BR') 
            : 
            <span className="font-medium text-green-600">
              Em andamento
            </span>
        } 
        isGray={false} 
      />
      <DetailRow 
        label="GPS" 
        value={config.include_gps ? 'Habilitado' : 'Desabilitado'} 
        isGray={true} 
      />
      <DetailRow 
        label="Intervalo mínimo entre amostras" 
        value={`${config.sample_interval} s`} 
        isGray={false} 
      />
    </dl>
  );
}