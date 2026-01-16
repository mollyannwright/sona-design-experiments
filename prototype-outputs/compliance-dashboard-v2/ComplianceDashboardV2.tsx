import { useState } from 'react';
import { SonaLayout } from '../../src/components/shared/SonaLayout';
import { SearchIcon, DownloadIcon, ExclamationTriangleIcon, CheckIcon, Icon } from '../../src/components/shared/Icon';
import {
  rightToWorkData,
  policyAcknowledgements,
  policies,
  getComplianceStats,
  getPolicyComplianceStats,
} from '../compliance-dashboard/complianceDashboardData';

function ComplianceDashboardV2() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewFilter, setViewFilter] = useState<'all' | 'action-required' | 'compliant'>('all');

  const rtWStats = getComplianceStats();
  const policyStats = getPolicyComplianceStats();

  // Get unique employees with combined compliance data
  const employeesWithCompliance = rightToWorkData.map((employee) => {
    const requiredPolicies = policies.filter((p) => p.required);
    const employeePolicyAcks = policyAcknowledgements.filter(
      (a) => a.employeeId === employee.employeeId
    );
    const acknowledgedCount = employeePolicyAcks.filter((a) => a.acknowledged).length;
    const pendingCount = employeePolicyAcks.filter((a) => a.status === 'pending').length;
    const complianceRate = requiredPolicies.length > 0
      ? Math.round((acknowledgedCount / requiredPolicies.length) * 100)
      : 0;

    const hasActionRequired = 
      employee.status === 'expired' || 
      employee.status === 'missing' || 
      employee.status === 'expiring_soon' ||
      pendingCount > 0;

    return {
      ...employee,
      policyComplianceRate: complianceRate,
      policyAcknowledgedCount: acknowledgedCount,
      policyPendingCount: pendingCount,
      policyTotalRequired: requiredPolicies.length,
      hasActionRequired,
    };
  });

  // Filter employees
  const filteredEmployees = employeesWithCompliance.filter((employee) => {
    const matchesSearch =
      employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      viewFilter === 'all' ||
      (viewFilter === 'action-required' && employee.hasActionRequired) ||
      (viewFilter === 'compliant' && !employee.hasActionRequired && employee.status === 'compliant');
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysUntilExpiry = (dateString: string | null) => {
    if (!dateString) return null;
    const expiry = new Date(dateString);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const navigation = [
    {
      title: 'Business Wide',
      items: [
        { label: 'Home', path: '/', icon: 'Home' },
        { label: 'Compliance', path: '/compliance-v2', icon: 'Document', badge: rtWStats.expired + rtWStats.missing + policyStats.pending },
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
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Total employees</span>
            <Icon name="User" size="sm" className="text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-700 mb-1">{rtWStats.totalEmployees}</div>
          <div className="text-xs text-slate-500">Active employees</div>
        </div>

        <div className="bg-white p-5 rounded" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Right to work</span>
            <CheckIcon size="sm" className="text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-emerald-600 mb-1">{rtWStats.compliant}</div>
          <div className="text-xs text-slate-500">
            {rtWStats.expiringSoon > 0 && `${rtWStats.expiringSoon} expiring soon`}
            {rtWStats.expiringSoon === 0 && 'All compliant'}
          </div>
        </div>

        <div className="bg-white p-5 rounded" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Policy compliance</span>
            <Icon name="Document" size="sm" className="text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-indigo-600 mb-1">{policyStats.complianceRate}%</div>
          <div className="text-xs text-slate-500">
            {policyStats.pending > 0 && `${policyStats.pending} pending`}
            {policyStats.pending === 0 && 'All acknowledged'}
          </div>
        </div>

        <div className="bg-white p-5 rounded" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Action required</span>
            <ExclamationTriangleIcon size="sm" className="text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-600 mb-1">
            {rtWStats.expired + rtWStats.missing + policyStats.pending}
          </div>
          <div className="text-xs text-slate-500">Requires attention</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size="sm" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewFilter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All employees
            </button>
            <button
              onClick={() => setViewFilter('action-required')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewFilter === 'action-required'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Action required
            </button>
            <button
              onClick={() => setViewFilter('compliant')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewFilter === 'compliant'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Fully compliant
            </button>
          </div>
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => {
          const daysUntilExpiry = employee.documents.length > 0 && employee.documents[0].expiryDate
            ? getDaysUntilExpiry(employee.documents[0].expiryDate)
            : null;

          return (
            <div
              key={employee.employeeId}
              className={`bg-white rounded-lg border-2 transition-all hover:shadow-md ${
                employee.hasActionRequired
                  ? 'border-red-200 bg-red-50/30'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-900 mb-1">
                      {employee.employeeName}
                    </h3>
                    <p className="text-sm text-slate-500">{employee.role}</p>
                    <p className="text-xs text-slate-400 mt-1">{employee.department}</p>
                  </div>
                  {employee.hasActionRequired && (
                    <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-600/20 rounded-full">
                      Action required
                    </span>
                  )}
                </div>
              </div>

              {/* Right to Work Section */}
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-slate-700">Right to work</h4>
                  {employee.status === 'compliant' && (
                    <CheckIcon size="sm" className="text-emerald-600" />
                  )}
                  {employee.status === 'expiring_soon' && (
                    <ExclamationTriangleIcon size="sm" className="text-amber-600" />
                  )}
                  {(employee.status === 'expired' || employee.status === 'missing') && (
                    <ExclamationTriangleIcon size="sm" className="text-red-600" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Status</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                      employee.status === 'compliant'
                        ? 'text-emerald-700 bg-green-50 border-emerald-700/20'
                        : employee.status === 'expiring_soon'
                        ? 'text-amber-700 bg-amber-50 border-amber-700/20'
                        : 'text-red-600 bg-red-50 border-red-600/20'
                    }`}>
                      {employee.status === 'compliant' && 'Compliant'}
                      {employee.status === 'expiring_soon' && 'Expiring soon'}
                      {employee.status === 'expired' && 'Expired'}
                      {employee.status === 'missing' && 'Missing'}
                    </span>
                  </div>

                  {employee.documents.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Document</span>
                        <span className="text-xs text-slate-700 capitalize">
                          {employee.documents[0].type.replace('_', ' ')}
                        </span>
                      </div>
                      {employee.documents[0].expiryDate && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">Expires</span>
                          <span className={`text-xs font-medium ${
                            daysUntilExpiry !== null && daysUntilExpiry < 90
                              ? 'text-amber-600'
                              : 'text-slate-700'
                          }`}>
                            {formatDate(employee.documents[0].expiryDate)}
                            {daysUntilExpiry !== null && daysUntilExpiry < 90 && (
                              <span className="ml-1">({daysUntilExpiry} days)</span>
                            )}
                          </span>
                        </div>
                      )}
                      {employee.lastVerified && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">Last verified</span>
                          <span className="text-xs text-slate-700">{formatDate(employee.lastVerified)}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-xs text-red-600">No documents uploaded</div>
                  )}
                </div>
              </div>

              {/* Policy Compliance Section */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-slate-700">Policy compliance</h4>
                  {employee.policyComplianceRate === 100 ? (
                    <CheckIcon size="sm" className="text-emerald-600" />
                  ) : (
                    <ExclamationTriangleIcon size="sm" className="text-amber-600" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Compliance rate</span>
                    <span className={`text-sm font-semibold ${
                      employee.policyComplianceRate === 100
                        ? 'text-emerald-600'
                        : employee.policyComplianceRate >= 75
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}>
                      {employee.policyComplianceRate}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        employee.policyComplianceRate === 100
                          ? 'bg-emerald-600'
                          : employee.policyComplianceRate >= 75
                          ? 'bg-amber-500'
                          : 'bg-red-600'
                      }`}
                      style={{ width: `${employee.policyComplianceRate}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-500">Acknowledged</span>
                    <span className="text-xs text-slate-700">
                      {employee.policyAcknowledgedCount} / {employee.policyTotalRequired}
                    </span>
                  </div>

                  {employee.policyPendingCount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Pending</span>
                      <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-600/20 rounded-full">
                        {employee.policyPendingCount} pending
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              {employee.nextReviewDate && (
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 rounded-b-lg">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Icon name="Calendar" size="sm" />
                    <span>Next review: {formatDate(employee.nextReviewDate)}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-500">No employees found matching your search criteria.</p>
        </div>
      )}
        </div>
      </div>
    </SonaLayout>
  );
}

export default ComplianceDashboardV2;
