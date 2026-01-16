import { useState } from 'react';
import {
  mockPWS,
  services,
  packageCodes,
  specifiedHourTypes,
  sharedHourTypes,
  carerRatios,
  appliedWhenOptions,
  outOfServiceReasons,
  generatePackageCode,
  type PWS,
  type CarePackage,
  type OutOfServiceRecord,
  type CommissionedHour,
  type Shift,
} from './pwsConfigData';
import {
  Icon,
  PlusIcon,
  TrashIcon,
  XIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from '../../src/components/shared/Icon';

// Sidebar Component
const Sidebar = () => {
  const navSections = [
    {
      title: 'Admin',
      items: [
        { icon: <Icon name="Users" size="md" />, label: 'People we support', active: true },
        { icon: <Icon name="Office building" size="md" />, label: 'Services', active: false },
      ],
    },
    {
      title: 'Business Wide',
      items: [
        { icon: <Icon name="Home" size="md" />, label: 'Home', active: false },
        { icon: <Icon name="Document" size="md" />, label: 'Roster', active: false },
        { icon: <Icon name="Currency Dollar" size="md" />, label: 'Revenues & Forecasts', active: false },
        { icon: <Icon name="Chart bar" size="md" />, label: 'Employee Management', active: false },
        { icon: <Icon name="Lightning bolt" size="md" />, label: 'Agentic Workforce', active: false },
        { icon: <CheckIcon size="md" />, label: 'Tasks', active: false, badge: 3 },
        { icon: <Icon name="Mail" size="md" />, label: 'Inbox', active: false },
        { icon: <Icon name="Holiday" size="md" />, label: 'Vacation', active: false },
        { icon: <Icon name="Users" size="md" />, label: 'Retention', active: false },
        { icon: <Icon name="Money" size="md" />, label: 'Payroll', active: false },
        { icon: <Icon name="Chart bar" size="md" />, label: 'Insights', active: false },
        { icon: <Icon name="Newspaper" size="md" />, label: 'Feed', active: false },
        { icon: <Icon name="Chat" size="md" />, label: 'Chat', active: false, badge: 1 },
        { icon: <Icon name="Cog" size="md" />, label: 'Admin', active: false },
      ],
    },
    {
      title: 'People We Support',
      items: [
        { icon: <Icon name="Location marker" size="md" />, label: 'Select a location...', active: false },
      ],
    },
  ];

  return (
    <aside className="w-[280px] bg-white border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0 fixed left-0 top-0">
      {/* Logo Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <span className="text-2xl font-medium text-emerald-500">Sona.</span>
        <button className="text-gray-500 hover:text-gray-700">
          <Icon name="Sidebar collapse" size="md" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="py-6">
        {navSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-8">
            <div className="px-6 mb-4 text-xs font-medium text-gray-500 uppercase tracking-[0.05em]">
              {section.title}
            </div>
            {section.items.map((item, itemIdx) => (
              <a
                key={itemIdx}
                href="#"
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  item.active
                    ? 'text-emerald-600 bg-emerald-50 border-r-[3px] border-emerald-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="w-5 mr-3 text-center">{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: 'In service' | 'Out of service' | 'Active' | 'Pending' | 'Expired' }) => {
  const styles = {
    'In service': 'bg-emerald-100 text-emerald-700 border-emerald-500',
    'Out of service': 'bg-red-100 text-red-800 border-red-600',
    'Active': 'bg-emerald-100 text-emerald-700 border-emerald-500',
    'Pending': 'bg-amber-100 text-amber-700 border-amber-500',
    'Expired': 'bg-gray-100 text-gray-600 border-gray-300',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
};

// Metric Card Component
const MetricCard = ({
  label,
  value,
  isWarning = false,
  valueColor = 'text-gray-900',
}: {
  label: string;
  value: string | number;
  isWarning?: boolean;
  valueColor?: string;
}) => (
  <div className={`bg-white p-5 rounded ${isWarning ? 'border-amber-200 bg-amber-50' : 'border border-gray-200'}`} style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
    <div className="text-sm text-gray-500 mb-2">{label}</div>
    <div className={`text-3xl font-semibold flex items-center gap-2 ${isWarning ? 'text-amber-600' : valueColor}`}>
      {isWarning && <ExclamationTriangleIcon className="text-amber-500" size="md" />}
      {value}
    </div>
  </div>
);


// Overview Tab Component
const OverviewTab = ({ pws }: { pws: PWS }) => {
  return (
    <div className="space-y-6">

      {/* Metrics Cards - Row 1 */}
      <div className="grid grid-cols-5 gap-4">
        <MetricCard label="Total commissioned hours" value={pws.totalCommissionedHours} />
        <MetricCard label="Total specified commissioned hours" value={pws.totalSpecifiedHours} />
        <MetricCard label="Total shared commissioned hours" value={pws.totalSharedHours} />
        <MetricCard label="Specified care ratio" value={pws.specifiedCareRatio} />
        <MetricCard label="Shared care ratio" value={pws.sharedCareRatio} />
      </div>

      {/* Metrics Cards - Row 2 */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard 
          label="% of specified hours used" 
          value={`${pws.percentSpecifiedUsed}%`} 
          isWarning={pws.percentSpecifiedUsed >= 70}
        />
        <MetricCard 
          label="% of shared hours used" 
          value={`${pws.percentSharedUsed}%`} 
          isWarning={pws.percentSharedUsed >= 70}
        />
        <MetricCard label="Specified hours remaining" value={pws.specifiedHoursRemaining} />
        <MetricCard label="Shared hours remaining" value={pws.sharedHoursRemaining} />
      </div>
    </div>
  );
};

// Care Package Tab Component
const CarePackageTab = ({
  pws,
  onViewPackage,
  onAddNew,
}: {
  pws: PWS;
  onViewPackage: (pkg: CarePackage) => void;
  onAddNew: () => void;
}) => {
  const isSinglePackage = pws.carePackages.length === 1;
  const singlePackage = isSinglePackage ? pws.carePackages[0] : null;

  // Single package view - show card with no back button
  if (isSinglePackage && singlePackage) {
    return (
      <div className="space-y-4">
        {/* Info Banner with Add New Button */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <InformationCircleIcon size="md" />
            <span className="text-sm text-blue-700">
              Add a new care package to make changes to the care details and commissioned hours
            </span>
          </div>
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-4 py-2 text-emerald-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium shadow-sm flex-shrink-0"
          >
            <PlusIcon />
            Add new
          </button>
        </div>

        {/* Care Package Card */}
        <div className="bg-white rounded border border-gray-200" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
          {/* Package Header */}
          <div className="px-6 py-5">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900">{singlePackage.name}</h2>
              <StatusBadge status={singlePackage.status} />
            </div>
          </div>

          {/* Summary of Changes (for Pending packages) */}
          {singlePackage.status === 'Pending' && singlePackage.summaryOfChanges && (
            <div className="px-6 mb-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-amber-800 mb-1">Summary of changes</h4>
                <p className="text-sm text-amber-700">{singlePackage.summaryOfChanges}</p>
              </div>
            </div>
          )}

          {/* Package Details Grid */}
          <div className="px-6 pb-6 mb-6 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-6">
              <div>
                <div className="text-xs text-gray-500 mb-1">Effective date</div>
                <div className="text-sm font-medium text-gray-900">{singlePackage.effectiveDate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">End date</div>
                <div className="text-sm font-medium text-gray-900">{singlePackage.endDate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Package code</div>
                <div className="text-sm font-medium text-gray-900">{singlePackage.packageCode}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Primary service</div>
                <div className="text-sm font-medium text-emerald-600">{singlePackage.primaryService}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Residency address</div>
                <div className="text-sm font-medium text-gray-900">{singlePackage.residencyAddress}</div>
              </div>
            </div>
          </div>

          {/* Specified Commissioned Hours */}
          <div className="px-6 pb-6 mb-6">
            <h3 className="text-base font-medium text-gray-900 mb-4">Specified commissioned hours</h3>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Hour Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Hours Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Carer Ratio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Applied When
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Hour Banking
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {singlePackage.specifiedHours.map((hour, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{hour.hourType}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{hour.hoursAmount}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{hour.carerRatio}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{hour.appliedWhen}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{hour.hourBanking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shared Commissioned Hours */}
          <div className="px-6 pb-6 mb-6">
            <h3 className="text-base font-medium text-gray-900 mb-4">Shared commissioned hours</h3>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Hour Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Hours Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Carer Ratio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Applied When
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                      Hour Banking
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {singlePackage.sharedHours.map((hour, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{hour.hourType}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{hour.hoursAmount}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{hour.carerRatio}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{hour.appliedWhen}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{hour.hourBanking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-500 space-y-1">
              <p>Created by: {singlePackage.createdBy} on {singlePackage.createdAt}</p>
              {singlePackage.reasonForChange && <p>Reason for change: {singlePackage.reasonForChange}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Multiple packages view - show table
  return (
    <div className="bg-white rounded border border-gray-200" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
      {/* Section Header */}
      <div className="py-6 flex items-center justify-between border-b border-gray-200">
        <p className="text-sm text-gray-700 px-6">Add a new care package to make changes to the care details and commissioned hours</p>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 px-4 py-2 text-emerald-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium shadow-sm mr-6"
        >
          <PlusIcon />
          Add new
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
                Care Package Name
              </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              Status
            </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              Effective Date
            </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              End Date
            </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              Package Code
            </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              Primary Service
            </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              Residency Address
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {pws.carePackages.map((pkg) => (
            <tr
              key={pkg.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onViewPackage(pkg)}
            >
              <td className="px-6 py-4 text-sm text-gray-900">{pkg.name}</td>
              <td className="px-6 py-4">
                <StatusBadge status={pkg.status} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{pkg.effectiveDate}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{pkg.endDate}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{pkg.packageCode}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{pkg.primaryService}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{pkg.residencyAddress}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

// Care Package Detail View
const CarePackageDetail = ({
  pkg,
  onBack,
}: {
  pkg: CarePackage;
  onBack: () => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Back Link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
      >
        <ChevronLeftIcon />
        Back to care packages
      </button>

      {/* Main Card */}
      <div className="bg-white rounded border border-gray-200" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
        {/* Package Header */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">{pkg.name}</h2>
            <StatusBadge status={pkg.status} />
          </div>
        </div>

        {/* Summary of Changes (for Pending packages) */}
        {pkg.status === 'Pending' && pkg.summaryOfChanges && (
          <div className="px-6 mb-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-amber-800 mb-1">Summary of changes</h4>
              <p className="text-sm text-amber-700">{pkg.summaryOfChanges}</p>
            </div>
          </div>
        )}

        {/* Package Details Grid */}
        <div className="px-6 pb-6 mb-6 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-6">
          <div>
            <div className="text-xs text-gray-500 mb-1">Effective date</div>
            <div className="text-sm font-medium text-gray-900">{pkg.effectiveDate}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">End date</div>
            <div className="text-sm font-medium text-gray-900">{pkg.endDate}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Package code</div>
            <div className="text-sm font-medium text-gray-900">{pkg.packageCode}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Primary service</div>
            <div className="text-sm font-medium text-emerald-600">{pkg.primaryService}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Residency address</div>
            <div className="text-sm font-medium text-gray-900">{pkg.residencyAddress}</div>
          </div>
          </div>
        </div>

        {/* Specified Commissioned Hours */}
        <div className="px-6 pb-6 mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Specified commissioned hours</h3>
          <div className="overflow-x-auto border border-gray-200 rounded">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Hour Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Hours Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Carer Ratio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Applied When
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Hour Banking
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pkg.specifiedHours.map((hour, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{hour.hourType}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hour.hoursAmount}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hour.carerRatio}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hour.appliedWhen}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hour.hourBanking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shared Commissioned Hours */}
        <div className="px-6 pb-6 mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Shared commissioned hours</h3>
          <div className="overflow-x-auto border border-gray-200 rounded">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Hour Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Hours Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Carer Ratio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Applied When
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Hour Banking
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pkg.sharedHours.map((hour, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{hour.hourType}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hour.hoursAmount}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hour.carerRatio}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hour.appliedWhen}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{hour.hourBanking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500 space-y-1">
            <p>Created by: {pkg.createdBy} on {pkg.createdAt}</p>
            {pkg.reasonForChange && <p>Reason for change: {pkg.reasonForChange}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule Tab Component (removed - tab is hidden)
// @ts-ignore - unused component
const ScheduleTab_UNUSED = ({ pws }: { pws: PWS }) => {
  const [dateRange] = useState('Jan 5 - Jan 11');

  const days = ['Mon 6', 'Tue 7', 'Wed 8', 'Thu 9', 'Fri 10', 'Sat 11', 'Sun 12'];
  const shiftsByDay = pws.weeklyShifts?.reduce((acc, shift) => {
    if (!acc[shift.day]) acc[shift.day] = [];
    acc[shift.day].push(shift);
    return acc;
  }, {} as Record<string, Shift[]>) || {};

  return (
    <div className="bg-white rounded border border-gray-200" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
      {/* Section Header */}
      <div className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-medium text-gray-900">This week's shifts</h3>
          <button 
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded text-sm"
          >
            {dateRange}
            <Icon name="Calendar" size="sm" />
          </button>
        </div>
        <button 
          onClick={() => {
            // Handle view in roster
          }}
          className="flex items-center gap-1 px-4 py-2 bg-white hover:bg-slate-50 text-emerald-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
        >
          View in roster
          <ChevronRightIcon />
        </button>
      </div>

      {/* Weekly Schedule */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded overflow-hidden">
          {days.map((day) => {
            const isToday = day === 'Thu 9';
            const dayShifts = shiftsByDay[day] || [];
            
            return (
              <div 
                key={day} 
                className={`flex flex-col gap-3 p-3 border-r border-gray-200 last:border-r-0 ${isToday ? 'bg-blue-50' : ''}`}
              >
                {/* Day Header */}
                <div className="text-center mb-2 min-h-[30px] flex items-center justify-center">
                  {isToday ? (
                    <span className="text-sm font-semibold text-white bg-indigo-600 px-4 py-1 rounded-full">
                      {day}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-gray-900">{day}</span>
                  )}
                </div>

                {/* Shift Blocks */}
                <div className="flex flex-col gap-3">
                  {dayShifts.map((shift) => (
                    <div
                      key={shift.id}
                      className={`rounded-md p-2 flex flex-col gap-1 ${
                        shift.isCompliant
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border-2 border-red-600 text-blue-600'
                      }`}
                    >
                      {/* Shift Header */}
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <div className={`text-xs font-semibold ${shift.isCompliant ? 'text-white' : 'text-blue-600'}`}>
                            {shift.startTime}-{shift.endTime}
                          </div>
                          <div className={`text-[11px] ${shift.isCompliant ? 'text-white' : 'text-blue-600'}`}>
                            {shift.duration}
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 ${shift.isCompliant ? 'text-white' : 'text-red-600'}`}>
                          {shift.isCompliant ? (
                            <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center">
                              <CheckIcon size="sm" className="text-white" />
                            </div>
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full bg-red-600 flex items-center justify-center text-white">
                              <XIcon size="sm" className="text-white" />
                            </div>
                          )}
                          {shift.careType.includes('Shared') && (
                            <Icon name="Users" size="sm" />
                          )}
                        </div>
                      </div>

                      {/* Care Type */}
                      <div className={`text-[11px] font-medium ${shift.isCompliant ? 'text-white' : 'text-blue-600'}`}>
                        {shift.careType}
                      </div>

                      {/* Employee */}
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          shift.isCompliant ? 'bg-white/20' : 'bg-gray-200'
                        }`}>
                          <Icon name="User" size="sm" className={shift.isCompliant ? 'text-white' : 'text-gray-500'} />
                        </div>
                        <div className={`text-[10px] ${shift.isCompliant ? 'text-white' : 'text-blue-600'}`}>
                          {shift.employeeName}
                        </div>
                      </div>

                      {/* Non-compliant label */}
                      {!shift.isCompliant && (
                        <div className="text-[10px] text-red-600 font-medium mt-1">
                          Non-compliant
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */

// Occupancy Tab Component
const OccupancyTab = ({ 
  pws, 
  onLogOutOfService, 
  onLogBackInService 
}: { 
  pws: PWS;
  onLogOutOfService: () => void;
  onLogBackInService: () => void;
}) => {
  return (
    <div className="bg-white rounded border border-gray-200" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.04)' }}>
      {/* Section Header */}
      <div className="py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="px-6">
            <p className="text-sm text-gray-700">Current status: {pws.status}</p>
            {pws.status === 'Out of service' && pws.expectedReturn && (
              <p className="text-xs text-gray-500 mt-0.5">
                Expected back: {pws.expectedReturn}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              if (pws.status === 'In service') {
                onLogOutOfService();
              } else {
                onLogBackInService();
              }
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm mr-6 ${
              pws.status === 'In service'
                ? 'text-emerald-700 bg-white border border-gray-200 hover:bg-gray-50'
                : 'bg-red-600 text-white hover:bg-red-700 border border-red-600'
            }`}
          >
            {pws.status === 'In service' ? 'Log out of service' : 'Log back in service'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
                Out of Service Date
              </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              Expected Return Date
            </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              Reason
            </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              Impact on Total Commissioned Hours (Between Selected Dates)
            </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              Notes
            </th>
            <th className="px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ paddingTop: '11px', paddingBottom: '12px' }}>
              Hour Distribution
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {pws.outOfServiceRecords.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-900">{record.outOfServiceDate}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{record.expectedReturnDate}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{record.reason}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{record.impactOnHours}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{record.notes}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{record.hourDistribution}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

// Out of Service Modal Component
const OutOfServiceModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<OutOfServiceRecord>) => void;
}) => {
  const [formData, setFormData] = useState({
    fromDate: '',
    fromTime: '12:00',
    toDate: '',
    toTime: '12:00',
    reason: 'Hospital' as OutOfServiceRecord['reason'],
    notes: '',
    reduceHours: true,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Out of service records</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Date range</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">From</div>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <input
                    type="time"
                    value={formData.fromTime}
                    onChange={(e) => setFormData({ ...formData, fromTime: e.target.value })}
                    className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Expected return</div>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={formData.toDate}
                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <input
                    type="time"
                    value={formData.toTime}
                    onChange={(e) => setFormData({ ...formData, toTime: e.target.value })}
                    className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Reason</label>
              <div className="text-xs text-gray-500 mb-2">Select reason</div>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value as OutOfServiceRecord['reason'] })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                {outOfServiceReasons.map((reason) => (
                  <option key={reason.value} value={reason.value}>
                    {reason.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Additional notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Medical check up"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-20 resize-none"
              />
            </div>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFormData({ ...formData, reduceHours: !formData.reduceHours })}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                formData.reduceHours ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  formData.reduceHours ? 'translate-x-5' : ''
                }`}
              />
            </button>
            <span className="text-sm text-gray-700">Reduce commissioned hours demand for this PWS</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Format dates properly
              const formatDateTime = (dateStr: string, timeStr: string): string => {
                if (!dateStr || !timeStr) return '';
                const [year, month, day] = dateStr.split('-');
                if (!year || !month || !day) return '';
                const formattedDate = `${day}/${month}/${year}`;
                const [hours, minutes] = timeStr.split(':');
                if (!hours || !minutes) return '';
                const hour24 = parseInt(hours, 10);
                const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
                const ampm = hour24 >= 12 ? 'PM' : 'AM';
                const formattedTime = `${hour12}:${minutes} ${ampm}`;
                return `${formattedDate} @ ${formattedTime}`;
              };

              const outOfServiceDate = formatDateTime(formData.fromDate, formData.fromTime);
              const expectedReturnDate = formatDateTime(formData.toDate, formData.toTime);

              // Only submit if dates are provided
              if (!outOfServiceDate || !expectedReturnDate) {
                alert('Please fill in all date and time fields');
                return;
              }

              onSubmit({
                outOfServiceDate,
                expectedReturnDate,
                reason: formData.reason,
                notes: formData.notes || '--',
                hourDistribution: 'Auto',
                impactOnHours: -10,
              });
              onClose();
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

// Reason for Change Modal
const ReasonForChangeModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Reason for change in care package</h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="This is the reason"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-24 resize-none"
          />
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
            Warning message to say that the new care package will be activated at the start of the following week and any changes will override existing
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(reason);
              onClose();
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium"
          >
            Create care package
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Care Package Wizard Component
const AddCarePackageWizard = ({
  pwsName,
  onClose,
  onComplete,
}: {
  pwsName: string;
  onClose: () => void;
  onComplete: (data: Partial<CarePackage>) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    packageCode: 'basic-1',
    startDate: '',
    endDate: 'Ongoing',
    primaryService: 'Maple house',
    useServiceAddress: true,
    address: {
      line1: '45 Maple Grove',
      line2: 'Thornbury Estate',
      line3: '',
      line4: '',
      city: 'Bristol',
      postcode: 'BS15 3QR',
      longitude: '-2.5879',
      latitude: '51.4545',
    },
    specifiedHours: [
      { hourType: 'Advance care', hoursAmount: '50', carerRatio: '1:1', appliedWhen: 'All times', hourBanking: true },
    ] as Array<{
      hourType: string;
      hoursAmount: string;
      carerRatio: string;
      appliedWhen: string;
      hourBanking: boolean;
    }>,
    sharedHours: [
      { hourType: 'Shared support AM', hoursAmount: '50', carerRatio: '1:6', appliedWhen: 'Day', hourBanking: true },
      { hourType: 'Shared support PM', hoursAmount: '50', carerRatio: '1:6', appliedWhen: 'Night', hourBanking: false },
    ] as Array<{
      hourType: string;
      hoursAmount: string;
      carerRatio: string;
      appliedWhen: string;
      hourBanking: boolean;
    }>,
  });

  const steps = [
    { number: 1, label: 'Package details' },
    { number: 2, label: 'Occupancy' },
    { number: 3, label: 'Location details' },
    { number: 4, label: 'Commissioned hours' },
  ];

  const [validationError, setValidationError] = useState('');

  const handleNext = () => {
    if (currentStep === 1 && !formData.title) {
      setValidationError('You must create a new care package title to continue');
      return;
    }
    setValidationError('');
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowReasonModal(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addSpecifiedHour = () => {
    setFormData({
      ...formData,
      specifiedHours: [
        ...formData.specifiedHours,
        { hourType: 'Advance care', hoursAmount: '', carerRatio: '1:1', appliedWhen: 'All times', hourBanking: false },
      ],
    });
  };

  const removeSpecifiedHour = (index: number) => {
    setFormData({
      ...formData,
      specifiedHours: formData.specifiedHours.filter((_, i) => i !== index),
    });
  };

  const addSharedHour = () => {
    setFormData({
      ...formData,
      sharedHours: [
        ...formData.sharedHours,
        { hourType: 'Shared care day', hoursAmount: '', carerRatio: '1:6', appliedWhen: 'Day', hourBanking: false },
      ],
    });
  };

  const removeSharedHour = (index: number) => {
    setFormData({
      ...formData,
      sharedHours: formData.sharedHours.filter((_, i) => i !== index),
    });
  };

  const handleReasonSubmit = (reason: string) => {
    onComplete({
      name: formData.title,
      status: 'Pending',
      effectiveDate: formData.startDate,
      endDate: formData.endDate,
      packageCode: generatePackageCode(),
      primaryService: formData.primaryService,
      residencyAddress: formData.primaryService,
      specifiedHours: formData.specifiedHours.map((h) => ({
        hourType: h.hourType,
        hoursAmount: `${h.hoursAmount} hrs`,
        carerRatio: h.carerRatio,
        appliedWhen: h.appliedWhen,
        hourBanking: h.hourBanking ? 'Enabled' : 'Disabled',
      })) as CommissionedHour[],
      sharedHours: formData.sharedHours.map((h) => ({
        hourType: h.hourType,
        hoursAmount: `${h.hoursAmount} hrs`,
        carerRatio: h.carerRatio,
        appliedWhen: h.appliedWhen,
        hourBanking: h.hourBanking ? 'Enabled' : 'Disabled',
      })) as CommissionedHour[],
      reasonForChange: reason,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Add new care package</h1>
        <p className="text-sm text-gray-500 mt-1">{pwsName}</p>
      </div>

      {/* Step Indicator */}
      <div className="px-6 mb-8">
        <div className="flex items-center">
          {steps.map((step) => (
            <div key={step.number} className="flex-1">
              <div className="flex items-center">
                <div className="flex flex-col items-start w-full">
                  <div
                    className={`h-0.5 w-full mb-2 ${
                      currentStep >= step.number ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  />
                  <div className="text-xs text-gray-500">Step {step.number}</div>
                  <div
                    className={`text-sm font-medium ${
                      currentStep === step.number ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="mx-6 mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
        <InformationCircleIcon size="md" />
        <span className="text-sm text-blue-700">
          Current active care package details have been pre-filled below. Review and update any fields as needed.
        </span>
      </div>

      {/* Step Content */}
      <div className="px-6">
        {/* Step 1: Package Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (e.target.value) setValidationError('');
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="Care package name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Package code <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.packageCode}
                  onChange={(e) => setFormData({ ...formData, packageCode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  {packageCodes.map((code) => (
                    <option key={code.value} value={code.value}>
                      {code.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {validationError && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
                <ExclamationTriangleIcon className="text-amber-500" size="md" />
                <span className="text-sm text-amber-700">{validationError}</span>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Occupancy */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Start date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">End date</label>
                <input
                  type="text"
                  value={formData.endDate}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Primary service <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.primaryService}
                onChange={(e) => setFormData({ ...formData, primaryService: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">Residency address details</h3>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={formData.useServiceAddress}
                  onChange={(e) => setFormData({ ...formData, useServiceAddress: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span className="text-sm text-gray-700">Use the primary service address as residency address</span>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Address line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address.line1}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, line1: e.target.value } })
                    }
                    disabled={formData.useServiceAddress}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Address line 2</label>
                  <input
                    type="text"
                    value={formData.address.line2}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, line2: e.target.value } })
                    }
                    disabled={formData.useServiceAddress}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Address line 3</label>
                  <input
                    type="text"
                    value={formData.address.line3}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, line3: e.target.value } })
                    }
                    disabled={formData.useServiceAddress}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Address line 4</label>
                  <input
                    type="text"
                    value={formData.address.line4}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, line4: e.target.value } })
                    }
                    disabled={formData.useServiceAddress}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })
                    }
                    disabled={formData.useServiceAddress}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Postcode</label>
                  <input
                    type="text"
                    value={formData.address.postcode}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, postcode: e.target.value } })
                    }
                    disabled={formData.useServiceAddress}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Longitude</label>
                  <input
                    type="text"
                    value={formData.address.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, longitude: e.target.value } })
                    }
                    disabled={formData.useServiceAddress}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Latitude</label>
                  <input
                    type="text"
                    value={formData.address.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, latitude: e.target.value } })
                    }
                    disabled={formData.useServiceAddress}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Commissioned Hours */}
        {currentStep === 4 && (
          <div className="space-y-8">
            {/* Specified Commissioned Hours */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Specified commissioned hours <span className="text-red-500">*</span>
              </h3>
              <div className="space-y-2">
                <div className="grid grid-cols-6 gap-4 text-xs font-semibold text-gray-500 uppercase">
                  <div>Hour type</div>
                  <div>Hours amount</div>
                  <div>Carer ratio</div>
                  <div>Applied when</div>
                  <div>Shared hour banking</div>
                  <div></div>
                </div>
                {formData.specifiedHours.map((hour, index) => (
                  <div key={index} className="grid grid-cols-6 gap-4 items-center">
                    <select
                      value={hour.hourType}
                      onChange={(e) => {
                        const newHours = [...formData.specifiedHours];
                        newHours[index].hourType = e.target.value;
                        setFormData({ ...formData, specifiedHours: newHours });
                      }}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      {specifiedHourTypes.map((type) => (
                        <option key={type.value} value={type.label}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={hour.hoursAmount}
                      onChange={(e) => {
                        const newHours = [...formData.specifiedHours];
                        newHours[index].hoursAmount = e.target.value;
                        setFormData({ ...formData, specifiedHours: newHours });
                      }}
                      placeholder="50 hrs"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                    <select
                      value={hour.carerRatio}
                      onChange={(e) => {
                        const newHours = [...formData.specifiedHours];
                        newHours[index].carerRatio = e.target.value;
                        setFormData({ ...formData, specifiedHours: newHours });
                      }}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      {carerRatios.map((ratio) => (
                        <option key={ratio.value} value={ratio.value}>
                          {ratio.label}
                        </option>
                      ))}
                    </select>
                    <select
                      value={hour.appliedWhen}
                      onChange={(e) => {
                        const newHours = [...formData.specifiedHours];
                        newHours[index].appliedWhen = e.target.value;
                        setFormData({ ...formData, specifiedHours: newHours });
                      }}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      {appliedWhenOptions.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        const newHours = [...formData.specifiedHours];
                        newHours[index].hourBanking = !newHours[index].hourBanking;
                        setFormData({ ...formData, specifiedHours: newHours });
                      }}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        hour.hourBanking ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          hour.hourBanking ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => removeSpecifiedHour(index)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addSpecifiedHour}
                className="mt-3 flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
              >
                <PlusIcon />
                Add new
              </button>
            </div>

            {/* Shared Commissioned Hours */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Shared commissioned hours <span className="text-red-500">*</span>
              </h3>
              <div className="space-y-2">
                <div className="grid grid-cols-6 gap-4 text-xs font-semibold text-gray-500 uppercase">
                  <div>Hour type</div>
                  <div>Hours amount</div>
                  <div>Carer ratio</div>
                  <div>Applied when</div>
                  <div>Shared hour banking</div>
                  <div></div>
                </div>
                {formData.sharedHours.map((hour, index) => (
                  <div key={index} className="grid grid-cols-6 gap-4 items-center">
                    <select
                      value={hour.hourType}
                      onChange={(e) => {
                        const newHours = [...formData.sharedHours];
                        newHours[index].hourType = e.target.value;
                        setFormData({ ...formData, sharedHours: newHours });
                      }}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      {sharedHourTypes.map((type) => (
                        <option key={type.value} value={type.label}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={hour.hoursAmount}
                      onChange={(e) => {
                        const newHours = [...formData.sharedHours];
                        newHours[index].hoursAmount = e.target.value;
                        setFormData({ ...formData, sharedHours: newHours });
                      }}
                      placeholder="50 hrs"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                    <select
                      value={hour.carerRatio}
                      onChange={(e) => {
                        const newHours = [...formData.sharedHours];
                        newHours[index].carerRatio = e.target.value;
                        setFormData({ ...formData, sharedHours: newHours });
                      }}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      {carerRatios.map((ratio) => (
                        <option key={ratio.value} value={ratio.value}>
                          {ratio.label}
                        </option>
                      ))}
                    </select>
                    <select
                      value={hour.appliedWhen}
                      onChange={(e) => {
                        const newHours = [...formData.sharedHours];
                        newHours[index].appliedWhen = e.target.value;
                        setFormData({ ...formData, sharedHours: newHours });
                      }}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      {appliedWhenOptions.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        const newHours = [...formData.sharedHours];
                        newHours[index].hourBanking = !newHours[index].hourBanking;
                        setFormData({ ...formData, sharedHours: newHours });
                      }}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        hour.hourBanking ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          hour.hourBanking ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                    <button onClick={() => removeSharedHour(index)} className="p-2 text-gray-400 hover:text-red-500">
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addSharedHour}
                className="mt-3 flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
              >
                <PlusIcon />
                Add new
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8">
        <div className="px-6">
          <div className="border-t border-gray-200"></div>
        </div>
        <div className="px-6 py-6 flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                <ChevronLeftIcon />
                Back
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium"
            >
              {currentStep === 4 ? 'Create care package' : 'Continue'}
              {currentStep < 4 && <ChevronRightIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Reason Modal */}
      <ReasonForChangeModal
        isOpen={showReasonModal}
        onClose={() => setShowReasonModal(false)}
        onSubmit={handleReasonSubmit}
      />
    </div>
  );
};

// Main PWS Config Component
export const PWSConfig = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'care-package' | 'occupancy'>('overview');
  const [pws, setPws] = useState<PWS>(mockPWS);
  const [selectedPackage, setSelectedPackage] = useState<CarePackage | null>(null);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [showOutOfServiceModal, setShowOutOfServiceModal] = useState(false);

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'care-package' as const, label: 'Care package' },
    { id: 'occupancy' as const, label: 'Occupancy' },
  ];

  const handleAddPackage = (data: Partial<CarePackage>) => {
    const newPackage: CarePackage = {
      id: `cp-${Date.now()}`,
      name: data.name || 'New Care Package',
      status: 'Pending',
      effectiveDate: data.effectiveDate || new Date().toLocaleDateString('en-GB'),
      endDate: data.endDate || 'Ongoing',
      packageCode: data.packageCode || generatePackageCode(),
      primaryService: data.primaryService || 'Maple house',
      residencyAddress: data.residencyAddress || 'Maple house',
      specifiedHours: data.specifiedHours || [],
      sharedHours: data.sharedHours || [],
      createdBy: 'Current User',
      createdAt: new Date().toLocaleString('en-GB'),
      reasonForChange: data.reasonForChange,
      summaryOfChanges: '1:1 care hours increase from 24 to 36 as Alice needs extra care after hospital visit',
    };

    setPws({
      ...pws,
      carePackages: [newPackage, ...pws.carePackages],
    });
    setShowAddPackage(false);
  };

  const handleOutOfServiceSubmit = (data: Partial<OutOfServiceRecord>) => {
    // Ensure dates are provided
    if (!data.outOfServiceDate || !data.expectedReturnDate) {
      console.error('Out of service dates are required');
      return;
    }

    const newRecord: OutOfServiceRecord = {
      id: `oos-${Date.now()}`,
      outOfServiceDate: data.outOfServiceDate,
      expectedReturnDate: data.expectedReturnDate,
      reason: data.reason || 'Other',
      impactOnHours: data.impactOnHours || -10,
      notes: data.notes || '--',
      hourDistribution: data.hourDistribution || 'Auto',
    };

    setPws({
      ...pws,
      status: 'Out of service',
      expectedReturn: data.expectedReturnDate,
      outOfServiceRecords: [newRecord, ...pws.outOfServiceRecords],
    });
  };

  const handleLogBackInService = () => {
    setPws({
      ...pws,
      status: 'In service',
      expectedReturn: undefined,
    });
  };

  // Show Add Package Wizard
  if (showAddPackage) {
    return (
      <div className="flex h-screen" style={{ backgroundColor: '#F8FAFC' }}>
        <Sidebar />
        <main className="flex-1 ml-[280px] overflow-y-auto">
          <AddCarePackageWizard
            pwsName={pws.name}
            onClose={() => setShowAddPackage(false)}
            onComplete={handleAddPackage}
          />
        </main>
      </div>
    );
  }

  // Show Package Detail
  if (selectedPackage) {
    return (
      <div className="flex h-screen" style={{ backgroundColor: '#F8FAFC' }}>
        <Sidebar />
        <main className="flex-1 ml-[280px] overflow-y-auto">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white">
            {/* Main Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              {/* Breadcrumb */}
              <div className="text-sm text-emerald-600 mb-2">
                All people we support /
              </div>

              {/* PWS Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold text-gray-900">{pws.name}</h1>
                  <StatusBadge status={pws.status} />
                </div>
                <button className="px-4 py-2 text-emerald-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium shadow-sm">
                  Edit profile
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSelectedPackage(null);
                    }}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-emerald-600 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

          </div>

          {/* Content */}
          <div className="p-6">
            <CarePackageDetail pkg={selectedPackage} onBack={() => setSelectedPackage(null)} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <Sidebar />
      <main className="flex-1 ml-[280px] overflow-y-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white">
          {/* Main Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            {/* Breadcrumb */}
            <div className="text-sm text-emerald-600 mb-2">
              All people we support /
            </div>

            {/* PWS Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-900">{pws.name}</h1>
                <StatusBadge status={pws.status} />
              </div>
              <button className="px-4 py-2 text-emerald-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium shadow-sm">
                Edit profile
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-600 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab pws={pws} />}
          {activeTab === 'care-package' && (
            <CarePackageTab
              pws={pws}
              onViewPackage={setSelectedPackage}
              onAddNew={() => setShowAddPackage(true)}
            />
          )}
          {activeTab === 'occupancy' && (
            <OccupancyTab 
              pws={pws}
              onLogOutOfService={() => setShowOutOfServiceModal(true)}
              onLogBackInService={handleLogBackInService}
            />
          )}
        </div>

        {/* Out of Service Modal */}
        <OutOfServiceModal
          isOpen={showOutOfServiceModal}
          onClose={() => setShowOutOfServiceModal(false)}
          onSubmit={handleOutOfServiceSubmit}
        />
      </main>
    </div>
  );
};

export default PWSConfig;
