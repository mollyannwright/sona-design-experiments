/**
 * Compliance Dashboard - Low Fidelity Wireframe Prototype
 * 
 * A simplified wireframe version focusing on layout, hierarchy, and component placement.
 * Follows low-fidelity guidelines:
 * - Only grey-scale (no colors)
 * - Chalkboard font for sketchy feel
 * - Squiggle lines for text blocks
 */

import { useState } from 'react';
import { SonaLayout } from '../../src/components/shared/SonaLayout';

type TabType = 'right-to-work' | 'policies';

export function ComplianceDashboardLowFi() {
  const [activeTab, setActiveTab] = useState<TabType>('right-to-work');

  const navigation = [
    {
      title: 'Business Wide',
      items: [
        { label: 'Home', path: '/', icon: 'Home' },
        { label: 'Compliance', path: '/compliance-low-fi', icon: 'Document', badge: 5 },
      ],
    },
  ];

  return (
    <SonaLayout
      navigation={navigation}
      showHeader={false}
    >
      <div className="flex flex-col h-full bg-gray-50 -m-6">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white">
          {/* Main Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 font-[Chalkboard]">Compliance dashboard</h1>
                <p className="text-sm text-gray-500 mt-1 font-[Chalkboard]">Monitor employee right to work and policy acknowledgements</p>
              </div>
              <div className="px-4 py-2 bg-slate-100 border border-slate-300 rounded text-slate-400 text-sm font-[Chalkboard]">
                Export report
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px px-6">
              <button
                onClick={() => setActiveTab('right-to-work')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors font-[Chalkboard] ${
                  activeTab === 'right-to-work'
                    ? 'border-slate-700 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                }`}
              >
                Right to work
              </button>
              <button
                onClick={() => setActiveTab('policies')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors font-[Chalkboard] ${
                  activeTab === 'policies'
                    ? 'border-slate-700 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                }`}
              >
                Policy acknowledgements
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-6">
          {/* Summary Cards - Wireframe */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-5 rounded-lg border border-slate-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400 font-[Chalkboard]">
                {i === 1 && 'Right to work'}
                {i === 2 && 'Expiring soon'}
                {i === 3 && 'Action required'}
                {i === 4 && 'Policy compliance'}
              </span>
              <div className="w-5 h-5 bg-slate-200 border border-slate-300 rounded"></div>
            </div>
            <div className="text-3xl font-bold text-slate-600 mb-1 font-[Chalkboard]">
              {i === 1 && '28'}
              {i === 2 && '6'}
              {i === 3 && '3'}
              {i === 4 && '87%'}
            </div>
            <div className="text-xs text-slate-400 font-[Chalkboard]">
              {i === 1 && 'of 32 compliant'}
              {i === 2 && 'documents expiring'}
              {i === 3 && 'expired or missing'}
              {i === 4 && '128 of 147 acknowledged'}
            </div>
          </div>
        ))}
          </div>

          {/* Tabs Content */}
          <div className="bg-white rounded-lg border border-slate-300">
            {/* Filters and Search */}
            <div className="px-6 py-4 border-b border-slate-300 flex items-center gap-4">
              <div className="flex-1 h-10 bg-slate-100 border border-slate-300 rounded px-4 flex items-center text-slate-400 text-sm font-[Chalkboard]">
                Search employees, departments, or policies...
              </div>
              <div className="px-4 py-2 bg-slate-100 border border-slate-300 rounded text-slate-400 text-sm font-[Chalkboard]">
                All statuses
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'right-to-work' && <RightToWorkWireframe />}
              {activeTab === 'policies' && <PoliciesWireframe />}
            </div>
          </div>
        </div>
      </div>
    </SonaLayout>
  );
}

// ==============================================
// RIGHT TO WORK TAB - Wireframe
// ==============================================

function RightToWorkWireframe() {
  return (
    <div>
      {/* Table Structure */}
      <div className="bg-white border border-slate-300 rounded overflow-hidden">
        {/* Table Header */}
        <div className="bg-slate-100 border-b border-slate-300 px-6 py-3 flex gap-6">
          <div className="w-48 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Employee</div>
          <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Department</div>
          <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Role</div>
          <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Status</div>
          <div className="w-40 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Documents</div>
          <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Last verified</div>
          <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Next review</div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border-b border-slate-200 px-6 py-4 flex gap-6 items-center">
            <div className="w-48">
              <div className="text-sm font-medium text-slate-600 font-[Chalkboard] mb-1">
                {i === 1 && 'Sarah Johnson'}
                {i === 2 && 'Michael Chen'}
                {i === 3 && 'Emma Wilson'}
                {i === 4 && 'David Thompson'}
                {i === 5 && 'Lisa Anderson'}
                {i === 6 && 'James Brown'}
              </div>
              <div className="text-xs text-slate-400 font-[Chalkboard]">EMP00{i}</div>
            </div>
            <div className="w-32 text-sm text-slate-600 font-[Chalkboard]">
              {i === 1 && 'Care Team'}
              {i === 2 && 'Care Team'}
              {i === 3 && 'Nursing'}
              {i === 4 && 'Care Team'}
              {i === 5 && 'Admin'}
              {i === 6 && 'Care Team'}
            </div>
            <div className="w-32 text-sm text-slate-600 font-[Chalkboard]">
              {i === 1 && 'Care Assistant'}
              {i === 2 && 'Senior Carer'}
              {i === 3 && 'Registered Nurse'}
              {i === 4 && 'Care Assistant'}
              {i === 5 && 'Administrator'}
              {i === 6 && 'Care Assistant'}
            </div>
            <div className="w-32">
              <div className={`px-2 py-1 text-xs font-medium rounded-full border font-[Chalkboard] ${
                i <= 3 ? 'text-slate-600 bg-slate-100 border-slate-300' : 'text-slate-400 bg-slate-50 border-slate-200'
              }`}>
                {i <= 3 ? 'Compliant' : i === 4 ? 'Expiring soon' : 'Action required'}
              </div>
            </div>
            <div className="w-40">
              <div className="text-xs text-slate-600 font-[Chalkboard] mb-1">
                {i <= 3 ? 'Passport' : i === 4 ? 'Visa' : 'No documents'}
              </div>
              {i <= 4 && (
                <div className="text-xs text-slate-400 font-[Chalkboard]">
                  expires {i === 1 ? '15 Jun 2028' : i === 2 ? '20 Mar 2024' : i === 3 ? '30 Nov 2025' : '01 Dec 2023'}
                </div>
              )}
            </div>
            <div className="w-32 text-sm text-slate-600 font-[Chalkboard]">
              {i <= 3 ? '12 Jan 2023' : i === 4 ? '08 Dec 2020' : '—'}
            </div>
            <div className="w-32 text-sm text-slate-600 font-[Chalkboard]">
              {i <= 3 ? '12 Jan 2024' : '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==============================================
// POLICIES TAB - Wireframe
// ==============================================

function PoliciesWireframe() {
  return (
    <div className="space-y-6">
      {/* Employee Compliance Table */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900 font-[Chalkboard]">Employee compliance</h2>
        </div>
        <div className="bg-white border border-slate-300 rounded overflow-hidden">
          {/* Table Header */}
          <div className="bg-slate-100 border-b border-slate-300 px-6 py-3 flex gap-6">
            <div className="w-48 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Employee</div>
            <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Department</div>
            <div className="w-40 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Compliance rate</div>
            <div className="w-40 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Policies acknowledged</div>
            <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Pending</div>
            <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Last updated</div>
          </div>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border-b border-slate-200 px-6 py-4 flex gap-6 items-center">
              <div className="w-48">
                <div className="text-sm font-medium text-slate-600 font-[Chalkboard] mb-1">
                  {i === 1 && 'Sarah Johnson'}
                  {i === 2 && 'Michael Chen'}
                  {i === 3 && 'Emma Wilson'}
                  {i === 4 && 'David Thompson'}
                  {i === 5 && 'Lisa Anderson'}
                  {i === 6 && 'James Brown'}
                </div>
                <div className="text-xs text-slate-400 font-[Chalkboard]">EMP00{i}</div>
              </div>
              <div className="w-32 text-sm text-slate-600 font-[Chalkboard]">
                {i === 1 && 'Care Team'}
                {i === 2 && 'Care Team'}
                {i === 3 && 'Nursing'}
                {i === 4 && 'Care Team'}
                {i === 5 && 'Admin'}
                {i === 6 && 'Care Team'}
              </div>
              <div className="w-40 flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                  <div
                    className={`h-2 rounded-full ${
                      i <= 3 ? 'bg-slate-400' : i === 4 ? 'bg-slate-300' : 'bg-slate-200'
                    }`}
                    style={{ width: `${i <= 3 ? 100 : i === 4 ? 75 : 50}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-600 font-[Chalkboard]">
                  {i <= 3 ? '100%' : i === 4 ? '75%' : '50%'}
                </span>
              </div>
              <div className="w-40 text-sm text-slate-600 font-[Chalkboard]">
                {i <= 3 ? '4 / 4' : i === 4 ? '3 / 4' : '2 / 4'}
              </div>
              <div className="w-32">
                {i > 3 && (
                  <div className="px-2 py-1 text-xs font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-full font-[Chalkboard]">
                    {i === 4 ? '1 pending' : '2 pending'}
                  </div>
                )}
                {i <= 3 && <span className="text-sm text-slate-400 font-[Chalkboard]">—</span>}
              </div>
              <div className="w-32 text-sm text-slate-600 font-[Chalkboard]">
                {i <= 3 ? '21 Nov 2023' : i === 4 ? '30 Sep 2023' : '26 Sep 2023'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Details Table */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900 font-[Chalkboard]">Policy details</h2>
        </div>
        <div className="bg-white border border-slate-300 rounded overflow-hidden">
          {/* Table Header */}
          <div className="bg-slate-100 border-b border-slate-300 px-6 py-3 flex gap-6">
            <div className="w-48 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Employee</div>
            <div className="w-64 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Policy</div>
            <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Version</div>
            <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Status</div>
            <div className="w-40 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Acknowledged date</div>
            <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Expiry date</div>
          </div>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border-b border-slate-200 px-6 py-4 flex gap-6 items-center">
              <div className="w-48">
                <div className="text-sm font-medium text-slate-600 font-[Chalkboard] mb-1">
                  {i === 1 && 'Sarah Johnson'}
                  {i === 2 && 'Michael Chen'}
                  {i === 3 && 'Emma Wilson'}
                  {i === 4 && 'David Thompson'}
                  {i === 5 && 'Lisa Anderson'}
                </div>
                <div className="text-xs text-slate-400 font-[Chalkboard]">
                  {i === 1 && 'Care Team'}
                  {i === 2 && 'Care Team'}
                  {i === 3 && 'Nursing'}
                  {i === 4 && 'Care Team'}
                  {i === 5 && 'Admin'}
                </div>
              </div>
              <div className="w-64 text-sm text-slate-600 font-[Chalkboard]">
                {i === 1 && 'Health and Safety Policy'}
                {i === 2 && 'Data Protection and GDPR Policy'}
                {i === 3 && 'Code of Conduct'}
                {i === 4 && 'Safeguarding Adults Policy'}
                {i === 5 && 'Health and Safety Policy'}
              </div>
              <div className="w-32 text-sm text-slate-600 font-[Chalkboard]">
                {i === 1 && '3.2'}
                {i === 2 && '2.1'}
                {i === 3 && '1.5'}
                {i === 4 && '4.0'}
                {i === 5 && '3.2'}
              </div>
              <div className="w-32">
                <div className={`px-2 py-1 text-xs font-medium rounded-full border font-[Chalkboard] ${
                  i <= 3 ? 'text-slate-600 bg-slate-100 border-slate-300' : 'text-slate-400 bg-slate-50 border-slate-200'
                }`}>
                  {i <= 3 ? 'Acknowledged' : 'Pending'}
                </div>
              </div>
              <div className="w-40 text-sm text-slate-600 font-[Chalkboard]">
                {i <= 3 ? (i === 1 ? '16 Nov 2023' : i === 2 ? '28 Sep 2023' : '15 Jun 2023') : '—'}
              </div>
              <div className="w-32 text-sm text-slate-600 font-[Chalkboard]">
                {i === 1 ? '16 Nov 2024' : '—'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComplianceDashboardLowFi;
