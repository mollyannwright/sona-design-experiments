/**
 * Sample Mock Data Template
 * 
 * Use this pattern for creating mock data in prototypes:
 * 1. Define TypeScript interfaces for type safety
 * 2. Export arrays with realistic UK-style data
 * 3. Include helper functions for filtering/sorting
 * 4. Keep all data in one file for easy editing
 */

// ==============================================
// INTERFACES
// ==============================================

export interface Employee {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  status: 'active' | 'away' | 'offline';
  email: string;
  phone?: string;
  avatar?: string;
  startDate: string;
  contractType: 'full-time' | 'part-time' | 'contract';
}

export interface Shift {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface PayrollPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'open' | 'submitted' | 'approved' | 'paid';
  totalAmount: number;
  employeeCount: number;
  amendmentCount: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assigneeId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  dueDate?: string;
  createdAt: string;
}

// ==============================================
// SAMPLE DATA
// ==============================================

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'Care Assistant',
    department: 'Floor 1',
    status: 'active',
    email: 'sarah.johnson@example.com',
    phone: '+44 7700 900123',
    startDate: '2022-03-15',
    contractType: 'full-time',
  },
  {
    id: '2',
    name: 'Mike Chen',
    firstName: 'Mike',
    lastName: 'Chen',
    role: 'Senior Carer',
    department: 'Floor 2',
    status: 'active',
    email: 'mike.chen@example.com',
    phone: '+44 7700 900124',
    startDate: '2021-08-01',
    contractType: 'full-time',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    firstName: 'Emma',
    lastName: 'Wilson',
    role: 'Night Nurse',
    department: 'Floor 1',
    status: 'away',
    email: 'emma.wilson@example.com',
    startDate: '2023-01-10',
    contractType: 'full-time',
  },
  {
    id: '4',
    name: 'James Thompson',
    firstName: 'James',
    lastName: 'Thompson',
    role: 'Care Assistant',
    department: 'Floor 3',
    status: 'active',
    email: 'james.thompson@example.com',
    phone: '+44 7700 900126',
    startDate: '2022-06-20',
    contractType: 'part-time',
  },
  {
    id: '5',
    name: 'Olivia Brown',
    firstName: 'Olivia',
    lastName: 'Brown',
    role: 'Team Leader',
    department: 'Floor 2',
    status: 'active',
    email: 'olivia.brown@example.com',
    phone: '+44 7700 900127',
    startDate: '2020-11-05',
    contractType: 'full-time',
  },
  {
    id: '6',
    name: 'William Davies',
    firstName: 'William',
    lastName: 'Davies',
    role: 'Care Assistant',
    department: 'Kitchen',
    status: 'offline',
    email: 'william.davies@example.com',
    startDate: '2023-04-18',
    contractType: 'contract',
  },
  {
    id: '7',
    name: 'Sophie Taylor',
    firstName: 'Sophie',
    lastName: 'Taylor',
    role: 'Senior Carer',
    department: 'Floor 1',
    status: 'active',
    email: 'sophie.taylor@example.com',
    phone: '+44 7700 900129',
    startDate: '2021-02-14',
    contractType: 'full-time',
  },
  {
    id: '8',
    name: 'Daniel Evans',
    firstName: 'Daniel',
    lastName: 'Evans',
    role: 'Care Assistant',
    department: 'Floor 3',
    status: 'active',
    email: 'daniel.evans@example.com',
    startDate: '2022-09-01',
    contractType: 'part-time',
  },
  {
    id: '9',
    name: 'Grace Roberts',
    firstName: 'Grace',
    lastName: 'Roberts',
    role: 'Night Nurse',
    department: 'Floor 2',
    status: 'away',
    email: 'grace.roberts@example.com',
    phone: '+44 7700 900131',
    startDate: '2023-02-28',
    contractType: 'full-time',
  },
  {
    id: '10',
    name: 'Harry Walker',
    firstName: 'Harry',
    lastName: 'Walker',
    role: 'Care Assistant',
    department: 'Housekeeping',
    status: 'active',
    email: 'harry.walker@example.com',
    startDate: '2022-12-01',
    contractType: 'full-time',
  },
];

export const shifts: Shift[] = [
  {
    id: '1',
    employeeId: '1',
    date: '2026-01-15',
    startTime: '07:00',
    endTime: '15:00',
    location: 'Floor 1 - Wing A',
    status: 'in-progress',
  },
  {
    id: '2',
    employeeId: '2',
    date: '2026-01-15',
    startTime: '07:00',
    endTime: '15:00',
    location: 'Floor 2 - Wing B',
    status: 'in-progress',
  },
  {
    id: '3',
    employeeId: '3',
    date: '2026-01-15',
    startTime: '23:00',
    endTime: '07:00',
    location: 'Floor 1 - Night Station',
    status: 'scheduled',
  },
  {
    id: '4',
    employeeId: '4',
    date: '2026-01-15',
    startTime: '15:00',
    endTime: '23:00',
    location: 'Floor 3 - Wing C',
    status: 'scheduled',
  },
  {
    id: '5',
    employeeId: '5',
    date: '2026-01-15',
    startTime: '07:00',
    endTime: '15:00',
    location: 'Floor 2 - Management Office',
    status: 'completed',
  },
];

export const payrollPeriods: PayrollPeriod[] = [
  {
    id: '1',
    name: 'January 2026 - Week 1',
    startDate: '2026-01-01',
    endDate: '2026-01-07',
    status: 'paid',
    totalAmount: 45230.50,
    employeeCount: 45,
    amendmentCount: 0,
  },
  {
    id: '2',
    name: 'January 2026 - Week 2',
    startDate: '2026-01-08',
    endDate: '2026-01-14',
    status: 'approved',
    totalAmount: 47820.75,
    employeeCount: 45,
    amendmentCount: 2,
  },
  {
    id: '3',
    name: 'January 2026 - Week 3',
    startDate: '2026-01-15',
    endDate: '2026-01-21',
    status: 'submitted',
    totalAmount: 46150.00,
    employeeCount: 44,
    amendmentCount: 5,
  },
  {
    id: '4',
    name: 'January 2026 - Week 4',
    startDate: '2026-01-22',
    endDate: '2026-01-28',
    status: 'open',
    totalAmount: 0,
    employeeCount: 45,
    amendmentCount: 3,
  },
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Review shift coverage for next week',
    description: 'Ensure all shifts are covered for the upcoming week',
    assigneeId: '5',
    priority: 'high',
    status: 'pending',
    dueDate: '2026-01-17',
    createdAt: '2026-01-10',
  },
  {
    id: '2',
    title: 'Complete training certification',
    description: 'Upload completed training certificates to HR portal',
    assigneeId: '1',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-01-20',
    createdAt: '2026-01-08',
  },
  {
    id: '3',
    title: 'Equipment maintenance check',
    priority: 'low',
    status: 'completed',
    createdAt: '2026-01-05',
  },
  {
    id: '4',
    title: 'Approve holiday requests',
    description: 'Review and approve pending holiday requests for February',
    assigneeId: '5',
    priority: 'urgent',
    status: 'pending',
    dueDate: '2026-01-16',
    createdAt: '2026-01-12',
  },
];

// ==============================================
// HELPER FUNCTIONS
// ==============================================

export const getEmployeesByDepartment = (department: string) =>
  employees.filter((e) => e.department === department);

export const getEmployeesByStatus = (status: Employee['status']) =>
  employees.filter((e) => e.status === status);

export const getActiveEmployees = () =>
  employees.filter((e) => e.status === 'active');

export const getEmployeeById = (id: string) =>
  employees.find((e) => e.id === id);

export const getShiftsByEmployee = (employeeId: string) =>
  shifts.filter((s) => s.employeeId === employeeId);

export const getShiftsByDate = (date: string) =>
  shifts.filter((s) => s.date === date);

export const getTasksByStatus = (status: Task['status']) =>
  tasks.filter((t) => t.status === status);

export const getTasksByPriority = (priority: Task['priority']) =>
  tasks.filter((t) => t.priority === priority);

export const getOpenPayrollPeriods = () =>
  payrollPeriods.filter((p) => p.status === 'open' || p.status === 'submitted');

// ==============================================
// STATISTICS HELPERS
// ==============================================

export const getEmployeeStats = () => ({
  total: employees.length,
  active: employees.filter((e) => e.status === 'active').length,
  away: employees.filter((e) => e.status === 'away').length,
  offline: employees.filter((e) => e.status === 'offline').length,
});

export const getDepartments = () =>
  [...new Set(employees.map((e) => e.department))];

export const getRoles = () =>
  [...new Set(employees.map((e) => e.role))];

// ==============================================
// FORMATTING HELPERS
// ==============================================

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export const formatTime = (timeString: string) =>
  timeString; // Already in HH:MM format

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
