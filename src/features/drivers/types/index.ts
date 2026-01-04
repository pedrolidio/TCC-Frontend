export type DriverLicenseCategory = 'A' | 'B' | 'C' | 'D' | 'E' | 'AB' | 'AC' | 'AD' | 'AE';

export interface Driver {
  id: number;
  name: string;
  license: string;
  category: DriverLicenseCategory;
}

export interface CreateDriverPayload {
  name: string;
  license: string;
  category: DriverLicenseCategory;
}