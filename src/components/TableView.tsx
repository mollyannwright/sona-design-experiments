import { ChevronLeft, ChevronRight, ChevronDown, Search, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

/**
 * TableView - Using SonaUI Design System
 * 
 * Component styles from: /Users/molly/Documents/Sona/backend/assets/css/sonaui/
 * - table.css: .sonaui-table, .sonaui-table__th, .sonaui-table__td, .sonaui-tablewrapper--default
 * - button.css: .ui-button, .ui-button--primary, .ui-button--secondary
 * - colors.css: Design tokens (--ui-brand-primary, --ui-surface-*, --ui-text-*, --ui-border-*)
 * 
 * Component logic from: /Users/molly/Documents/Sona/backend/lib/sona_ui/components/
 * - table.ex: Table with sorting, selection, pagination
 * - badge.ex: Status badges with color variants
 */

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  startDate: string;
  email: string;
}

const mockEmployees: Employee[] = [
  { id: '1', name: 'Sarah Chen', role: 'Senior Developer', department: 'Engineering', status: 'Active', startDate: '2023-01-15', email: 'sarah.chen@company.com' },
  { id: '2', name: 'Marcus Johnson', role: 'Product Manager', department: 'Product', status: 'Active', startDate: '2022-08-20', email: 'marcus.j@company.com' },
  { id: '3', name: 'Emily Rodriguez', role: 'UX Designer', department: 'Design', status: 'On Leave', startDate: '2023-03-01', email: 'emily.r@company.com' },
  { id: '4', name: 'James Wilson', role: 'DevOps Engineer', department: 'Engineering', status: 'Active', startDate: '2021-11-10', email: 'james.w@company.com' },
  { id: '5', name: 'Aisha Patel', role: 'Data Analyst', department: 'Analytics', status: 'Active', startDate: '2023-06-05', email: 'aisha.p@company.com' },
  { id: '6', name: 'David Kim', role: 'Frontend Developer', department: 'Engineering', status: 'Inactive', startDate: '2022-02-14', email: 'david.k@company.com' },
  { id: '7', name: 'Lisa Thompson', role: 'HR Manager', department: 'Human Resources', status: 'Active', startDate: '2020-09-22', email: 'lisa.t@company.com' },
  { id: '8', name: 'Michael Brown', role: 'Backend Developer', department: 'Engineering', status: 'Active', startDate: '2023-04-18', email: 'michael.b@company.com' },
];

interface TableViewProps {
  onBack?: () => void;
}

export function TableView({ onBack }: TableViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortedBy, setSortedBy] = useState<string | null>('name');
  const [orderedBy, setOrderedBy] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 5;

  const filteredEmployees = mockEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllSelection = () => {
    if (selectedRows.size === paginatedEmployees.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedEmployees.map((e) => e.id)));
    }
  };

  const handleSort = (key: string) => {
    if (sortedBy === key) {
      setOrderedBy(orderedBy === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedBy(key);
      setOrderedBy('asc');
    }
  };

  /**
   * Badge classes from SonaUI badge.ex
   * Uses: ui-badge, ui-badge--success, ui-badge--warning, ui-badge--info
   */
  const getStatusBadgeClass = (status: Employee['status']) => {
    switch (status) {
      case 'Active':
        return 'ui-badge ui-badge--success';
      case 'On Leave':
        return 'ui-badge ui-badge--warning';
      case 'Inactive':
        return 'ui-badge ui-badge--info';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[var(--ui-surface-subtle)]">
      {/* Page Header */}
      <div className="bg-[var(--ui-surface-default)] border-b border-[var(--ui-border-default)] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="ui-button ui-button--secondary p-2"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              {/* H2: Lexend Medium 20/28 */}
              <h1 className="text-h2 text-[var(--ui-text-default)]">Team members</h1>
              {/* Subtitle: Lexend Light 16/24 */}
              <p className="text-subtitle text-[var(--ui-text-tertiary)]">Manage your team roster and assignments</p>
            </div>
          </div>
          {/* Primary Button - ui-button--primary from button.css */}
          <button className="ui-button ui-button--primary text-body-bold">
            Add member
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Table Wrapper - sonaui-tablewrapper--default from table.css */}
        <div className="sonaui-tablewrapper--default bg-[var(--ui-surface-default)]">
          {/* Section Header */}
          <div className="px-4 py-3 border-b border-[var(--ui-border-default)] bg-[var(--ui-surface-subtle)]">
            <div className="flex items-center justify-between gap-4">
              {/* H3: Lexend Medium 16/24 */}
              <h2 className="text-h3 text-[var(--ui-text-default)]">All members</h2>
              {/* Search Input */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ui-text-tertiary)]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="text-body w-full pl-9 pr-3 py-2 bg-[var(--ui-surface-default)] border border-[var(--ui-border-default)] rounded-md text-[var(--ui-text-default)] placeholder:text-[var(--ui-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--ui-brand-primary)] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Table - sonaui-table from table.css */}
          <table className="sonaui-table sonaui-table--default">
            <thead>
              <tr>
                {/* Checkbox header - following table.ex checkbox_header pattern */}
                <th className="sonaui-table__th w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedEmployees.length && paginatedEmployees.length > 0}
                    onChange={toggleAllSelection}
                    className="w-4 h-4 rounded border-[var(--ui-border-default)] text-[var(--ui-brand-primary)] focus:ring-[var(--ui-brand-primary)]"
                  />
                </th>
                {/* Sortable column header - following table.ex sort pattern */}
                <th 
                  className="sonaui-table__th cursor-pointer hover:text-emerald-500"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1.5">
                    Name
                    <ChevronDown className={`w-3 h-3 transition-transform ${sortedBy === 'name' && orderedBy === 'desc' ? 'rotate-180' : ''}`} />
                  </div>
                </th>
                <th className="sonaui-table__th">Role</th>
                <th className="sonaui-table__th">Department</th>
                <th className="sonaui-table__th">Status</th>
                <th className="sonaui-table__th w-12"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className={`sonaui-table__tr group ${
                    selectedRows.has(employee.id) ? 'bg-emerald-50' : 'hover:bg-[var(--ui-surface-subtle)]'
                  }`}
                >
                  {/* Checkbox cell - following table.ex checkbox_col pattern */}
                  <td className="sonaui-table__td">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(employee.id)}
                      onChange={() => toggleRowSelection(employee.id)}
                      className="w-4 h-4 rounded border-[var(--ui-border-default)] text-[var(--ui-brand-primary)] focus:ring-[var(--ui-brand-primary)]"
                    />
                  </td>
                  <td className="sonaui-table__td">
                    <div className="flex items-center gap-3">
                      {/* Avatar - following avatar.ex initials pattern */}
                      <div className="w-8 h-8 rounded-full bg-[var(--ui-surface-strong)] flex items-center justify-center text-caption-bold text-[var(--ui-text-secondary)]">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        {/* Body Bold: Lexend Medium 14/20 */}
                        <div className="text-body-bold text-[var(--ui-text-default)]">{employee.name}</div>
                        {/* Caption: Lexend Light 12/16 */}
                        <div className="text-caption text-[var(--ui-text-tertiary)]">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  {/* Body: Lexend Light 14/20 */}
                  <td className="sonaui-table__td text-body text-[var(--ui-text-secondary)]">{employee.role}</td>
                  <td className="sonaui-table__td text-body text-[var(--ui-text-secondary)]">{employee.department}</td>
                  <td className="sonaui-table__td">
                    {/* Badge - using ui-badge classes from badge.ex */}
                    <span className={getStatusBadgeClass(employee.status)}>{employee.status}</span>
                  </td>
                  <td className="sonaui-table__td">
                    <button className="p-1.5 rounded hover:bg-[var(--ui-surface-strong)] text-[var(--ui-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {paginatedEmployees.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 rounded-full bg-[var(--ui-surface-strong)] flex items-center justify-center mb-3">
                <Search className="w-5 h-5 text-[var(--ui-text-tertiary)]" />
              </div>
              {/* Body Bold: Lexend Medium 14/20 */}
              <p className="text-body-bold text-[var(--ui-text-default)]">No results found</p>
              {/* Body: Lexend Light 14/20 */}
              <p className="text-body text-[var(--ui-text-tertiary)] mt-1">Try adjusting your search</p>
            </div>
          )}

          {/* Pagination */}
          {paginatedEmployees.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--ui-border-default)] bg-[var(--ui-surface-subtle)]">
              {/* Caption: Lexend Light 12/16 */}
              <p className="text-caption text-[var(--ui-text-secondary)]">
                Showing <span className="text-caption-bold">{startIndex + 1}</span> to{' '}
                <span className="text-caption-bold">{Math.min(startIndex + itemsPerPage, filteredEmployees.length)}</span> of{' '}
                <span className="text-caption-bold">{filteredEmployees.length}</span>
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="ui-button ui-button--secondary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`ui-button min-w-[36px] ${
                      currentPage === page
                        ? 'ui-button--primary'
                        : 'ui-button--secondary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="ui-button ui-button--secondary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
