export const SENSOR_LABELS: Record<string, string> = {
  rpm: "Rotação do Motor",
  speed_kmh: "Velocidade do Veículo",
  engine_load: "Carga do Motor Calculada",
  coolant_temp_c: "Temperatura do Líquido de Arrefecimento",
  throttle_pos_pct: "Posição do Acelerador",
  intake_temp_c: "Temperatura do Ar de Admissão",
  map_kpa: "Pressão do Coletor de Admissão",
  maf_gps: "Taxa de Fluxo de Ar (MAF)",
  timing_advance_deg: "Avanço de Ignição",
  battery_voltage: "Tensão da Bateria",
  fuel_status: "Status do Sistema de Combustível",
  dtcs: "Códigos de Falha (DTC)"
} as const;

export const NON_NUMERIC_SENSORS: readonly string[] = [
  'fuel_status', 
  'dtcs'
];

export const DECIMAL_PRECISION: Record<string, number> = {
  latitude: 6,
  longitude: 6,
  engine_load: 6,
  throttle_pos_pct: 6,
  
  rpm: 2,
  maf_gps: 2,
  
  timing_advance_deg: 1,
  battery_voltage: 1,
} as const;