export const ROLES = {
  ADMIN: 1 as number,
  MANAGER: 2 as number,
  MONITOR: 3 as number,
} as const;

export const PERMISSIONS = {
  VEHICLES: [ROLES.ADMIN, ROLES.MANAGER, ROLES.MONITOR],
};