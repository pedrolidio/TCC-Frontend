export const SENSOR_LABELS: Record<string, string> = {
  rpm: "RPM do motor",
  speed_kmh: "Velocidade do veículo",
  engine_load: "Carga do motor calculada",
  coolant_temp_c: "Temp. líquido arrefecimento",
  throttle_pos_pct: "Posição do acelerador",
  intake_temp_c: "Temp. ar de admissão",
  map_kpa: "Pressão coletor admissão",
  maf_gps: "Taxa de fluxo de ar (MAF)",
  timing_advance_deg: "Avanço de tempo",
  battery_voltage: "Tensão da bateria",
  fuel_status: "Status do sistema de combustível",
  dtcs: "Códigos de falha (DTC)"
} as const;

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