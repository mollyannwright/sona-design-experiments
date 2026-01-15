// PWS Configuration Mock Data

export interface CommissionedHour {
  hourType: string;
  hoursAmount: string;
  carerRatio: string;
  appliedWhen: string;
  hourBanking: 'Enabled' | 'Disabled';
}

export interface CarePackage {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Expired';
  effectiveDate: string;
  endDate: string;
  packageCode: string;
  primaryService: string;
  residencyAddress: string;
  specifiedHours: CommissionedHour[];
  sharedHours: CommissionedHour[];
  createdBy: string;
  createdAt: string;
  reasonForChange?: string;
  summaryOfChanges?: string;
}

export interface OutOfServiceRecord {
  id: string;
  outOfServiceDate: string;
  expectedReturnDate: string;
  reason: 'Hospital' | 'Respite' | 'Holiday' | 'Family Visit' | 'Other';
  impactOnHours: number;
  notes: string;
  hourDistribution: 'Auto' | 'Manual';
}

export interface PWS {
  id: string;
  name: string;
  status: 'In service' | 'Out of service';
  expectedReturn?: string;
  totalCommissionedHours: number;
  totalSpecifiedHours: number;
  totalSharedHours: number;
  specifiedCareRatio: string;
  sharedCareRatio: string;
  percentSpecifiedUsed: number;
  percentSharedUsed: number;
  specifiedHoursRemaining: number;
  sharedHoursRemaining: number;
  carePackages: CarePackage[];
  outOfServiceRecords: OutOfServiceRecord[];
}

export interface Service {
  id: string;
  name: string;
  capacity: number;
  targetRatio: string;
  controllingRatio: string;
  dayPeriodStart: string;
  nightPeriodStart: string;
  distributionMethod: 'Equal' | 'Percentage' | 'Ratio-weighted';
  address: {
    line1: string;
    line2?: string;
    line3?: string;
    line4?: string;
    city: string;
    postcode: string;
    longitude?: string;
    latitude?: string;
  };
}

// Mock Services
export const services: Service[] = [
  {
    id: 'svc-001',
    name: 'Maple house',
    capacity: 12,
    targetRatio: '1:6',
    controllingRatio: '1:4',
    dayPeriodStart: '07:00',
    nightPeriodStart: '22:00',
    distributionMethod: 'Equal',
    address: {
      line1: '45 Maple Grove',
      line2: 'Thornbury Estate',
      city: 'Bristol',
      postcode: 'BS15 3QR',
      longitude: '-2.5879',
      latitude: '51.4545',
    },
  },
  {
    id: 'svc-002',
    name: 'Oak Grove House',
    capacity: 8,
    targetRatio: '1:6',
    controllingRatio: '1:6',
    dayPeriodStart: '07:00',
    nightPeriodStart: '22:00',
    distributionMethod: 'Percentage',
    address: {
      line1: '12 Oak Lane',
      city: 'Bristol',
      postcode: 'BS16 4TY',
    },
  },
];

// Package Code Options
export const packageCodes = [
  { value: 'basic-1', label: 'Basic 1' },
  { value: 'basic-2', label: 'Basic 2' },
  { value: 'standard-1', label: 'Standard 1' },
  { value: 'enhanced-1', label: 'Enhanced 1' },
  { value: 'complex-1', label: 'Complex 1' },
];

// Hour Type Options
export const specifiedHourTypes = [
  { value: 'advance-care', label: 'Advance care' },
  { value: '1-1-care', label: '1:1 Care' },
  { value: '2-1-care', label: '2:1 Care' },
];

export const sharedHourTypes = [
  { value: 'shared-care-day', label: 'Shared care day' },
  { value: 'shared-day-night', label: 'Shared day night' },
  { value: 'shared-support-am', label: 'Shared support AM' },
  { value: 'shared-support-pm', label: 'Shared support PM' },
  { value: 'waking-night', label: 'Waking night' },
  { value: 'sleeping-night', label: 'Sleeping night' },
];

// Carer Ratio Options
export const carerRatios = [
  { value: '1:1', label: '1:1' },
  { value: '1:2', label: '1:2' },
  { value: '1:4', label: '1:4' },
  { value: '1:6', label: '1:6' },
  { value: '1:8', label: '1:8' },
  { value: '1:10', label: '1:10' },
];

// Applied When Options
export const appliedWhenOptions = [
  { value: 'all-times', label: 'All times' },
  { value: 'day', label: 'Day' },
  { value: 'day-periods', label: 'Day periods' },
  { value: 'night', label: 'Night' },
  { value: 'night-periods', label: 'Night periods' },
];

// Out of Service Reason Options
export const outOfServiceReasons = [
  { value: 'Hospital', label: 'Hospital' },
  { value: 'Respite', label: 'Respite' },
  { value: 'Holiday', label: 'Holiday' },
  { value: 'Family Visit', label: 'Family Visit' },
  { value: 'Other', label: 'Other' },
];

// Mock PWS Data
export const mockPWS: PWS = {
  id: 'pws-001',
  name: 'Alice Barclay',
  status: 'In service',
  totalCommissionedHours: 180,
  totalSpecifiedHours: 50,
  totalSharedHours: 130,
  specifiedCareRatio: '1:1',
  sharedCareRatio: '1:4',
  percentSpecifiedUsed: 76,
  percentSharedUsed: 72,
  specifiedHoursRemaining: 12,
  sharedHoursRemaining: 36,
  carePackages: [
    {
      id: 'cp-001',
      name: 'Care package basic 1',
      status: 'Active',
      effectiveDate: '08/12/2025',
      endDate: 'Ongoing',
      packageCode: 'SL-2025-1847',
      primaryService: 'Maple house',
      residencyAddress: 'Maple house',
      specifiedHours: [
        {
          hourType: 'Advance care',
          hoursAmount: '50 hrs',
          carerRatio: '1:1',
          appliedWhen: 'All times',
          hourBanking: 'Enabled',
        },
      ],
      sharedHours: [
        {
          hourType: 'Shared care day',
          hoursAmount: '80 hrs',
          carerRatio: '1:4',
          appliedWhen: 'Day periods',
          hourBanking: 'Enabled',
        },
        {
          hourType: 'Shared day night',
          hoursAmount: '50 hrs',
          carerRatio: '1:4',
          appliedWhen: 'Night periods',
          hourBanking: 'Disabled',
        },
      ],
      createdBy: 'Rachel Greeves',
      createdAt: '14th March 2025 @ 12:03pm',
    },
  ],
  outOfServiceRecords: [
    {
      id: 'oos-001',
      outOfServiceDate: '12/06/2025 @ 12:00 PM',
      expectedReturnDate: '13/06/2025 @ 12:00 PM',
      reason: 'Respite',
      impactOnHours: -10,
      notes: '--',
      hourDistribution: 'Auto',
    },
    {
      id: 'oos-002',
      outOfServiceDate: '12/06/2025 @ 12:00 PM',
      expectedReturnDate: '13/06/2025 @ 12:00 PM',
      reason: 'Holiday',
      impactOnHours: -10,
      notes: '--',
      hourDistribution: 'Auto',
    },
    {
      id: 'oos-003',
      outOfServiceDate: '12/06/2025 @ 12:00 PM',
      expectedReturnDate: '13/06/2025 @ 12:00 PM',
      reason: 'Hospital',
      impactOnHours: -10,
      notes: '--',
      hourDistribution: 'Auto',
    },
  ],
};

// Helper functions
export const getServiceById = (id: string): Service | undefined => {
  return services.find((s) => s.id === id);
};

export const getServiceByName = (name: string): Service | undefined => {
  return services.find((s) => s.name === name);
};

export const generatePackageCode = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SL-${year}-${random}`;
};
