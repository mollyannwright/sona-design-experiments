import { useState } from 'react';
import { SonaLayout } from '../../src/components/shared/SonaLayout';
import { SearchIcon, DownloadIcon, ExclamationTriangleIcon, CheckIcon, InformationCircleIcon } from '../../src/components/shared/Icon';
import {
  rightToWorkData,
  policyAcknowledgements,
  policies,
  getComplianceStats,
  getPolicyComplianceStats,
} from './complianceDashboardData';

type TabType = 'right-to-work' | 'policies';

function ComplianceDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('right-to-work');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const rtWStats = getComplianceStats();
  const policyStats = getPolicyComplianceStats();

  // Filter right to work data
  const filteredRightToWork = rightToWorkData.filter((employee) => {
    const matchesSearch =
      employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter policy acknowledgements
  const filteredPolicies = policyAcknowledgements.filter((ack) => {
    const matchesSearch =
      ack.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ack.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ack.policyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ack.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get unique employees for policy view
  const uniqueEmployees = Array.from(
    new Set(policyAcknowledgements.map((a) => a.employeeId))
  ).map((id) => {
    const employee = rightToWorkData.find((e) => e.employeeId === id);
    return employee || {
      employeeId: id,
      employeeName: policyAcknowledgements.find((a) => a.employeeId === id)?.employeeName || '',
      department: policyAcknowledgements.find((a) => a.employeeId === id)?.department || '',
      role: '',
      status: 'compliant' as const,
      documents: [],
      lastVerified: null,
      nextReviewDate: null,
    };
  });

  // Calculate policy compliance per employee
  const employeePolicyCompliance = uniqueEmployees.map((employee) => {
    const requiredPolicies = policies.filter((p) => p.required);
    const employeeAcknowledgements = policyAcknowledgements.filter(
      (a) => a.employeeId === employee.employeeId && a.acknowledged
    );
    const acknowledgedCount = employeeAcknowledgements.length;
    const complianceRate = requiredPolicies.length > 0
      ? Math.round((acknowledgedCount / requiredPolicies.length) * 100)
      : 0;
    const pendingCount = policyAcknowledgements.filter(
      (a) => a.employeeId === employee.employeeId && a.status === 'pending'
    ).length;

    return {
      ...employee,
      complianceRate,
      acknowledgedCount,
      pendingCount,
      totalRequired: requiredPolicies.length,
    };
  });

  const filteredEmployeeCompliance = employeePolicyCompliance.filter((employee) => {
    const matchesSearch =
      employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full border';
    switch (status) {
      case 'compliant':
      case 'acknowledged':
        return (
          <span className={`${baseClasses} text-emerald-700 bg-green-50 border-emerald-700/20`}>
            Compliant
          </span>
        );
      case 'expiring_soon':
        return (
          <span className={`${baseClasses} text-amber-700 bg-amber-50 border-amber-700/20`}>
            Expiring soon
          </span>
        );
      case 'expired':
        return (
          <span className={`${baseClasses} text-red-600 bg-red-50 border-red-600/20`}>
            Expired
          </span>
        );
      case 'missing':
      case 'pending':
        return (
          <span className={`${baseClasses} text-red-600 bg-red-50 border-red-600/20`}>
            Action required
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} text-slate-600 bg-slate-100 border-slate-200`}>
            {status}
          </span>
        );
    }
  };

  const navigation = [
    {
      title: 'Business Wide',
      items: [
        { label: 'Home', path: '/', icon: 'Home' },
        { label: 'Compliance', path: '/compliance', icon: 'Document', badge: rtWStats.expired + rtWStats.missing + policyStats.pending },
      ],
    },
  ];

  return (
    <SonaLayout
      navigation={navigation}
      showHeader={false}
    >
      <div className="flex flex-col h-full -m-6" style={{ backgroundColor: '#F8FAFC' }}>
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white">
          {/* Main Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Compliance dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Monitor employee right to work status and policy acknowledgements</p>
              </div>
              <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors flex items-center gap-2">
                <DownloadIcon size="sm" />
                Export report
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px px-6">
              <button
                onClick={() => setActiveTab('right-to-work')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'right-to-work'
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Right to work
              </button>
              <button
                onClick={() => setActiveTab('policies')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'policies'
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Policy acknowledgements
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Right to Work - Compliant */}
        <div className="bg-white p-5 rounded" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Right to work</span>
            <CheckIcon size="sm" className="text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-emerald-600 mb-1">{rtWStats.compliant}</div>
          <div className="text-xs text-slate-500">of {rtWStats.totalEmployees} compliant</div>
        </div>

        {/* Right to Work - Expiring Soon */}
        <div className="bg-white p-5 rounded" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Expiring soon</span>
            <ExclamationTriangleIcon size="sm" className="text-amber-600" />
          </div>
          <div className="text-3xl font-bold text-amber-600 mb-1">{rtWStats.expiringSoon}</div>
          <div className="text-xs text-slate-500">documents expiring</div>
        </div>

        {/* Right to Work - Action Required */}
        <div className="bg-white p-5 rounded" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Action required</span>
            <ExclamationTriangleIcon size="sm" className="text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-600 mb-1">
            {rtWStats.expired + rtWStats.missing}
          </div>
          <div className="text-xs text-slate-500">expired or missing</div>
        </div>

        {/* Policy Compliance Rate */}
        <div className="bg-white p-5 rounded" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Policy compliance</span>
            <InformationCircleIcon size="sm" className="text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-indigo-600 mb-1">
            {policyStats.complianceRate}%
          </div>
          <div className="text-xs text-slate-500">
            {policyStats.acknowledged} of {policyStats.totalRequiredAcknowledgements} acknowledged
          </div>
        </div>
          </div>

          {/* Tabs Content */}
          <div className="bg-white rounded" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
            {/* Filters and Search */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size="sm" />
                <input
                  type="text"
                  placeholder="Search employees, departments, or policies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All statuses</option>
                {activeTab === 'right-to-work' ? (
                  <>
                    <option value="compliant">Compliant</option>
                    <option value="expiring_soon">Expiring soon</option>
                    <option value="expired">Expired</option>
                    <option value="missing">Missing</option>
                  </>
                ) : (
                  <>
                    <option value="acknowledged">Acknowledged</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                  </>
                )}
              </select>
            </div>

            {/* Right to Work Table */}
            {activeTab === 'right-to-work' && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Last verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Next review
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredRightToWork.map((employee) => (
                  <tr key={employee.employeeId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">{employee.employeeName}</div>
                      <div className="text-xs text-slate-500">{employee.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{employee.department}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{employee.role}</td>
                    <td className="px-6 py-4">{getStatusBadge(employee.status)}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-700">
                        {employee.documents.length > 0 ? (
                          <div className="space-y-1">
                            {employee.documents.map((doc) => (
                              <div key={doc.id} className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 capitalize">
                                  {doc.type.replace('_', ' ')}
                                </span>
                                {doc.expiryDate && (
                                  <span className="text-xs text-slate-400">
                                    (expires {formatDate(doc.expiryDate)})
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">No documents</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {formatDate(employee.lastVerified)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {formatDate(employee.nextReviewDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
                {filteredRightToWork.length === 0 && (
                  <div className="px-6 py-12 text-center text-slate-500">
                    No employees found matching your search criteria.
                  </div>
                )}
              </div>
            )}

            {/* Policy Acknowledgements Table */}
            {activeTab === 'policies' && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Compliance rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Policies acknowledged
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Pending
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    Last updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredEmployeeCompliance.map((employee) => {
                  const latestAck = policyAcknowledgements
                    .filter((a) => a.employeeId === employee.employeeId && a.acknowledgedDate)
                    .sort((a, b) => {
                      if (!a.acknowledgedDate || !b.acknowledgedDate) return 0;
                      return new Date(b.acknowledgedDate).getTime() - new Date(a.acknowledgedDate).getTime();
                    })[0];

                  return (
                    <tr key={employee.employeeId} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{employee.employeeName}</div>
                        <div className="text-xs text-slate-500">{employee.employeeId}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{employee.department}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className={`h-2 rounded-full ${
                                employee.complianceRate === 100
                                  ? 'bg-emerald-600'
                                  : employee.complianceRate >= 75
                                  ? 'bg-amber-500'
                                  : 'bg-red-600'
                              }`}
                              style={{ width: `${employee.complianceRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700">
                            {employee.complianceRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-700">
                          {employee.acknowledgedCount} / {employee.totalRequired}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {employee.pendingCount > 0 ? (
                          <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-600/20 rounded-full">
                            {employee.pendingCount} pending
                          </span>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {latestAck ? formatDate(latestAck.acknowledgedDate) : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
                {filteredEmployeeCompliance.length === 0 && (
                  <div className="px-6 py-12 text-center text-slate-500">
                    No employees found matching your search criteria.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Policy Details Section */}
          {activeTab === 'policies' && (
            <div className="bg-white rounded mt-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-slate-900">Policy details</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        Policy
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        Version
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        Acknowledged date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                        Expiry date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredPolicies.map((ack) => (
                      <tr key={ack.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-slate-900">{ack.employeeName}</div>
                          <div className="text-xs text-slate-500">{ack.department}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{ack.policyName}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{ack.policyVersion}</td>
                        <td className="px-6 py-4">{getStatusBadge(ack.status)}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {formatDate(ack.acknowledgedDate)}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {formatDate(ack.expiryDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPolicies.length === 0 && (
                  <div className="px-6 py-12 text-center text-slate-500">
                    No policy acknowledgements found matching your search criteria.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </SonaLayout>
  );
}

export default ComplianceDashboard;
