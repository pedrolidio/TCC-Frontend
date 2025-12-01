export interface OBDCommand {
  id: number;
  command: string;
  unit: string | null;
}

export interface SensorApiResponse {
  vehicle_id: string;
  supported_obd_commands: OBDCommand[];
}

export interface SensorDataReading {
  _id: string; 
  vehicle_id: number;
  timestamp: string;
  latitude?: number;
  longitude?: number;
  rpm?: number;
  speed_kmh?: number;
  engine_load?: number;
  coolant_temp_c?: number;
  throttle_pos_pct?: number;
  intake_temp_c?: number;
  map_kpa?: number;
  maf_gps?: number;
  timing_advance_deg?: number;
  battery_voltage?: number;
  fuel_status?: string[];
  dtcs?: string[];
  [key: string]: number | string | string[] | undefined;
}