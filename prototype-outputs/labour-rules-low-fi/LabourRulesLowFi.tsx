/**
 * Labour Rules - Low Fidelity Wireframe Prototype
 * 
 * A simplified wireframe version focusing on layout, hierarchy, and component placement.
 * Follows low-fidelity guidelines:
 * - Only grey-scale (no colors)
 * - Chalkboard font for sketchy feel
 * - Squiggle lines for text blocks
 */

import { useState } from 'react';
import { SonaLayout } from '../../src/components/shared/SonaLayout';

// Squiggle line component for paragraph blocks of text
// Creates wavy, hand-drawn style squiggles that look like repeated "m" or "w" shapes
function SquiggleText({ height = 16, className = '', rows = 1 }: { height?: number; className?: string; rows?: number }) {
  const totalHeight = height * rows;
  const rowHeight = height;
  const amplitude = height * 0.15; // Wave amplitude
  
  // Create multiple rows of squiggles with wavy "m" or "w" pattern
  const pathStrings = Array.from({ length: rows }, (_, i) => {
    const y = rowHeight * (i + 0.5);
    // Create wavy pattern with multiple peaks and valleys - like handwritten "m" or "w"
    // Using cubic bezier curves for smoother, more natural waves
    return `M0,${y} C4,${y - amplitude} 8,${y - amplitude} 12,${y} C16,${y + amplitude} 20,${y + amplitude} 24,${y} C28,${y - amplitude} 32,${y - amplitude} 36,${y} C40,${y + amplitude} 44,${y + amplitude} 48,${y} C52,${y - amplitude} 56,${y - amplitude} 60,${y} C64,${y + amplitude} 68,${y + amplitude} 72,${y} C76,${y - amplitude} 80,${y - amplitude} 84,${y} C88,${y + amplitude} 92,${y + amplitude} 96,${y} L100,${y}`;
  });
  
  const paths = pathStrings.join(' ');
  
  // Build SVG and encode properly
  const svgContent = `<svg width="100" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg"><path d="${paths}" stroke="#000000" stroke-width="1.2" fill="none"/></svg>`;
  const encodedSvg = encodeURIComponent(svgContent);
  
  return (
    <div
      className={className}
      style={{
        height: `${totalHeight}px`,
        backgroundImage: `url("data:image/svg+xml,${encodedSvg}")`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0 50%'
      }}
    />
  );
}

type Tab = 'attributes' | 'org-unit-attributes' | 'rulesets' | 'assignments';

export function LabourRulesLowFi() {
  const [activeTab, setActiveTab] = useState<Tab>('attributes');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'attributes', label: 'Attributes' },
    { id: 'org-unit-attributes', label: 'Org unit attributes' },
    { id: 'rulesets', label: 'Rulesets & rules' },
    { id: 'assignments', label: 'Assignments' },
  ];

  return (
    <SonaLayout
      showHeader={false}
    >
      <div className="flex flex-col h-full bg-white -m-6">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white">
          {/* Main Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 font-[Chalkboard]">Labour rules</h1>
                <p className="text-sm text-gray-500 mt-1 font-[Chalkboard]">Configure productivity rules for labour planning</p>
              </div>
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-slate-100 border border-slate-300 rounded text-slate-400 text-sm font-[Chalkboard]">
                  Download CSV
                </div>
                <div className="px-4 py-2 bg-slate-100 border border-slate-300 rounded text-slate-400 text-sm font-[Chalkboard]">
                  Upload CSV
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors font-[Chalkboard] ${
                    activeTab === tab.id
                      ? 'border-slate-700 text-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-6">
          {/* Tab Content */}
          <div className="bg-white rounded-lg border border-slate-300">
            <div className="p-6">
          {activeTab === 'attributes' && <AttributesWireframe />}
          {activeTab === 'org-unit-attributes' && <OrgUnitAttributesWireframe />}
          {activeTab === 'rulesets' && <RulesetsWireframe />}
          {activeTab === 'assignments' && <AssignmentsWireframe />}
            </div>
          </div>
        </div>
      </div>
    </SonaLayout>
  );
}

// ==============================================
// ATTRIBUTES TAB - Wireframe
// ==============================================

function AttributesWireframe() {
  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <div className="w-64 h-10 bg-slate-100 border border-slate-300 rounded px-4 flex items-center text-slate-400 text-sm font-[Chalkboard]">
            Search attributes...
          </div>
          {/* Count */}
          <div className="text-sm text-slate-400 font-[Chalkboard]">12 attributes</div>
        </div>
        {/* Add Button */}
        <div className="px-4 py-2 bg-slate-100 border border-slate-300 rounded text-slate-400 text-sm font-[Chalkboard]">
          + Add attribute
        </div>
      </div>

      {/* Table Structure */}
      <div className="bg-white border border-slate-300 rounded overflow-hidden">
        {/* Table Header */}
        <div className="bg-slate-100 border-b border-slate-300 px-6 py-3 flex gap-6">
          <div className="w-48 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Name</div>
          <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Type</div>
          <div className="w-40 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Default value</div>
          <div className="w-32 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Used by</div>
          <div className="w-24 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">Actions</div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border-b border-slate-200 px-6 py-4 flex gap-6 items-center">
            <div className="w-48">
              <code className="text-xs bg-slate-100 border border-slate-300 rounded px-2 py-1 font-mono text-slate-600 mb-1 block">
                attribute_name_{i}
              </code>
              <p className="text-xs text-slate-400 font-[Chalkboard]">Description text here...</p>
            </div>
            <div className="w-32">
              <span className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-xs text-slate-600 font-[Chalkboard] inline-block">
                time
              </span>
            </div>
            <div className="w-40 text-sm text-slate-600 font-[Chalkboard]">09:00</div>
            <div className="w-32 text-sm text-slate-600 font-[Chalkboard]">2 rulesets</div>
            <div className="w-24 flex gap-2">
              <div className="w-6 h-6 bg-slate-100 border border-slate-300 rounded"></div>
              <div className="w-6 h-6 bg-slate-100 border border-slate-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==============================================
// ORG UNIT ATTRIBUTES TAB - Wireframe
// ==============================================

function OrgUnitAttributesWireframe() {
  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-slate-400 font-[Chalkboard]">15 sites</div>
        <div className="px-4 py-2 bg-slate-100 border border-slate-300 rounded text-slate-400 text-sm font-[Chalkboard]">
          Columns (9)
        </div>
      </div>

      {/* Bulk Edit Table - Horizontal Scroll */}
      <div className="border border-slate-300 rounded overflow-x-auto">
        <div className="min-w-max">
          {/* Table Header - Sticky */}
          <div className="bg-slate-100 border-b border-slate-300 flex">
            <div className="w-12 p-3 border-r border-slate-300">
              <div className="w-4 h-4 bg-slate-200 border border-slate-400 rounded"></div>
            </div>
            <div className="w-48 p-3 border-r border-slate-300 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">
              Site
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="w-32 p-3 border-r border-slate-300 text-xs font-medium text-slate-600 uppercase font-[Chalkboard]">
                Attribute {i}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="border-b border-slate-200 flex">
              <div className="w-12 p-3 border-r border-slate-300 flex items-center">
                <div className="w-4 h-4 bg-slate-200 border border-slate-400 rounded"></div>
              </div>
              <div className="w-48 p-3 border-r border-slate-300">
                <div className="text-sm font-medium text-slate-700 font-[Chalkboard]">Site Name {row}</div>
              </div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
                <div key={col} className="w-32 p-3 border-r border-slate-300">
                  <div className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs text-slate-600 font-[Chalkboard]">
                    Value {col}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6 text-xs text-slate-400 font-[Chalkboard]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-200 border border-slate-400 rounded"></div>
          <span>Missing required value</span>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// RULESETS TAB - Wireframe
// ==============================================

function RulesetsWireframe() {
  const [selectedRuleset, setSelectedRuleset] = useState<number>(1); // Default to first ruleset

  return (
    <div className="flex">
      {/* Left Sidebar - Rulesets List */}
      <div className="w-80 flex-shrink-0 pr-6 border-r border-slate-300 -ml-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-slate-700 font-[Chalkboard] pl-4">Rulesets</div>
          <div className="text-sm text-slate-400 font-[Chalkboard]">+ New</div>
        </div>

        {/* Ruleset Rows */}
        <div className="border-t border-b border-slate-300 bg-white -mr-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              onClick={() => setSelectedRuleset(i)}
              className={`px-4 py-3 cursor-pointer border-b border-slate-100 last:border-b-0 ${
                selectedRuleset === i
                  ? 'bg-slate-100'
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`text-sm font-medium mb-0.5 font-[Chalkboard] ${
                    selectedRuleset === i
                      ? 'text-slate-700'
                      : 'text-slate-600'
                  }`}>
                    Ruleset Name {i}
                  </div>
                  <SquiggleText height={10} className="w-full" rows={1} />
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-1.5 font-[Chalkboard]">
                    <span>5 rules</span>
                    <span>3 sites</span>
                  </div>
                </div>
                <div className="ml-2 flex gap-1">
                  <div className="w-5 h-5 bg-slate-100 border border-slate-300 rounded"></div>
                  <div className="w-5 h-5 bg-slate-100 border border-slate-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Rules Detail */}
      <div className="flex-1 pl-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1 font-[Chalkboard]">
              Ruleset Name {selectedRuleset}
            </h3>
            <SquiggleText height={14} className="w-64" rows={1} />
          </div>
          <div className="px-4 py-2 bg-slate-100 border border-slate-300 rounded text-slate-400 text-sm font-[Chalkboard]">
            + Add rule
          </div>
        </div>

        {/* Required Attributes Banner */}
        <div className="mb-4 p-3 bg-slate-100 border border-slate-300 rounded-lg">
          <div className="text-xs font-semibold text-slate-700 mb-2 font-[Chalkboard]">
            Required attributes:
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <code
                key={i}
                className="bg-slate-200 border border-slate-400 rounded px-2 py-1 text-xs text-slate-700 font-mono"
              >
                attribute_{i}
              </code>
            ))}
          </div>
        </div>

        {/* Rules List */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-white border border-slate-300 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-sm font-medium text-slate-700 font-[Chalkboard]">
                      Rule Name {i}
                    </div>
                    <span className="bg-slate-100 border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-600 font-[Chalkboard]">
                      fixed
                    </span>
                    <span className="text-xs text-slate-400 font-[Chalkboard]">Monday</span>
                  </div>

                  {/* Rule Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3 font-[Chalkboard]">
                    <div>
                      <span className="text-slate-400">Role: </span>
                      <span className="text-slate-700">Manager</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Start: </span>
                      <span className="text-slate-700 font-mono text-xs">
                        {'#{opening_time} - 1.hour'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">End: </span>
                      <span className="text-slate-700 font-mono text-xs">
                        {'#{closing_time}'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Duration: </span>
                      <span className="text-slate-700">480 min</span>
                    </div>
                  </div>

                  {/* Required Attributes */}
                  <div className="flex flex-wrap gap-1">
                    {[1, 2].map((j) => (
                      <code
                        key={j}
                        className="bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 text-[10px] text-slate-600 font-mono"
                      >
                        attr_{j}
                      </code>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <div className="w-6 h-6 bg-slate-100 border border-slate-300 rounded"></div>
                  <div className="w-6 h-6 bg-slate-100 border border-slate-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==============================================
// ASSIGNMENTS TAB - Wireframe
// ==============================================

function AssignmentsWireframe() {
  const [selectedSite, setSelectedSite] = useState<number>(1); // Default to first site

  // Mock data for assignments per site
  const siteAssignments: Record<number, string[]> = {
    1: ['Ruleset A', 'Ruleset B'],
    2: ['Ruleset A'],
    3: [],
    4: ['Ruleset C'],
    5: [],
  };

  const getFilteredSites = () => {
    return [1, 2, 3, 4, 5];
  };

  return (
    <div className="flex">
      {/* Site List Sidebar */}
      <div className="w-80 flex-shrink-0 pr-6 border-r border-slate-300 -ml-6">
        {/* Status Filter */}
        <div className="mb-3 pl-4">
          <div className="text-xs font-medium text-slate-600 mb-1.5 font-[Chalkboard]">Filter sites</div>
          <div className="w-full px-3 py-2 text-sm border border-slate-300 rounded bg-white text-slate-400 font-[Chalkboard]">
            All sites
          </div>
        </div>
        <div className="border-t border-b border-slate-300 bg-white -mr-6">
          {getFilteredSites().map((i) => {
            const assignments = siteAssignments[i] || [];
            
            return (
              <div
                key={i}
                onClick={() => setSelectedSite(i)}
                className={`px-4 py-3 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors ${
                  selectedSite === i
                    ? 'bg-slate-100'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-[Chalkboard] ${
                    selectedSite === i
                      ? 'text-slate-700 font-medium'
                      : 'text-slate-400'
                  }`}>
                    Site Name {i}
                  </span>
                </div>
                {assignments.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {assignments.map((ruleset, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-100 border border-slate-300 rounded px-2 py-0.5 text-slate-600 font-[Chalkboard]"
                      >
                        {ruleset}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Assignment Timeline */}
      <div className="flex-1 pl-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-slate-700 font-[Chalkboard]">
            Site Name {selectedSite}
          </h4>
          <div className="px-4 py-2 bg-slate-100 border border-slate-300 rounded text-slate-400 text-sm font-[Chalkboard]">
            + Assign ruleset
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {(siteAssignments[selectedSite] || []).length > 0 ? (
            siteAssignments[selectedSite].map((ruleset, i) => (
              <div key={i} className="p-4 bg-white border border-slate-300 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-sm font-medium text-slate-700 font-[Chalkboard]">
                        {ruleset}
                      </div>
                      <span className="bg-slate-100 border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-600 font-[Chalkboard]">
                        Active
                      </span>
                    </div>
                    <div className="text-sm text-slate-400 font-[Chalkboard]">
                      <span>From: 2024-01-01</span>
                      <span className="ml-4">Until: —</span>
                      <span className="ml-4 text-slate-600">Indefinite</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-slate-100 border border-slate-300 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <p className="text-slate-400 font-[Chalkboard]">
                No ruleset assignments for this site.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LabourRulesLowFi;
