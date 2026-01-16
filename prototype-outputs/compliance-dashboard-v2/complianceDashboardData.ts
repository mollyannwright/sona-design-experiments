// Compliance Dashboard V2 Mock Data

export interface RightToWorkDocument {
  type: 'passport' | 'visa' | 'birth_certificate' | 'driving_license';
  expiryDate: string | null;
  documentNumber?: string;
}

export interface RightToWorkEmployee {
  employeeId: string;
  employeeName: string;
  role: string;
  department: string;
  status: 'compliant' | 'expired' | 'missing' | 'expiring_soon';
  documents: RightToWorkDocument[];
  lastVerified: string | null;
  nextReviewDate?: string | null;
}

export interface Policy {
  id: string;
  name: string;
  required: boolean;
}

export interface PolicyAcknowledgement {
  id: string;
  employeeId: string;
  policyId: string;
  acknowledged: boolean;
  status: 'acknowledged' | 'pending';
  acknowledgedAt?: string;
}

export const rightToWorkData: RightToWorkEmployee[] = [
  {
    employeeId: 'emp-1',
    employeeName: 'Sarah Chen',
    role: 'Senior Developer',
    department: 'Engineering',
    status: 'compliant',
    documents: [
      {
        type: 'passport',
        expiryDate: '2026-12-31',
        documentNumber: 'GB123456789',
      },
    ],
    lastVerified: '2024-01-15',
    nextReviewDate: '2025-01-15',
  },
  {
    employeeId: 'emp-2',
    employeeName: 'Marcus Johnson',
    role: 'Product Manager',
    department: 'Product',
    status: 'expiring_soon',
    documents: [
      {
        type: 'visa',
        expiryDate: '2024-03-15',
        documentNumber: 'VISA-987654',
      },
    ],
    lastVerified: '2023-12-01',
    nextReviewDate: '2024-03-01',
  },
  {
    employeeId: 'emp-3',
    employeeName: 'Emily Rodriguez',
    role: 'UX Designer',
    department: 'Design',
    status: 'expired',
    documents: [
      {
        type: 'passport',
        expiryDate: '2023-11-30',
        documentNumber: 'GB987654321',
      },
    ],
    lastVerified: '2023-10-15',
  },
  {
    employeeId: 'emp-4',
    employeeName: 'James Wilson',
    role: 'DevOps Engineer',
    department: 'Engineering',
    status: 'compliant',
    documents: [
      {
        type: 'driving_license',
        expiryDate: '2027-06-30',
        documentNumber: 'DL-123456',
      },
    ],
    lastVerified: '2024-01-10',
    nextReviewDate: '2025-01-10',
  },
  {
    employeeId: 'emp-5',
    employeeName: 'Aisha Patel',
    role: 'Data Analyst',
    department: 'Analytics',
    status: 'missing',
    documents: [],
    lastVerified: null,
  },
  {
    employeeId: 'emp-6',
    employeeName: 'David Kim',
    role: 'Frontend Developer',
    department: 'Engineering',
    status: 'compliant',
    documents: [
      {
        type: 'passport',
        expiryDate: '2026-08-20',
        documentNumber: 'GB555666777',
      },
    ],
    lastVerified: '2024-01-05',
    nextReviewDate: '2025-01-05',
  },
];

export const policies: Policy[] = [
  { id: 'policy-1', name: 'Code of Conduct', required: true },
  { id: 'policy-2', name: 'Data Protection Policy', required: true },
  { id: 'policy-3', name: 'Health & Safety Policy', required: true },
  { id: 'policy-4', name: 'Remote Working Policy', required: false },
  { id: 'policy-5', name: 'Diversity & Inclusion Policy', required: true },
];

export const policyAcknowledgements: PolicyAcknowledgement[] = [
  { id: 'ack-1', employeeId: 'emp-1', policyId: 'policy-1', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-10' },
  { id: 'ack-2', employeeId: 'emp-1', policyId: 'policy-2', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-10' },
  { id: 'ack-3', employeeId: 'emp-1', policyId: 'policy-3', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-11' },
  { id: 'ack-4', employeeId: 'emp-1', policyId: 'policy-5', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-12' },
  
  { id: 'ack-5', employeeId: 'emp-2', policyId: 'policy-1', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-08' },
  { id: 'ack-6', employeeId: 'emp-2', policyId: 'policy-2', acknowledged: false, status: 'pending' },
  { id: 'ack-7', employeeId: 'emp-2', policyId: 'policy-3', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-09' },
  { id: 'ack-8', employeeId: 'emp-2', policyId: 'policy-5', acknowledged: false, status: 'pending' },
  
  { id: 'ack-9', employeeId: 'emp-3', policyId: 'policy-1', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2023-12-15' },
  { id: 'ack-10', employeeId: 'emp-3', policyId: 'policy-2', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2023-12-15' },
  { id: 'ack-11', employeeId: 'emp-3', policyId: 'policy-3', acknowledged: false, status: 'pending' },
  
  { id: 'ack-12', employeeId: 'emp-4', policyId: 'policy-1', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-05' },
  { id: 'ack-13', employeeId: 'emp-4', policyId: 'policy-2', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-05' },
  { id: 'ack-14', employeeId: 'emp-4', policyId: 'policy-3', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-06' },
  { id: 'ack-15', employeeId: 'emp-4', policyId: 'policy-5', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-07' },
  
  { id: 'ack-16', employeeId: 'emp-5', policyId: 'policy-1', acknowledged: false, status: 'pending' },
  { id: 'ack-17', employeeId: 'emp-5', policyId: 'policy-2', acknowledged: false, status: 'pending' },
  { id: 'ack-18', employeeId: 'emp-5', policyId: 'policy-3', acknowledged: false, status: 'pending' },
  
  { id: 'ack-19', employeeId: 'emp-6', policyId: 'policy-1', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-02' },
  { id: 'ack-20', employeeId: 'emp-6', policyId: 'policy-2', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-02' },
  { id: 'ack-21', employeeId: 'emp-6', policyId: 'policy-3', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-03' },
  { id: 'ack-22', employeeId: 'emp-6', policyId: 'policy-5', acknowledged: true, status: 'acknowledged', acknowledgedAt: '2024-01-04' },
];

export function getComplianceStats() {
  const totalEmployees = rightToWorkData.length;
  const compliant = rightToWorkData.filter((e) => e.status === 'compliant').length;
  const expired = rightToWorkData.filter((e) => e.status === 'expired').length;
  const missing = rightToWorkData.filter((e) => e.status === 'missing').length;
  const expiringSoon = rightToWorkData.filter((e) => e.status === 'expiring_soon').length;

  return {
    totalEmployees,
    compliant,
    expired,
    missing,
    expiringSoon,
  };
}

export function getPolicyComplianceStats() {
  const requiredPolicies = policies.filter((p) => p.required);
  const totalRequired = requiredPolicies.length * rightToWorkData.length;
  const totalAcknowledged = policyAcknowledgements.filter((a) => a.acknowledged).length;
  const pending = policyAcknowledgements.filter((a) => a.status === 'pending').length;
  const complianceRate = totalRequired > 0
    ? Math.round((totalAcknowledged / totalRequired) * 100)
    : 0;

  return {
    complianceRate,
    pending,
    totalAcknowledged,
    totalRequired,
  };
}
