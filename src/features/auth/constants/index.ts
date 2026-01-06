export const ROLES = {
  ADMIN: 1 as number,
  MANAGER: 2 as number,
  MONITOR: 3 as number,
} as const;

export const ROLE_LABELS: Record<number, string> = {
  [ROLES.ADMIN]: 'Administrador de Sistema',
  [ROLES.MANAGER]: 'Gerente de Frotas',
  [ROLES.MONITOR]: 'Monitorador de Frotas',
};

export const PERMISSIONS = {
  VEHICLES: [ROLES.ADMIN, ROLES.MANAGER, ROLES.MONITOR],
  VEHICLE_CONFIGURATION: [ROLES.ADMIN, ROLES.MANAGER],
  DRIVERS: [ROLES.ADMIN, ROLES.MANAGER],
  USERS: [ROLES.ADMIN],
};