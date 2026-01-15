/**
 * Labour Rules Configuration Prototype
 * 
 * Based on: product-briefs/labour-rules/design-requirements-labour-rules-v2.txt
 * 
 * Four main areas:
 * 1. Attributes - Define org-level attributes
 * 2. Org Unit Attributes - Set attribute values per site (bulk edit)
 * 3. Rulesets & Rules - Create rulesets with formula editor
 * 4. Assignments - Assign rulesets to sites with date ranges
 */

import { useState, useRef, useEffect } from 'react';
import { SonaLayout } from '../../src/components/shared/SonaLayout';
import { 
  SearchIcon, 
  EditIcon, 
  TrashIcon, 
  PlusIcon, 
  DuplicateIcon, 
  DownloadIcon, 
  UploadIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChevronDownIcon,
} from '../../src/components/shared/Icon';
import type {
  LabourRulesTab,
  Attribute,
  AttributeType,
  Ruleset,
  Rule,
  RulesetAssignment,
  OrgUnitWithAttributes,
} from './labourRules';
import {
  attributes as initialAttributes,
  orgUnitAttributes as initialOrgUnitAttributes,
  rulesets as initialRulesets,
  rules as initialRules,
  assignments as initialAssignments,
  availableRoles,
  getAttributeSuggestions,
  parseFormulaAttributes,
  validateFormula,
} from './labourRulesData';

// ==============================================
// MAIN COMPONENT
// ==============================================

export function LabourRules() {
  const [activeTab, setActiveTab] = useState<LabourRulesTab>('attributes');
  
  // State for each area
  const [attributes, setAttributes] = useState<Attribute[]>(initialAttributes);
  const [orgUnitAttributes, setOrgUnitAttributes] = useState<OrgUnitWithAttributes[]>(initialOrgUnitAttributes);
  const [rulesets, setRulesets] = useState<Ruleset[]>(initialRulesets);
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [assignments, setAssignments] = useState<RulesetAssignment[]>(initialAssignments);

  const tabs: { id: LabourRulesTab; label: string; count?: number }[] = [
    { id: 'attributes', label: 'Attributes', count: attributes.length },
    { id: 'org-unit-attributes', label: 'Org unit attributes' },
    { id: 'rulesets', label: 'Rulesets & rules', count: rulesets.length },
    { id: 'assignments', label: 'Assignments' },
  ];

  return (
    <SonaLayout
      pageTitle="Labour rules"
      pageSubtitle="Configure productivity rules for labour planning"
      headerActions={
        <div className="flex gap-3">
          <button className="ui-button ui-button--secondary">
            <DownloadIcon className="mr-2" />
            Download CSV
          </button>
          <button className="ui-button ui-button--secondary">
            <UploadIcon className="mr-2" />
            Upload CSV
          </button>
        </div>
      }
    >
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
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
                {tab.count !== undefined && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'attributes' && (
            <AttributesTab
              attributes={attributes}
              setAttributes={setAttributes}
            />
          )}
          {activeTab === 'org-unit-attributes' && (
            <OrgUnitAttributesTab
              attributes={attributes}
              orgUnitAttributes={orgUnitAttributes}
              setOrgUnitAttributes={setOrgUnitAttributes}
            />
          )}
          {activeTab === 'rulesets' && (
            <RulesetsTab
              rulesets={rulesets}
              setRulesets={setRulesets}
              rules={rules}
              setRules={setRules}
              attributes={attributes}
            />
          )}
          {activeTab === 'assignments' && (
            <AssignmentsTab
              assignments={assignments}
              setAssignments={setAssignments}
              rulesets={rulesets}
              orgUnitAttributes={orgUnitAttributes}
            />
          )}
        </div>
      </div>
    </SonaLayout>
  );
}

// ==============================================
// ATTRIBUTES TAB
// ==============================================

interface AttributesTabProps {
  attributes: Attribute[];
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
}

function AttributesTab({ attributes, setAttributes }: AttributesTabProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAttributes = attributes.filter((attr) =>
    attr.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAttribute = () => {
    setEditingAttribute(null);
    setShowModal(true);
  };

  const handleEditAttribute = (attr: Attribute) => {
    setEditingAttribute(attr);
    setShowModal(true);
  };

  const handleSaveAttribute = (attr: Omit<Attribute, 'id' | 'rulesetCount' | 'createdAt'>) => {
    if (editingAttribute) {
      setAttributes((prev) =>
        prev.map((a) =>
          a.id === editingAttribute.id ? { ...a, ...attr } : a
        )
      );
    } else {
      const newAttr: Attribute = {
        ...attr,
        id: `attr-${Date.now()}`,
        rulesetCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setAttributes((prev) => [...prev, newAttr]);
    }
    setShowModal(false);
  };

  const handleDeleteAttribute = (attrId: string) => {
    const attr = attributes.find((a) => a.id === attrId);
    if (attr && attr.rulesetCount > 0) {
      alert(`Cannot delete "${attr.name}" — it is used by ${attr.rulesetCount} ruleset(s).`);
      return;
    }
    setAttributes((prev) => prev.filter((a) => a.id !== attrId));
  };

  return (
    <div>
      {/* Header with search and add button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search attributes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 pl-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon size="sm" />
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {filteredAttributes.length} attribute{filteredAttributes.length !== 1 ? 's' : ''}
          </span>
        </div>
        <button
          onClick={handleAddAttribute}
          className="ui-button ui-button--primary"
        >
          <PlusIcon className="mr-2" />
          Add attribute
        </button>
      </div>

      {/* Attributes Table */}
      <div className="sonaui-tablewrapper--default">
        <table className="sonaui-table sonaui-table--default">
          <thead>
            <tr>
              <th className="sonaui-table__th">Name</th>
              <th className="sonaui-table__th">Type</th>
              <th className="sonaui-table__th">Default value</th>
              <th className="sonaui-table__th">Used by</th>
              <th className="sonaui-table__th w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttributes.map((attr) => (
              <tr key={attr.id} className="sonaui-table__tr">
                <td className="sonaui-table__td">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                    {attr.name}
                  </code>
                  {attr.description && (
                    <p className="text-xs text-gray-500 mt-1">{attr.description}</p>
                  )}
                </td>
                <td className="sonaui-table__td">
                  <span className="ui-badge ui-badge--info">{attr.type}</span>
                </td>
                <td className="sonaui-table__td">
                  {attr.defaultValue !== undefined ? (
                    <span className="text-sm">
                      {typeof attr.defaultValue === 'boolean'
                        ? attr.defaultValue ? 'Yes' : 'No'
                        : String(attr.defaultValue)}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">—</span>
                  )}
                </td>
                <td className="sonaui-table__td">
                  {attr.rulesetCount > 0 ? (
                    <span className="text-sm text-emerald-600">
                      {attr.rulesetCount} ruleset{attr.rulesetCount !== 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">Not used</span>
                  )}
                </td>
                <td className="sonaui-table__td">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditAttribute(attr)}
                      className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                      title="Edit"
                    >
                      <EditIcon size="sm" />
                    </button>
                    <button
                      onClick={() => handleDeleteAttribute(attr.id)}
                      className={`p-1.5 rounded ${
                        attr.rulesetCount > 0
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                      }`}
                      title={attr.rulesetCount > 0 ? 'Cannot delete - in use' : 'Delete'}
                      disabled={attr.rulesetCount > 0}
                    >
                      <TrashIcon size="sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <AttributeModal
          attribute={editingAttribute}
          onSave={handleSaveAttribute}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

// Attribute Modal Component
interface AttributeModalProps {
  attribute: Attribute | null;
  onSave: (attr: Omit<Attribute, 'id' | 'rulesetCount' | 'createdAt'>) => void;
  onClose: () => void;
}

function AttributeModal({ attribute, onSave, onClose }: AttributeModalProps) {
  const [name, setName] = useState(attribute?.name || '');
  const [type, setType] = useState<AttributeType>(attribute?.type || 'string');
  const [defaultValue, setDefaultValue] = useState(
    attribute?.defaultValue !== undefined ? String(attribute.defaultValue) : ''
  );
  const [description, setDescription] = useState(attribute?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let parsedDefault: string | number | boolean | undefined;
    if (defaultValue) {
      switch (type) {
        case 'boolean':
          parsedDefault = defaultValue.toLowerCase() === 'true' || defaultValue === '1';
          break;
        case 'integer':
          parsedDefault = parseInt(defaultValue, 10);
          break;
        case 'float':
          parsedDefault = parseFloat(defaultValue);
          break;
        default:
          parsedDefault = defaultValue;
      }
    }

    onSave({
      name: name.toLowerCase().replace(/\s+/g, '_'),
      type,
      defaultValue: parsedDefault,
      description,
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-500/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            {attribute ? 'Edit attribute' : 'Add new attribute'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., opening_time_monday"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Use snake_case naming (e.g., opening_time_monday)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AttributeType)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="time">Time</option>
                <option value="boolean">Boolean</option>
                <option value="integer">Integer</option>
                <option value="float">Float</option>
                <option value="string">String</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Default value (optional)
              </label>
              {type === 'boolean' ? (
                <select
                  value={defaultValue}
                  onChange={(e) => setDefaultValue(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">No default</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : type === 'time' ? (
                <input
                  type="time"
                  value={defaultValue}
                  onChange={(e) => setDefaultValue(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <input
                  type={type === 'integer' || type === 'float' ? 'number' : 'text'}
                  value={defaultValue}
                  onChange={(e) => setDefaultValue(e.target.value)}
                  step={type === 'float' ? '0.01' : undefined}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ui-button ui-button--primary"
            >
              {attribute ? 'Save changes' : 'Add attribute'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==============================================
// ORG UNIT ATTRIBUTES TAB
// ==============================================

interface OrgUnitAttributesTabProps {
  attributes: Attribute[];
  orgUnitAttributes: OrgUnitWithAttributes[];
  setOrgUnitAttributes: React.Dispatch<React.SetStateAction<OrgUnitWithAttributes[]>>;
}

function OrgUnitAttributesTab({
  attributes,
  orgUnitAttributes,
  setOrgUnitAttributes,
}: OrgUnitAttributesTabProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'opening_time_monday',
    'opening_time_tuesday',
    'opening_time_wednesday',
    'opening_time_thursday',
    'opening_time_friday',
    'opening_time_saturday',
    'opening_time_sunday',
    'has_drive_through',
    'floor_count',
  ]);
  const [editingCell, setEditingCell] = useState<{
    orgUnitId: string;
    attributeName: string;
  } | null>(null);
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const displayedAttributes = attributes.filter((a) =>
    visibleColumns.includes(a.name)
  );

  const handleCellEdit = (
    orgUnitId: string,
    attributeName: string,
    value: string | number | boolean | null
  ) => {
    setOrgUnitAttributes((prev) =>
      prev.map((ou) =>
        ou.orgUnit.id === orgUnitId
          ? {
              ...ou,
              attributes: { ...ou.attributes, [attributeName]: value },
              missingRequired: ou.missingRequired.filter((a) => a !== attributeName),
            }
          : ou
      )
    );
    setEditingCell(null);
  };

  const toggleRowSelection = (orgUnitId: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(orgUnitId)) {
        next.delete(orgUnitId);
      } else {
        next.add(orgUnitId);
      }
      return next;
    });
  };

  const selectAllRows = () => {
    if (selectedRows.size === orgUnitAttributes.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(orgUnitAttributes.map((ou) => ou.orgUnit.id)));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {orgUnitAttributes.length} sites
          </span>
          {selectedRows.size > 0 && (
            <span className="text-sm text-emerald-600 font-medium">
              {selectedRows.size} selected
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="ui-button ui-button--secondary"
            >
              Columns ({visibleColumns.length})
              <ChevronDownIcon className="ml-2" size="sm" />
            </button>
            {showColumnSelector && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Select columns to display
                  </p>
                </div>
                <div className="p-2">
                  {attributes.map((attr) => (
                    <label
                      key={attr.id}
                      className="flex items-center px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(attr.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setVisibleColumns([...visibleColumns, attr.name]);
                          } else {
                            setVisibleColumns(
                              visibleColumns.filter((c) => c !== attr.name)
                            );
                          }
                        }}
                        className="mr-3 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">{attr.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Edit Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="bg-gray-50">
                <th className="sticky left-0 z-10 bg-gray-50 px-4 py-3 border-b border-r border-gray-200 w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === orgUnitAttributes.length}
                    onChange={selectAllRows}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th className="sticky left-12 z-10 bg-gray-50 px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase border-b border-r border-gray-200 min-w-[200px]">
                  Site
                </th>
                {displayedAttributes.map((attr) => (
                  <th
                    key={attr.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200 min-w-[120px]"
                  >
                    <div className="flex flex-col">
                      <span>{attr.name.replace(/_/g, ' ')}</span>
                      <span className="text-[10px] text-gray-400 font-normal normal-case">
                        {attr.type}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orgUnitAttributes.map((ou) => (
                <tr
                  key={ou.orgUnit.id}
                  className={`${
                    selectedRows.has(ou.orgUnit.id) ? 'bg-emerald-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="sticky left-0 z-10 bg-inherit px-4 py-3 border-r border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(ou.orgUnit.id)}
                      onChange={() => toggleRowSelection(ou.orgUnit.id)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="sticky left-12 z-10 bg-inherit px-4 py-3 border-r border-gray-200">
                    <div className="flex items-center">
                      <span className="font-medium text-sm text-gray-900">
                        {ou.orgUnit.name}
                      </span>
                      {ou.missingRequired.length > 0 && (
                        <span
                          className="ml-2 text-amber-500"
                          title={`Missing: ${ou.missingRequired.join(', ')}`}
                        >
                          <ExclamationTriangleIcon size="sm" />
                        </span>
                      )}
                    </div>
                  </td>
                  {displayedAttributes.map((attr) => {
                    const value = ou.attributes[attr.name];
                    const isMissing = ou.missingRequired.includes(attr.name);
                    const isEditing =
                      editingCell?.orgUnitId === ou.orgUnit.id &&
                      editingCell?.attributeName === attr.name;

                    return (
                      <td
                        key={attr.id}
                        className={`px-4 py-3 ${
                          isMissing ? 'bg-amber-50' : ''
                        }`}
                      >
                        {isEditing ? (
                          <EditableCell
                            type={attr.type}
                            value={value}
                            onSave={(newValue) =>
                              handleCellEdit(ou.orgUnit.id, attr.name, newValue)
                            }
                            onCancel={() => setEditingCell(null)}
                          />
                        ) : (
                          <button
                            onClick={() =>
                              setEditingCell({
                                orgUnitId: ou.orgUnit.id,
                                attributeName: attr.name,
                              })
                            }
                            className={`w-full text-left text-sm px-2 py-1 rounded hover:bg-gray-100 ${
                              value === null || value === undefined
                                ? 'text-gray-400 italic'
                                : 'text-gray-900'
                            }`}
                          >
                            {value === null || value === undefined
                              ? '—'
                              : typeof value === 'boolean'
                              ? value
                                ? 'Yes'
                                : 'No'
                              : String(value)}
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-amber-50 border border-amber-200 rounded"></span>
          <span>Missing required value</span>
        </div>
        <div className="flex items-center gap-2">
          <ExclamationTriangleIcon size="sm" className="text-amber-500" />
          <span>Site has missing attributes</span>
        </div>
      </div>
    </div>
  );
}

// Editable Cell Component
interface EditableCellProps {
  type: AttributeType;
  value: string | number | boolean | null | undefined;
  onSave: (value: string | number | boolean | null) => void;
  onCancel: () => void;
}

function EditableCell({ type, value, onSave, onCancel }: EditableCellProps) {
  const [inputValue, setInputValue] = useState(
    value !== null && value !== undefined ? String(value) : ''
  );
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSave = () => {
    let parsedValue: string | number | boolean | null = null;
    if (inputValue !== '') {
      switch (type) {
        case 'boolean':
          parsedValue = inputValue === 'true';
          break;
        case 'integer':
          parsedValue = parseInt(inputValue, 10);
          break;
        case 'float':
          parsedValue = parseFloat(inputValue);
          break;
        default:
          parsedValue = inputValue;
      }
    }
    onSave(parsedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  if (type === 'boolean') {
    return (
      <select
        ref={inputRef as React.RefObject<HTMLSelectElement>}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 text-sm border border-emerald-500 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="">—</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    );
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type={type === 'time' ? 'time' : type === 'integer' || type === 'float' ? 'number' : 'text'}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={handleKeyDown}
      step={type === 'float' ? '0.01' : undefined}
      className="w-full px-2 py-1 text-sm border border-emerald-500 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
  );
}

// ==============================================
// RULESETS TAB
// ==============================================

interface RulesetsTabProps {
  rulesets: Ruleset[];
  setRulesets: React.Dispatch<React.SetStateAction<Ruleset[]>>;
  rules: Rule[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  attributes: Attribute[];
}

function RulesetsTab({
  rulesets,
  setRulesets,
  rules: _rules,
  setRules,
  attributes,
}: RulesetsTabProps) {
  const [selectedRuleset, setSelectedRuleset] = useState<Ruleset | null>(null);
  const [showRulesetModal, setShowRulesetModal] = useState(false);
  const [editingRuleset, setEditingRuleset] = useState<Ruleset | null>(null);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  const handleCreateRuleset = () => {
    setEditingRuleset(null);
    setShowRulesetModal(true);
  };

  const handleEditRuleset = (ruleset: Ruleset) => {
    setEditingRuleset(ruleset);
    setShowRulesetModal(true);
  };

  const handleCloneRuleset = (ruleset: Ruleset) => {
    const clonedRuleset: Ruleset = {
      ...ruleset,
      id: `ruleset-${Date.now()}`,
      name: `${ruleset.name} (copy)`,
      assignedSiteCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      rules: [],
    };
    
    // Clone rules
    const clonedRules = ruleset.rules.map((rule) => ({
      ...rule,
      id: `rule-${Date.now()}-${Math.random()}`,
      rulesetId: clonedRuleset.id,
    }));
    
    clonedRuleset.rules = clonedRules;
    setRulesets((prev) => [...prev, clonedRuleset]);
    setRules((prev) => [...prev, ...clonedRules]);
  };

  const handleSaveRuleset = (data: { name: string; description: string }) => {
    if (editingRuleset) {
      setRulesets((prev) =>
        prev.map((rs) =>
          rs.id === editingRuleset.id
            ? { ...rs, ...data, updatedAt: new Date().toISOString().split('T')[0] }
            : rs
        )
      );
    } else {
      const newRuleset: Ruleset = {
        id: `ruleset-${Date.now()}`,
        name: data.name,
        description: data.description,
        rules: [],
        assignedSiteCount: 0,
        requiredAttributes: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setRulesets((prev) => [...prev, newRuleset]);
    }
    setShowRulesetModal(false);
  };

  const handleCreateRule = () => {
    if (!selectedRuleset) return;
    setEditingRule(null);
    setShowRuleModal(true);
  };

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule);
    setShowRuleModal(true);
  };

  const handleSaveRule = (rule: Omit<Rule, 'id' | 'rulesetId'>) => {
    if (!selectedRuleset) return;

    if (editingRule) {
      setRules((prev) =>
        prev.map((r) =>
          r.id === editingRule.id ? { ...r, ...rule } : r
        )
      );
      // Update the selected ruleset's rules
      setRulesets((prev) =>
        prev.map((rs) =>
          rs.id === selectedRuleset.id
            ? {
                ...rs,
                rules: rs.rules.map((r) =>
                  r.id === editingRule.id ? { ...r, ...rule } : r
                ),
              }
            : rs
        )
      );
    } else {
      const newRule: Rule = {
        ...rule,
        id: `rule-${Date.now()}`,
        rulesetId: selectedRuleset.id,
      };
      setRules((prev) => [...prev, newRule]);
      // Add to selected ruleset
      setRulesets((prev) =>
        prev.map((rs) =>
          rs.id === selectedRuleset.id
            ? { ...rs, rules: [...rs.rules, newRule] }
            : rs
        )
      );
    }
    setShowRuleModal(false);
  };

  const handleDeleteRule = (ruleId: string) => {
    if (!selectedRuleset) return;
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
    setRulesets((prev) =>
      prev.map((rs) =>
        rs.id === selectedRuleset.id
          ? { ...rs, rules: rs.rules.filter((r) => r.id !== ruleId) }
          : rs
      )
    );
  };

  // Set first ruleset as default when component mounts or rulesets change
  useEffect(() => {
    if (!selectedRuleset && rulesets.length > 0) {
      setSelectedRuleset(rulesets[0]);
    } else if (selectedRuleset) {
      // Update selectedRuleset when rulesets change
      const updated = rulesets.find((rs) => rs.id === selectedRuleset.id);
      if (updated) {
        setSelectedRuleset(updated);
      } else if (rulesets.length > 0) {
        // If selected ruleset was deleted, select first one
        setSelectedRuleset(rulesets[0]);
      }
    }
  }, [rulesets]);

  return (
    <div className="flex">
      {/* Rulesets List */}
      <div className="w-80 flex-shrink-0 pr-6 border-r border-gray-200 -ml-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 pl-4">Rulesets</h3>
          <button
            onClick={handleCreateRuleset}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            + New
          </button>
        </div>
        <div className="border-t border-b border-gray-200 bg-white -mr-6">
          {rulesets.map((ruleset) => (
            <div
              key={ruleset.id}
              className={`px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                selectedRuleset?.id === ruleset.id
                  ? 'bg-emerald-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedRuleset(ruleset)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium text-sm truncate ${
                    selectedRuleset?.id === ruleset.id
                      ? 'text-emerald-700'
                      : 'text-gray-900'
                  }`}>
                    {ruleset.name}
                  </h4>
                  {ruleset.description && (
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {ruleset.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                    <span>{ruleset.rules.length} rules</span>
                    <span>{ruleset.assignedSiteCount} sites</span>
                  </div>
                </div>
                <div className="ml-2 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloneRuleset(ruleset);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title="Clone"
                  >
                    <DuplicateIcon size="sm" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditRuleset(ruleset);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title="Edit"
                  >
                    <EditIcon size="sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules Detail */}
      <div className="flex-1 pl-6">
        {selectedRuleset ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedRuleset.name}
                </h3>
                {selectedRuleset.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedRuleset.description}
                  </p>
                )}
              </div>
              <button
                onClick={handleCreateRule}
                className="ui-button ui-button--primary"
              >
                <PlusIcon className="mr-2" />
                Add rule
              </button>
            </div>

            {/* Required Attributes */}
            {selectedRuleset.requiredAttributes.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-800 mb-2">
                  Required attributes for this ruleset:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedRuleset.requiredAttributes.map((attr) => (
                    <code
                      key={attr}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                    >
                      {attr}
                    </code>
                  ))}
                </div>
              </div>
            )}

            {/* Rules List */}
            {selectedRuleset.rules.length > 0 ? (
              <div className="space-y-3">
                {selectedRuleset.rules.map((rule) => (
                  <RuleCard
                    key={rule.id}
                    rule={rule}
                    onEdit={() => handleEditRule(rule)}
                    onDelete={() => handleDeleteRule(rule.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No rules in this ruleset yet.</p>
                <button
                  onClick={handleCreateRule}
                  className="mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + Add your first rule
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a ruleset to view its rules</p>
          </div>
        )}
      </div>

      {/* Ruleset Modal */}
      {showRulesetModal && (
        <RulesetModal
          ruleset={editingRuleset}
          onSave={handleSaveRuleset}
          onClose={() => setShowRulesetModal(false)}
        />
      )}

      {/* Rule Modal */}
      {showRuleModal && selectedRuleset && (
        <RuleModal
          rule={editingRule}
          attributes={attributes}
          onSave={handleSaveRule}
          onClose={() => setShowRuleModal(false)}
        />
      )}
    </div>
  );
}

// Rule Card Component
interface RuleCardProps {
  rule: Rule;
  onEdit: () => void;
  onDelete: () => void;
}

function RuleCard({ rule, onEdit, onDelete }: RuleCardProps) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm text-gray-900">{rule.name}</h4>
            <span className="ui-badge ui-badge--info">{rule.type}</span>
            {rule.dayOfWeek && (
              <span className="text-xs text-gray-500 capitalize">
                {rule.dayOfWeek}
              </span>
            )}
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            {rule.role && (
              <div>
                <span className="text-gray-500">Role: </span>
                <span className="text-gray-900">{rule.role}</span>
              </div>
            )}
            {rule.startTime && (
              <div>
                <span className="text-gray-500">Start: </span>
                <FormulaDisplay formula={rule.startTime} />
              </div>
            )}
            {rule.endTime && (
              <div>
                <span className="text-gray-500">End: </span>
                <FormulaDisplay formula={rule.endTime} />
              </div>
            )}
            {rule.duration && (
              <div>
                <span className="text-gray-500">Duration: </span>
                <FormulaDisplay formula={rule.duration} />
              </div>
            )}
            {rule.minimumPeopleRequired && (
              <div>
                <span className="text-gray-500">Minimum people: </span>
                <FormulaDisplay formula={rule.minimumPeopleRequired} />
              </div>
            )}
          </div>

          {rule.requiredAttributes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {rule.requiredAttributes.map((attr) => (
                <code
                  key={attr}
                  className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
                >
                  {attr}
                </code>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-gray-600"
            title="Edit"
          >
            <EditIcon size="sm" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-600"
            title="Delete"
          >
            <TrashIcon size="sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Formula Display Component (with syntax highlighting)
function FormulaDisplay({ formula }: { formula: string }) {
  // Simple syntax highlighting for formulas
  const highlighted = formula.replace(
    /#\{(\w+)\}/g,
    '<span class="text-emerald-600 font-mono bg-emerald-50 px-1 rounded">#{$1}</span>'
  );

  return (
    <span
      className="text-gray-900 font-mono text-xs"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

// Ruleset Modal
interface RulesetModalProps {
  ruleset: Ruleset | null;
  onSave: (data: { name: string; description: string }) => void;
  onClose: () => void;
}

function RulesetModal({ ruleset, onSave, onClose }: RulesetModalProps) {
  const [name, setName] = useState(ruleset?.name || '');
  const [description, setDescription] = useState(ruleset?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description });
  };

  return (
    <div className="fixed inset-0 bg-slate-500/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            {ruleset ? 'Edit ruleset' : 'Create new ruleset'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Standard opening rules"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe what this ruleset is for..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="ui-button ui-button--primary">
              {ruleset ? 'Save changes' : 'Create ruleset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Rule Modal with Formula Editor
interface RuleModalProps {
  rule: Rule | null;
  attributes: Attribute[];
  onSave: (rule: Omit<Rule, 'id' | 'rulesetId'>) => void;
  onClose: () => void;
}

function RuleModal({ rule, attributes, onSave, onClose }: RuleModalProps) {
  const [name, setName] = useState(rule?.name || '');
  const [type, setType] = useState<'fixed' | 'minimum' | 'variable'>(rule?.type || 'fixed');
  const [dayOfWeek, setDayOfWeek] = useState(rule?.dayOfWeek || 'all');
  const [role, setRole] = useState(rule?.role || '');
  const [startTime, setStartTime] = useState(rule?.startTime || '');
  const [endTime, setEndTime] = useState(rule?.endTime || '');
  const [duration, setDuration] = useState(rule?.duration || '');
  const [minimumPeople, setMinimumPeople] = useState(rule?.minimumPeopleRequired || '');

  const days = [
    { value: 'all', label: 'All days' },
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Collect all required attributes from formulas
    const allFormulas = [startTime, endTime, duration, minimumPeople].filter(Boolean);
    const requiredAttributes = allFormulas.flatMap(parseFormulaAttributes);

    const newRule: Omit<Rule, 'id' | 'rulesetId'> = {
      name,
      type,
      dayOfWeek: dayOfWeek || undefined,
      role: role || undefined,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      duration: duration || undefined,
      minimumPeopleRequired: type === 'minimum' ? minimumPeople : undefined,
      requiredAttributes: [...new Set(requiredAttributes)],
      hasErrors: false,
    };

    onSave(newRule);
  };

  return (
    <div className="fixed inset-0 bg-slate-500/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            {rule ? 'Edit rule' : 'Add new rule'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Rule name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Manager pre-open coverage"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Rule type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'fixed' | 'minimum' | 'variable')}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="fixed">Fixed</option>
                  <option value="minimum">Minimum</option>
                  <option value="variable">Variable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Day of week
                </label>
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {days.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select a role...</option>
                  {availableRoles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Fields with Formula Editor */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <InformationCircleIcon size="sm" className="text-blue-500" />
                <span>
                  Use <code className="bg-gray-100 px-1 rounded">{'#{attribute_name}'}</code> to reference attributes.
                  Example: <code className="bg-gray-100 px-1 rounded">{'#{opening_time_monday} - 1.hour'}</code>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormulaInput
                  label="Start time"
                  value={startTime}
                  onChange={setStartTime}
                  placeholder="e.g., 09:00 or #{opening_time_monday} - 1.hour"
                  attributes={attributes}
                />

                <FormulaInput
                  label="End time"
                  value={endTime}
                  onChange={setEndTime}
                  placeholder="e.g., 17:00 or #{closing_time_monday} + 2.hours"
                  attributes={attributes}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormulaInput
                  label="Duration (minutes)"
                  value={duration}
                  onChange={setDuration}
                  placeholder="e.g., 480 or a formula"
                  attributes={attributes}
                />

                {type === 'minimum' && (
                  <FormulaInput
                    label="Minimum people required"
                    value={minimumPeople}
                    onChange={setMinimumPeople}
                    placeholder="e.g., 2 or #{floor_count}"
                    attributes={attributes}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="ui-button ui-button--primary">
              {rule ? 'Save changes' : 'Add rule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Formula Input with Autocomplete
interface FormulaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  attributes: Attribute[];
}

function FormulaInput({
  label,
  value,
  onChange,
  placeholder,
  attributes: _attributes,
}: FormulaInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Attribute[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validation = validateFormula(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Check if we should show suggestions
    const lastHashIndex = newValue.lastIndexOf('#{');
    const lastCloseIndex = newValue.lastIndexOf('}');
    
    if (lastHashIndex > lastCloseIndex) {
      // We're inside an attribute reference
      const query = newValue.slice(lastHashIndex + 2);
      const matches = getAttributeSuggestions(query);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (attr: Attribute) => {
    const lastHashIndex = value.lastIndexOf('#{');
    const beforeHash = value.slice(0, lastHashIndex);
    const newValue = `${beforeHash}#{${attr.name}}`;
    onChange(newValue);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-900 mb-1">
        {label}
      </label>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 ${
          value && !validation.isValid
            ? 'border-red-300 focus:ring-red-500'
            : 'border-slate-200 focus:ring-emerald-500'
        }`}
      />
      
      {/* Validation Error */}
      {value && !validation.isValid && (
        <p className="text-xs text-red-600 mt-1">
          {validation.errors[0]}
        </p>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((attr) => (
            <button
              key={attr.id}
              type="button"
              onClick={() => handleSuggestionClick(attr)}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
            >
              <code className="text-sm font-mono text-emerald-600">
                {attr.name}
              </code>
              <span className="text-xs text-gray-500">{attr.type}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ==============================================
// ASSIGNMENTS TAB
// ==============================================

interface AssignmentsTabProps {
  assignments: RulesetAssignment[];
  setAssignments: React.Dispatch<React.SetStateAction<RulesetAssignment[]>>;
  rulesets: Ruleset[];
  orgUnitAttributes: OrgUnitWithAttributes[];
}

function AssignmentsTab({
  assignments,
  setAssignments,
  rulesets,
  orgUnitAttributes,
}: AssignmentsTabProps) {
  const [selectedOrgUnit, setSelectedOrgUnit] = useState<string | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Set first site as default
  useEffect(() => {
    if (!selectedOrgUnit && orgUnitAttributes.length > 0) {
      setSelectedOrgUnit(orgUnitAttributes[0].orgUnit.id);
    }
  }, [orgUnitAttributes, selectedOrgUnit]);

  const getAssignmentsForOrgUnit = (orgUnitId: string) => {
    return assignments.filter((a) => a.orgUnitId === orgUnitId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="ui-badge ui-badge--success">Active</span>;
      case 'scheduled':
        return <span className="ui-badge ui-badge--warning">Scheduled</span>;
      case 'expired':
        return <span className="ui-badge ui-badge--info">Expired</span>;
      default:
        return null;
    }
  };

  const handleRemoveAssignment = (assignmentId: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
  };

  const handleAddAssignment = (data: {
    rulesetId: string;
    orgUnitIds: string[];
    effectiveFrom: string;
    effectiveUntil?: string;
  }) => {
    const ruleset = rulesets.find((rs) => rs.id === data.rulesetId);
    if (!ruleset) return;

    const newAssignments: RulesetAssignment[] = data.orgUnitIds.map((orgUnitId) => {
      const orgUnit = orgUnitAttributes.find((ou) => ou.orgUnit.id === orgUnitId);
      return {
        id: `assign-${Date.now()}-${Math.random()}`,
        rulesetId: data.rulesetId,
        rulesetName: ruleset.name,
        orgUnitId,
        orgUnitName: orgUnit?.orgUnit.name || '',
        effectiveFrom: data.effectiveFrom,
        effectiveUntil: data.effectiveUntil,
        status: new Date(data.effectiveFrom) <= new Date() ? 'active' : 'scheduled',
        createdAt: new Date().toISOString().split('T')[0],
      };
    });

    setAssignments((prev) => [...prev, ...newAssignments]);
    setShowAssignModal(false);
  };

  // Filter sites based on status
  const getFilteredSites = () => {
    if (statusFilter === 'all') return orgUnitAttributes;
    
    return orgUnitAttributes.filter((ou) => {
      const siteAssignments = getAssignmentsForOrgUnit(ou.orgUnit.id);
      if (statusFilter === 'configured') {
        return siteAssignments.length > 0;
      }
      if (statusFilter === 'no-rules') {
        return siteAssignments.length === 0;
      }
      // Filter by assignment status
      return siteAssignments.some((a) => a.status === statusFilter);
    });
  };

  return (
    <div className="flex">
      {/* Site List */}
      <div className="w-64 flex-shrink-0 pr-6 border-r border-gray-200 -ml-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3 pl-4">Sites</h4>
        
        {/* Status Filter */}
        <div className="mb-3 pl-4">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Filter sites</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All sites</option>
            <option value="configured">Configured</option>
            <option value="no-rules">No rules</option>
            <option value="active">Active assignments</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
        <div className="border-t border-b border-gray-200 bg-white -mr-6">
          {getFilteredSites().map((ou) => {
            const siteAssignments = getAssignmentsForOrgUnit(ou.orgUnit.id);
            const activeAssignments = siteAssignments.filter((a) => a.status === 'active');
            
            return (
              <button
                key={ou.orgUnit.id}
                onClick={() => setSelectedOrgUnit(ou.orgUnit.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors ${
                  selectedOrgUnit === ou.orgUnit.id
                    ? 'bg-emerald-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${
                    selectedOrgUnit === ou.orgUnit.id
                      ? 'text-emerald-700'
                      : 'text-gray-900'
                  }`}>
                    {ou.orgUnit.name}
                  </span>
                </div>
                {activeAssignments.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {activeAssignments.map((a) => (
                      <span
                        key={a.id}
                        className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded"
                      >
                        {a.rulesetName}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Assignment Timeline */}
      <div className="flex-1 pl-6">
        {selectedOrgUnit ? (
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">
                {
                  orgUnitAttributes.find((ou) => ou.orgUnit.id === selectedOrgUnit)
                    ?.orgUnit.name
                }
              </h4>
              <button
                onClick={() => setShowAssignModal(true)}
                className="ui-button ui-button--primary"
              >
                <PlusIcon className="mr-2" />
                Assign ruleset
              </button>
            </div>
            
            <div className="space-y-3 mt-4">
              {getAssignmentsForOrgUnit(selectedOrgUnit).length > 0 ? (
                getAssignmentsForOrgUnit(selectedOrgUnit).map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-4 bg-white border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-gray-900">
                            {assignment.rulesetName}
                          </h5>
                          {getStatusBadge(assignment.status)}
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <span>From: {assignment.effectiveFrom}</span>
                          {assignment.effectiveUntil && (
                            <span className="ml-4">
                              Until: {assignment.effectiveUntil}
                            </span>
                          )}
                          {!assignment.effectiveUntil && (
                            <span className="ml-4 text-emerald-600">
                              Indefinite
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveAssignment(assignment.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600"
                        title="Remove assignment"
                      >
                        <TrashIcon size="sm" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    No ruleset assignments for this site.
                  </p>
                  <button
                    onClick={() => setShowAssignModal(true)}
                    className="mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    + Assign a ruleset
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a site to view its assignments</p>
          </div>
        )}
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <AssignModal
          rulesets={rulesets}
          sites={orgUnitAttributes}
          selectedOrgUnitId={selectedOrgUnit}
          onSave={handleAddAssignment}
          onClose={() => setShowAssignModal(false)}
        />
      )}
    </div>
  );
}

// Assign Modal
interface AssignModalProps {
  rulesets: Ruleset[];
  sites: OrgUnitWithAttributes[];
  selectedOrgUnitId: string | null;
  onSave: (data: {
    rulesetId: string;
    orgUnitIds: string[];
    effectiveFrom: string;
    effectiveUntil?: string;
  }) => void;
  onClose: () => void;
}

function AssignModal({
  rulesets,
  sites,
  selectedOrgUnitId,
  onSave,
  onClose,
}: AssignModalProps) {
  const [selectedRuleset, setSelectedRuleset] = useState('');
  const [selectedSites, setSelectedSites] = useState<Set<string>>(
    selectedOrgUnitId ? new Set([selectedOrgUnitId]) : new Set()
  );
  const [effectiveFrom, setEffectiveFrom] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [effectiveUntil, setEffectiveUntil] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      rulesetId: selectedRuleset,
      orgUnitIds: Array.from(selectedSites),
      effectiveFrom,
      effectiveUntil: effectiveUntil || undefined,
    });
  };

  const toggleSite = (siteId: string) => {
    setSelectedSites((prev) => {
      const next = new Set(prev);
      if (next.has(siteId)) {
        next.delete(siteId);
      } else {
        next.add(siteId);
      }
      return next;
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-500/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Assign ruleset to sites
          </h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Select ruleset
              </label>
              <select
                value={selectedRuleset}
                onChange={(e) => setSelectedRuleset(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Choose a ruleset...</option>
                {rulesets.map((rs) => (
                  <option key={rs.id} value={rs.id}>
                    {rs.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Select sites
              </label>
              <div className="border border-slate-200 rounded-lg max-h-48 overflow-y-auto">
                {sites.map((site) => (
                  <label
                    key={site.orgUnit.id}
                    className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSites.has(site.orgUnit.id)}
                      onChange={() => toggleSite(site.orgUnit.id)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mr-3"
                    />
                    <span className="text-sm">{site.orgUnit.name}</span>
                    {site.missingRequired.length > 0 && (
                      <span className="ml-auto text-amber-500 text-xs">
                        Missing attributes
                      </span>
                    )}
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {selectedSites.size} site{selectedSites.size !== 1 ? 's' : ''} selected
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Effective from
                </label>
                <input
                  type="date"
                  value={effectiveFrom}
                  onChange={(e) => setEffectiveFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Effective until (optional)
                </label>
                <input
                  type="date"
                  value={effectiveUntil}
                  onChange={(e) => setEffectiveUntil(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty for indefinite
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedRuleset || selectedSites.size === 0}
              className="ui-button ui-button--primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign ruleset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LabourRules;
