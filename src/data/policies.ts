export interface PolicySection {
  id: string;
  title: string;
  content: string;
  pageNumber: number;
}

export interface Policy {
  id: string;
  name: string;
  sections: PolicySection[];
}

export const POLICIES: Policy[] = [
  {
    id: 'absence-policy',
    name: 'Absence and Sickness Policy',
    sections: [
      {
        id: 'reporting',
        title: '1. Reporting Absence',
        pageNumber: 2,
        content: 'Employees must report any unplanned absence to their immediate supervisor no later than 9:00 AM on the first day of absence. Failure to do so may result in the absence being recorded as unauthorized.'
      },
      {
        id: 'sick-pay',
        title: '2. Statutory Sick Pay (SSP)',
        pageNumber: 5,
        content: 'To qualify for SSP, you must be off work for at least 4 days in a row (including non-working days). The first 3 days are unpaid "waiting days" unless you have been paid SSP within the last 8 weeks.'
      },
      {
        id: 'evidence',
        title: '3. Medical Evidence',
        pageNumber: 7,
        content: 'For absences of more than 7 consecutive days, employees must provide a "Fit Note" from their GP or a hospital doctor. Self-certification is acceptable for the first 7 days.'
      }
    ]
  },
  {
    id: 'parental-leave',
    name: 'Parental Leave Policy',
    sections: [
      {
        id: 'maternity-entitlement',
        title: '1. Maternity Leave Entitlement',
        pageNumber: 3,
        content: 'Eligible employees are entitled to up to 52 weeks of maternity leave. This is divided into 26 weeks of Ordinary Maternity Leave and 26 weeks of Additional Maternity Leave.'
      },
      {
        id: 'paternity-leave',
        title: '2. Paternity Leave',
        pageNumber: 12,
        content: 'New fathers or partners are entitled to 1 or 2 weeks of paid Paternity Leave. This must be taken in a single block and within 56 days of the birth.'
      }
    ]
  }
];
