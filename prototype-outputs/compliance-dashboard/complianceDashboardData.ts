// Mock data for Compliance Dashboard
// Tracks employee right to work status and policy acknowledgements

export interface RightToWorkDocument {
  id: string;
  type: 'passport' | 'birth_certificate' | 'visa' | 'driving_license' | 'other';
  documentNumber: string;
  expiryDate: string | null; // null for indefinite
  uploadedDate: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedDate?: string;
}

export interface RightToWorkStatus {
  employeeId: string;
  employeeName: string;
  department: string;
  role: string;
  status: 'compliant' | 'expiring_soon' | 'expired' | 'missing';
  documents: RightToWorkDocument[];
  lastVerified: string | null;
  nextReviewDate: string | null;
}

export interface Policy {
  id: string;
  name: string;
  version: string;
  category: 'health_safety' | 'data_protection' | 'code_of_conduct' | 'hr_policies' | 'other';
  publishedDate: string;
  effectiveDate: string;
  required: boolean;
}

export interface PolicyAcknowledgement {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  policyId: string;
  policyName: string;
  policyVersion: string;
  acknowledged: boolean;
  acknowledgedDate: string | null;
  expiryDate: string | null; // Some policies require re-acknowledgement
  status: 'acknowledged' | 'pending' | 'expired' | 'not_required';
}

// Right to Work Data
export const rightToWorkData: RightToWorkStatus[] = [
  {
    employeeId: 'EMP001',
    employeeName: 'Sarah Johnson',
    department: 'Care Team',
    role: 'Care Assistant',
    status: 'compliant',
    documents: [
      {
        id: 'DOC001',
        type: 'passport',
        documentNumber: 'GB123456789',
        expiryDate: '2028-06-15',
        uploadedDate: '2023-01-10',
        verified: true,
        verifiedBy: 'HR Team',
        verifiedDate: '2023-01-12',
      },
    ],
    lastVerified: '2023-01-12',
    nextReviewDate: '2024-01-12',
  },
  {
    employeeId: 'EMP002',
    employeeName: 'Michael Chen',
    department: 'Care Team',
    role: 'Senior Carer',
    status: 'expiring_soon',
    documents: [
      {
        id: 'DOC002',
        type: 'visa',
        documentNumber: 'VISA-UK-2024',
        expiryDate: '2024-03-20',
        uploadedDate: '2022-03-15',
        verified: true,
        verifiedBy: 'HR Team',
        verifiedDate: '2022-03-18',
      },
    ],
    lastVerified: '2022-03-18',
    nextReviewDate: '2024-03-18',
  },
  {
    employeeId: 'EMP003',
    employeeName: 'Emma Wilson',
    department: 'Nursing',
    role: 'Registered Nurse',
    status: 'compliant',
    documents: [
      {
        id: 'DOC003',
        type: 'birth_certificate',
        documentNumber: 'BC-UK-1990',
        expiryDate: null,
        uploadedDate: '2021-05-20',
        verified: true,
        verifiedBy: 'HR Team',
        verifiedDate: '2021-05-22',
      },
      {
        id: 'DOC004',
        type: 'driving_license',
        documentNumber: 'DL-UK-2025',
        expiryDate: '2025-11-30',
        uploadedDate: '2021-05-20',
        verified: true,
        verifiedBy: 'HR Team',
        verifiedDate: '2021-05-22',
      },
    ],
    lastVerified: '2021-05-22',
    nextReviewDate: '2024-05-22',
  },
  {
    employeeId: 'EMP004',
    employeeName: 'David Thompson',
    department: 'Care Team',
    role: 'Care Assistant',
    status: 'expired',
    documents: [
      {
        id: 'DOC005',
        type: 'visa',
        documentNumber: 'VISA-UK-2023',
        expiryDate: '2023-12-01',
        uploadedDate: '2020-12-05',
        verified: true,
        verifiedBy: 'HR Team',
        verifiedDate: '2020-12-08',
      },
    ],
    lastVerified: '2020-12-08',
    nextReviewDate: null,
  },
  {
    employeeId: 'EMP005',
    employeeName: 'Lisa Anderson',
    department: 'Admin',
    role: 'Administrator',
    status: 'missing',
    documents: [],
    lastVerified: null,
    nextReviewDate: null,
  },
  {
    employeeId: 'EMP006',
    employeeName: 'James Brown',
    department: 'Care Team',
    role: 'Care Assistant',
    status: 'compliant',
    documents: [
      {
        id: 'DOC006',
        type: 'passport',
        documentNumber: 'GB987654321',
        expiryDate: '2027-09-10',
        uploadedDate: '2022-08-15',
        verified: true,
        verifiedBy: 'HR Team',
        verifiedDate: '2022-08-17',
      },
    ],
    lastVerified: '2022-08-17',
    nextReviewDate: '2024-08-17',
  },
  {
    employeeId: 'EMP007',
    employeeName: 'Rachel Green',
    department: 'Nursing',
    role: 'Nurse Practitioner',
    status: 'expiring_soon',
    documents: [
      {
        id: 'DOC007',
        type: 'visa',
        documentNumber: 'VISA-UK-2024B',
        expiryDate: '2024-04-05',
        uploadedDate: '2021-04-01',
        verified: true,
        verifiedBy: 'HR Team',
        verifiedDate: '2021-04-03',
      },
    ],
    lastVerified: '2021-04-03',
    nextReviewDate: '2024-04-03',
  },
  {
    employeeId: 'EMP008',
    employeeName: 'Thomas White',
    department: 'Care Team',
    role: 'Senior Carer',
    status: 'compliant',
    documents: [
      {
        id: 'DOC008',
        type: 'passport',
        documentNumber: 'GB456789123',
        expiryDate: '2029-02-28',
        uploadedDate: '2023-03-10',
        verified: true,
        verifiedBy: 'HR Team',
        verifiedDate: '2023-03-12',
      },
    ],
    lastVerified: '2023-03-12',
    nextReviewDate: '2024-03-12',
  },
];

// Policies
export const policies: Policy[] = [
  {
    id: 'POL001',
    name: 'Health and Safety Policy',
    version: '3.2',
    category: 'health_safety',
    publishedDate: '2023-11-01',
    effectiveDate: '2023-11-15',
    required: true,
  },
  {
    id: 'POL002',
    name: 'Data Protection and GDPR Policy',
    version: '2.1',
    category: 'data_protection',
    publishedDate: '2023-09-10',
    effectiveDate: '2023-09-25',
    required: true,
  },
  {
    id: 'POL003',
    name: 'Code of Conduct',
    version: '1.5',
    category: 'code_of_conduct',
    publishedDate: '2023-06-01',
    effectiveDate: '2023-06-15',
    required: true,
  },
  {
    id: 'POL004',
    name: 'Safeguarding Adults Policy',
    version: '4.0',
    category: 'hr_policies',
    publishedDate: '2023-10-05',
    effectiveDate: '2023-10-20',
    required: true,
  },
  {
    id: 'POL005',
    name: 'Remote Working Policy',
    version: '1.0',
    category: 'hr_policies',
    publishedDate: '2023-08-15',
    effectiveDate: '2023-09-01',
    required: false,
  },
];

// Policy Acknowledgements
export const policyAcknowledgements: PolicyAcknowledgement[] = [
  // Sarah Johnson
  {
    id: 'ACK001',
    employeeId: 'EMP001',
    employeeName: 'Sarah Johnson',
    department: 'Care Team',
    policyId: 'POL001',
    policyName: 'Health and Safety Policy',
    policyVersion: '3.2',
    acknowledged: true,
    acknowledgedDate: '2023-11-16',
    expiryDate: '2024-11-16',
    status: 'acknowledged',
  },
  {
    id: 'ACK002',
    employeeId: 'EMP001',
    employeeName: 'Sarah Johnson',
    department: 'Care Team',
    policyId: 'POL002',
    policyName: 'Data Protection and GDPR Policy',
    policyVersion: '2.1',
    acknowledged: true,
    acknowledgedDate: '2023-09-26',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK003',
    employeeId: 'EMP001',
    employeeName: 'Sarah Johnson',
    department: 'Care Team',
    policyId: 'POL003',
    policyName: 'Code of Conduct',
    policyVersion: '1.5',
    acknowledged: true,
    acknowledgedDate: '2023-06-16',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK004',
    employeeId: 'EMP001',
    employeeName: 'Sarah Johnson',
    department: 'Care Team',
    policyId: 'POL004',
    policyName: 'Safeguarding Adults Policy',
    policyVersion: '4.0',
    acknowledged: false,
    acknowledgedDate: null,
    expiryDate: null,
    status: 'pending',
  },
  // Michael Chen
  {
    id: 'ACK005',
    employeeId: 'EMP002',
    employeeName: 'Michael Chen',
    department: 'Care Team',
    policyId: 'POL001',
    policyName: 'Health and Safety Policy',
    policyVersion: '3.2',
    acknowledged: true,
    acknowledgedDate: '2023-11-18',
    expiryDate: '2024-11-18',
    status: 'acknowledged',
  },
  {
    id: 'ACK006',
    employeeId: 'EMP002',
    employeeName: 'Michael Chen',
    department: 'Care Team',
    policyId: 'POL002',
    policyName: 'Data Protection and GDPR Policy',
    policyVersion: '2.1',
    acknowledged: true,
    acknowledgedDate: '2023-09-28',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK007',
    employeeId: 'EMP002',
    employeeName: 'Michael Chen',
    department: 'Care Team',
    policyId: 'POL003',
    policyName: 'Code of Conduct',
    policyVersion: '1.5',
    acknowledged: false,
    acknowledgedDate: null,
    expiryDate: null,
    status: 'pending',
  },
  {
    id: 'ACK008',
    employeeId: 'EMP002',
    employeeName: 'Michael Chen',
    department: 'Care Team',
    policyId: 'POL004',
    policyName: 'Safeguarding Adults Policy',
    policyVersion: '4.0',
    acknowledged: false,
    acknowledgedDate: null,
    expiryDate: null,
    status: 'pending',
  },
  // Emma Wilson
  {
    id: 'ACK009',
    employeeId: 'EMP003',
    employeeName: 'Emma Wilson',
    department: 'Nursing',
    policyId: 'POL001',
    policyName: 'Health and Safety Policy',
    policyVersion: '3.2',
    acknowledged: true,
    acknowledgedDate: '2023-11-15',
    expiryDate: '2024-11-15',
    status: 'acknowledged',
  },
  {
    id: 'ACK010',
    employeeId: 'EMP003',
    employeeName: 'Emma Wilson',
    department: 'Nursing',
    policyId: 'POL002',
    policyName: 'Data Protection and GDPR Policy',
    policyVersion: '2.1',
    acknowledged: true,
    acknowledgedDate: '2023-09-25',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK011',
    employeeId: 'EMP003',
    employeeName: 'Emma Wilson',
    department: 'Nursing',
    policyId: 'POL003',
    policyName: 'Code of Conduct',
    policyVersion: '1.5',
    acknowledged: true,
    acknowledgedDate: '2023-06-15',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK012',
    employeeId: 'EMP003',
    employeeName: 'Emma Wilson',
    department: 'Nursing',
    policyId: 'POL004',
    policyName: 'Safeguarding Adults Policy',
    policyVersion: '4.0',
    acknowledged: true,
    acknowledgedDate: '2023-10-21',
    expiryDate: null,
    status: 'acknowledged',
  },
  // David Thompson
  {
    id: 'ACK013',
    employeeId: 'EMP004',
    employeeName: 'David Thompson',
    department: 'Care Team',
    policyId: 'POL001',
    policyName: 'Health and Safety Policy',
    policyVersion: '3.2',
    acknowledged: false,
    acknowledgedDate: null,
    expiryDate: null,
    status: 'pending',
  },
  {
    id: 'ACK014',
    employeeId: 'EMP004',
    employeeName: 'David Thompson',
    department: 'Care Team',
    policyId: 'POL002',
    policyName: 'Data Protection and GDPR Policy',
    policyVersion: '2.1',
    acknowledged: true,
    acknowledgedDate: '2023-09-30',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK015',
    employeeId: 'EMP004',
    employeeName: 'David Thompson',
    department: 'Care Team',
    policyId: 'POL003',
    policyName: 'Code of Conduct',
    policyVersion: '1.5',
    acknowledged: true,
    acknowledgedDate: '2023-06-20',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK016',
    employeeId: 'EMP004',
    employeeName: 'David Thompson',
    department: 'Care Team',
    policyId: 'POL004',
    policyName: 'Safeguarding Adults Policy',
    policyVersion: '4.0',
    acknowledged: false,
    acknowledgedDate: null,
    expiryDate: null,
    status: 'pending',
  },
  // Lisa Anderson
  {
    id: 'ACK017',
    employeeId: 'EMP005',
    employeeName: 'Lisa Anderson',
    department: 'Admin',
    policyId: 'POL001',
    policyName: 'Health and Safety Policy',
    policyVersion: '3.2',
    acknowledged: true,
    acknowledgedDate: '2023-11-20',
    expiryDate: '2024-11-20',
    status: 'acknowledged',
  },
  {
    id: 'ACK018',
    employeeId: 'EMP005',
    employeeName: 'Lisa Anderson',
    department: 'Admin',
    policyId: 'POL002',
    policyName: 'Data Protection and GDPR Policy',
    policyVersion: '2.1',
    acknowledged: true,
    acknowledgedDate: '2023-09-26',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK019',
    employeeId: 'EMP005',
    employeeName: 'Lisa Anderson',
    department: 'Admin',
    policyId: 'POL003',
    policyName: 'Code of Conduct',
    policyVersion: '1.5',
    acknowledged: true,
    acknowledgedDate: '2023-06-16',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK020',
    employeeId: 'EMP005',
    employeeName: 'Lisa Anderson',
    department: 'Admin',
    policyId: 'POL004',
    policyName: 'Safeguarding Adults Policy',
    policyVersion: '4.0',
    acknowledged: true,
    acknowledgedDate: '2023-10-22',
    expiryDate: null,
    status: 'acknowledged',
  },
  // James Brown
  {
    id: 'ACK021',
    employeeId: 'EMP006',
    employeeName: 'James Brown',
    department: 'Care Team',
    policyId: 'POL001',
    policyName: 'Health and Safety Policy',
    policyVersion: '3.2',
    acknowledged: true,
    acknowledgedDate: '2023-11-17',
    expiryDate: '2024-11-17',
    status: 'acknowledged',
  },
  {
    id: 'ACK022',
    employeeId: 'EMP006',
    employeeName: 'James Brown',
    department: 'Care Team',
    policyId: 'POL002',
    policyName: 'Data Protection and GDPR Policy',
    policyVersion: '2.1',
    acknowledged: true,
    acknowledgedDate: '2023-09-27',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK023',
    employeeId: 'EMP006',
    employeeName: 'James Brown',
    department: 'Care Team',
    policyId: 'POL003',
    policyName: 'Code of Conduct',
    policyVersion: '1.5',
    acknowledged: true,
    acknowledgedDate: '2023-06-17',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK024',
    employeeId: 'EMP006',
    employeeName: 'James Brown',
    department: 'Care Team',
    policyId: 'POL004',
    policyName: 'Safeguarding Adults Policy',
    policyVersion: '4.0',
    acknowledged: false,
    acknowledgedDate: null,
    expiryDate: null,
    status: 'pending',
  },
  // Rachel Green
  {
    id: 'ACK025',
    employeeId: 'EMP007',
    employeeName: 'Rachel Green',
    department: 'Nursing',
    policyId: 'POL001',
    policyName: 'Health and Safety Policy',
    policyVersion: '3.2',
    acknowledged: true,
    acknowledgedDate: '2023-11-19',
    expiryDate: '2024-11-19',
    status: 'acknowledged',
  },
  {
    id: 'ACK026',
    employeeId: 'EMP007',
    employeeName: 'Rachel Green',
    department: 'Nursing',
    policyId: 'POL002',
    policyName: 'Data Protection and GDPR Policy',
    policyVersion: '2.1',
    acknowledged: true,
    acknowledgedDate: '2023-09-29',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK027',
    employeeId: 'EMP007',
    employeeName: 'Rachel Green',
    department: 'Nursing',
    policyId: 'POL003',
    policyName: 'Code of Conduct',
    policyVersion: '1.5',
    acknowledged: true,
    acknowledgedDate: '2023-06-18',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK028',
    employeeId: 'EMP007',
    employeeName: 'Rachel Green',
    department: 'Nursing',
    policyId: 'POL004',
    policyName: 'Safeguarding Adults Policy',
    policyVersion: '4.0',
    acknowledged: true,
    acknowledgedDate: '2023-10-23',
    expiryDate: null,
    status: 'acknowledged',
  },
  // Thomas White
  {
    id: 'ACK029',
    employeeId: 'EMP008',
    employeeName: 'Thomas White',
    department: 'Care Team',
    policyId: 'POL001',
    policyName: 'Health and Safety Policy',
    policyVersion: '3.2',
    acknowledged: true,
    acknowledgedDate: '2023-11-21',
    expiryDate: '2024-11-21',
    status: 'acknowledged',
  },
  {
    id: 'ACK030',
    employeeId: 'EMP008',
    employeeName: 'Thomas White',
    department: 'Care Team',
    policyId: 'POL002',
    policyName: 'Data Protection and GDPR Policy',
    policyVersion: '2.1',
    acknowledged: true,
    acknowledgedDate: '2023-09-30',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK031',
    employeeId: 'EMP008',
    employeeName: 'Thomas White',
    department: 'Care Team',
    policyId: 'POL003',
    policyName: 'Code of Conduct',
    policyVersion: '1.5',
    acknowledged: true,
    acknowledgedDate: '2023-06-19',
    expiryDate: null,
    status: 'acknowledged',
  },
  {
    id: 'ACK032',
    employeeId: 'EMP008',
    employeeName: 'Thomas White',
    department: 'Care Team',
    policyId: 'POL004',
    policyName: 'Safeguarding Adults Policy',
    policyVersion: '4.0',
    acknowledged: false,
    acknowledgedDate: null,
    expiryDate: null,
    status: 'pending',
  },
];

// Helper functions
export const getComplianceStats = () => {
  const totalEmployees = rightToWorkData.length;
  const compliant = rightToWorkData.filter((e) => e.status === 'compliant').length;
  const expiringSoon = rightToWorkData.filter((e) => e.status === 'expiring_soon').length;
  const expired = rightToWorkData.filter((e) => e.status === 'expired').length;
  const missing = rightToWorkData.filter((e) => e.status === 'missing').length;

  return {
    totalEmployees,
    compliant,
    expiringSoon,
    expired,
    missing,
  };
};

export const getPolicyComplianceStats = () => {
  const requiredPolicies = policies.filter((p) => p.required);
  const totalRequired = requiredPolicies.length;
  const totalEmployees = rightToWorkData.length;
  const totalRequiredAcknowledgements = totalRequired * totalEmployees;

  const acknowledged = policyAcknowledgements.filter(
    (a) => a.acknowledged && a.status === 'acknowledged'
  ).length;
  const pending = policyAcknowledgements.filter((a) => a.status === 'pending').length;
  const expired = policyAcknowledgements.filter((a) => a.status === 'expired').length;

  return {
    totalRequired,
    totalEmployees,
    totalRequiredAcknowledgements,
    acknowledged,
    pending,
    expired,
    complianceRate: totalRequiredAcknowledgements > 0 
      ? Math.round((acknowledged / totalRequiredAcknowledgements) * 100) 
      : 0,
  };
};
