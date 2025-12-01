import { OBDCommand } from '@/features/sensors/types'; 

export interface DrivingConfiguration {
  id: number;
  driver: string;
  vehicle: string;
  start_date: string;
  end_date: string | null;
  include_gps: boolean;
  sample_interval: number;
  sensors: OBDCommand[];
}