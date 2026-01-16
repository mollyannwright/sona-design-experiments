import { useState } from 'react';
import { SonaLayout } from '../../src/components/shared/SonaLayout';
import {
  SearchIcon,
  EditIcon,
  TrashIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  XIcon,
  CheckIcon,
  DownloadIcon,
  UploadIcon,
  DuplicateIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  Icon,
} from '../../src/components/shared/Icon';

// Component showcase organized by category
type ComponentCategory = 
  | 'buttons-navigation'
  | 'form-inputs'
  | 'date-time'
  | 'tables-data'
  | 'feedback-status'
  | 'modals-overlays'
  | 'content-display'
  | 'chat-components'
  | 'application-specific';

function DesignSystemShowcase() {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>('buttons-navigation');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const categories: { id: ComponentCategory; label: string; icon: string }[] = [
    { id: 'buttons-navigation', label: 'Buttons & Navigation', icon: 'Edit' },
    { id: 'form-inputs', label: 'Form Inputs', icon: 'Edit' },
    { id: 'date-time', label: 'Date & Time', icon: 'Calendar' },
    { id: 'tables-data', label: 'Tables & Data', icon: 'Grid' },
    { id: 'feedback-status', label: 'Feedback & Status', icon: 'Information circle' },
    { id: 'modals-overlays', label: 'Modals & Overlays', icon: 'Grid' },
    { id: 'content-display', label: 'Content Display', icon: 'Photograph' },
    { id: 'chat-components', label: 'Chat Components', icon: 'Chat' },
    { id: 'application-specific', label: 'Application Specific', icon: 'Sparkle' },
  ];

  return (
    <SonaLayout
      pageTitle="SonaUI Design System"
      pageSubtitle="Interactive component showcase"
      showHeader={true}
    >
      <div className="max-w-7xl mx-auto">
        {/* Category Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSelectedComponent(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon name={category.icon} size="sm" />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Component Showcase */}
        <div className="space-y-8">
          {activeCategory === 'buttons-navigation' && <ButtonsNavigationShowcase />}
          {activeCategory === 'form-inputs' && <FormInputsShowcase />}
          {activeCategory === 'date-time' && <DateTimeShowcase />}
          {activeCategory === 'tables-data' && <TablesDataShowcase />}
          {activeCategory === 'feedback-status' && <FeedbackStatusShowcase />}
          {activeCategory === 'modals-overlays' && <ModalsOverlaysShowcase />}
          {activeCategory === 'content-display' && <ContentDisplayShowcase />}
          {activeCategory === 'chat-components' && <ChatComponentsShowcase />}
          {activeCategory === 'application-specific' && <ApplicationSpecificShowcase />}
        </div>
      </div>
    </SonaLayout>
  );
}

// Buttons & Navigation Components
function ButtonsNavigationShowcase() {
  const [toggleValue, setToggleValue] = useState<'left' | 'right'>('left');
  const [activeTab, setActiveTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="space-y-8">
      <ComponentSection title="Button" description="Primary interaction element with multiple variants">
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
            Primary
          </button>
          <button className="px-4 py-2 bg-white text-emerald-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            Secondary
          </button>
          <button className="px-4 py-2 bg-transparent text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors">
            Tertiary
          </button>
          <button className="px-4 py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition-colors">
            Destructive
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg cursor-not-allowed opacity-50">
            Disabled
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <Icon name="Plus" size="sm" />
            With Icon
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <span className="animate-spin">⟳</span>
            Loading
          </button>
        </div>
      </ComponentSection>

      <ComponentSection title="Toggle Button" description="Button for selecting between two options">
        <div className="flex items-center gap-4">
          <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setToggleValue('left')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                toggleValue === 'left'
                  ? 'bg-white text-gray-700'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              Left Option
            </button>
            <button
              onClick={() => setToggleValue('right')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-200 ${
                toggleValue === 'right'
                  ? 'bg-white text-gray-700'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              Right Option
            </button>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Action Menu" description="Context menu with multiple action options">
        <div className="relative inline-block">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            Actions
            <ChevronDownIcon size="sm" />
          </button>
          {menuOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-10">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Edit shift
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Delete shift
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                Mark as absent
              </button>
            </div>
          )}
        </div>
      </ComponentSection>

      <ComponentSection title="Breadcrumb Trail" description="Navigation showing user location">
        <nav className="flex items-center gap-2 text-sm text-gray-700">
          <a href="#" className="hover:text-emerald-600">Home</a>
          <span className="text-gray-400">/</span>
          <a href="#" className="hover:text-emerald-600">Employees</a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">John Doe</span>
        </nav>
      </ComponentSection>

      <ComponentSection title="Link" description="Text-based navigation element">
        <div className="flex flex-col gap-2">
          <a href="#" className="text-gray-700 underline hover:text-emerald-600 transition-colors">
            Default link
          </a>
          <a href="#" className="text-emerald-600 underline hover:text-emerald-700 transition-colors">
            Primary link
          </a>
        </div>
      </ComponentSection>

      <ComponentSection title="Tabset" description="Horizontal navigation for switching views">
        <div className="flex gap-0 border-b border-gray-200">
          {['Overview', 'Details', 'History'].map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === index
                  ? 'border-emerald-700 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Action Header" description="Header with title and action button">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Section Title</h3>
          <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700">
            Action
          </button>
        </div>
      </ComponentSection>
    </div>
  );
}

// Form Inputs Components
function FormInputsShowcase() {
  const [textValue, setTextValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [radioValue, setRadioValue] = useState('option1');
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [toggleOn, setToggleOn] = useState(false);
  const [stepperValue, setStepperValue] = useState(0);

  return (
    <div className="space-y-8">
      <ComponentSection title="Text Field" description="Standard text input with states">
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Label</label>
            <input
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="Enter text..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Error State</label>
            <input
              type="text"
              className="w-full px-3 py-2 border-2 border-red-600 rounded-lg focus:outline-none"
            />
            <p className="mt-1 text-sm text-red-600">Error message</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Disabled</label>
            <input
              type="text"
              disabled
              value="Disabled input"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed opacity-50"
            />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Text Area" description="Multi-line text input">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
          <textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            rows={4}
            placeholder="Enter description..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </ComponentSection>

      <ComponentSection title="Search Field" description="Specialized search input">
        <div className="max-w-md relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="sm" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </ComponentSection>

      <ComponentSection title="Dropdown Menu" description="Selection input with options">
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Select Option</label>
            <select
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Choose...</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Radio Button" description="Single choice selection">
        <div className="space-y-2">
          {['Option 1', 'Option 2', 'Option 3'].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                value={option.toLowerCase().replace(' ', '')}
                checked={radioValue === option.toLowerCase().replace(' ', '')}
                onChange={(e) => setRadioValue(e.target.value)}
                className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Checkbox" description="Multiple selection control">
        <div className="space-y-2">
          {['Checkbox 1', 'Checkbox 2', 'Checkbox 3'].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxValues.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCheckboxValues([...checkboxValues, option]);
                  } else {
                    setCheckboxValues(checkboxValues.filter((v) => v !== option));
                  }
                }}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Toggle" description="Binary on/off switch">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={toggleOn}
              onChange={(e) => setToggleOn(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                toggleOn ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  toggleOn ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`}
              />
            </div>
            <span className="text-sm text-gray-700">Toggle {toggleOn ? 'On' : 'Off'}</span>
          </label>
        </div>
      </ComponentSection>

      <ComponentSection title="Stepper" description="Numeric input with increment/decrement">
        <div className="flex items-center border border-gray-200 rounded-lg w-fit">
          <button
            onClick={() => setStepperValue(Math.max(0, stepperValue - 1))}
            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border-r border-gray-200"
          >
            −
          </button>
          <input
            type="number"
            value={stepperValue}
            onChange={(e) => setStepperValue(parseInt(e.target.value) || 0)}
            className="w-16 px-3 py-2 text-center border-0 focus:outline-none"
          />
          <button
            onClick={() => setStepperValue(stepperValue + 1)}
            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border-l border-gray-200"
          >
            +
          </button>
        </div>
      </ComponentSection>

      <ComponentSection title="Tag Field" description="Input for multiple tags">
        <div className="max-w-md border border-gray-200 rounded-lg p-2 min-h-[40px] flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded flex items-center gap-1">
            Tag 1
            <button className="text-gray-400 hover:text-gray-600">
              <XIcon size="sm" />
            </button>
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded flex items-center gap-1">
            Tag 2
            <button className="text-gray-400 hover:text-gray-600">
              <XIcon size="sm" />
            </button>
          </span>
          <input
            type="text"
            placeholder="Add tag..."
            className="flex-1 min-w-[100px] border-0 focus:outline-none"
          />
        </div>
      </ComponentSection>

      <ComponentSection title="Filter" description="Pill showing applied filters">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white border border-gray-200 text-gray-700 text-sm rounded-full flex items-center gap-2">
            Filter: Active
            <button className="text-gray-400 hover:text-gray-600">
              <XIcon size="sm" />
            </button>
          </span>
          <span className="px-3 py-1 bg-white border border-gray-200 text-gray-700 text-sm rounded-full flex items-center gap-2">
            Department: Sales
            <button className="text-gray-400 hover:text-gray-600">
              <XIcon size="sm" />
            </button>
          </span>
        </div>
      </ComponentSection>
    </div>
  );
}

// Date & Time Components
function DateTimeShowcase() {
  return (
    <div className="space-y-8">
      <ComponentSection title="Date Selector" description="Input for selecting dates">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-900 mb-1">Select Date</label>
          <div className="relative">
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Icon name="Calendar" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="sm" />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Date Selector Picker Panel" description="Calendar interface">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeftIcon size="sm" />
            </button>
            <h3 className="text-sm font-semibold text-gray-900">January 2024</h3>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRightIcon size="sm" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="text-center py-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2;
              const isToday = day === 15;
              const isSelected = day === 15;
              const isOtherMonth = day < 1 || day > 31;
              return (
                <button
                  key={i}
                  className={`h-8 rounded text-sm ${
                    isSelected
                      ? 'bg-emerald-700 text-white'
                      : isToday
                      ? 'bg-gray-100 text-gray-900'
                      : isOtherMonth
                      ? 'text-gray-300'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {day > 0 && day <= 31 ? day : ''}
                </button>
              );
            })}
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}

// Tables & Data Display Components
function TablesDataShowcase() {
  return (
    <div className="space-y-8">
      <ComponentSection title="Table" description="Structured data display">
        <div className="overflow-x-auto -mx-6">
          <table className="w-full border-t border-gray-200">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'John Doe', department: 'Sales', status: 'Active' },
                { name: 'Jane Smith', department: 'Marketing', status: 'Active' },
                { name: 'Bob Johnson', department: 'Engineering', status: 'Inactive' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.department}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-emerald-600 hover:text-emerald-700">
                      <EditIcon size="sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentSection>

      <ComponentSection title="Pagination" description="Page navigation controls">
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
            <ChevronLeftIcon size="sm" />
          </button>
          <button className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-900">
            1
          </button>
          <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
            2
          </button>
          <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
            3
          </button>
          <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
            Next
          </button>
          <span className="text-sm text-gray-500 ml-4">Showing 1-10 of 25 results</span>
        </div>
      </ComponentSection>

      <ComponentSection title="List Item" description="Individual items in lists">
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
          {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
            <div key={i} className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between">
              <span className="text-sm text-gray-700">{item}</span>
              <button className="text-gray-400 hover:text-gray-600">
                <ChevronRightIcon size="sm" />
              </button>
            </div>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Description Table" description="Key-value pairs">
        <div className="overflow-x-auto -mx-6">
          <table className="w-full border-t border-gray-200">
            <tbody className="divide-y divide-gray-200">
              {[
                { label: 'Name', value: 'John Doe' },
                { label: 'Email', value: 'john@example.com' },
                { label: 'Department', value: 'Sales' },
                { label: 'Status', value: 'Active' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 bg-gray-50 text-sm font-medium text-gray-700 w-1/3">
                    {row.label}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentSection>
    </div>
  );
}

// Feedback & Status Components
function FeedbackStatusShowcase() {
  return (
    <div className="space-y-8">
      <ComponentSection title="Banner" description="Full-width notification bar">
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <InformationCircleIcon className="text-indigo-600 flex-shrink-0 mt-0.5" size="sm" />
              <div>
                <strong className="font-medium">Info:</strong> This is an informational banner.
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <ExclamationTriangleIcon className="text-amber-700 flex-shrink-0 mt-0.5" size="sm" />
              <div>
                <strong className="font-medium">Warning:</strong> This is a warning banner.
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckIcon className="text-green-700 flex-shrink-0 mt-0.5" size="sm" />
              <div>
                <strong className="font-medium">Success:</strong> This is a success banner.
              </div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <ExclamationTriangleIcon className="text-red-600 flex-shrink-0 mt-0.5" size="sm" />
              <div>
                <strong className="font-medium">Error:</strong> This is an error banner.
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Toast" description="Temporary notification">
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckIcon className="text-white" size="sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Success</p>
              <p className="text-sm text-gray-500">Action completed successfully</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <XIcon size="sm" />
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md">
            <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center flex-shrink-0">
              <XIcon className="text-white" size="sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Failure</p>
              <p className="text-sm text-gray-500">Action failed to complete</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <XIcon size="sm" />
            </button>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Pill" description="Status indicator badge">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
            Success
          </span>
          <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200">
            Warning
          </span>
          <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full border border-red-200">
            Error
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200">
            Neutral
          </span>
          <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full border border-indigo-200">
            Info
          </span>
          <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded-full">
            High Contrast
          </span>
        </div>
      </ComponentSection>

      <ComponentSection title="Loading Spinner" description="Animated progress indicator">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin" />
          <span className="text-sm text-gray-700">Loading...</span>
        </div>
      </ComponentSection>

      <ComponentSection title="Tooltip" description="Hover information popup">
        <div className="relative inline-block group">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Hover for tooltip
          </button>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            <p className="text-sm font-medium text-gray-900 mb-1">Tooltip Heading</p>
            <p className="text-xs text-gray-500">This is the tooltip body text with additional information.</p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200" />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Hover Hint" description="Information icon with tooltip">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-900">Field Label</label>
          <div className="relative inline-block group">
            <InformationCircleIcon className="text-gray-400 cursor-help" size="sm" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-xs text-gray-500">
              This field requires additional information
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Summary Panel" description="Panel displaying summarized information">
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Employees</span>
              <span className="text-gray-900 font-medium">125</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active Shifts</span>
              <span className="text-gray-900 font-medium">45</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pending Reviews</span>
              <span className="text-amber-700 font-medium flex items-center gap-1">
                <ExclamationTriangleIcon size="sm" />
                12
              </span>
            </div>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}

// Modals & Overlays Components
function ModalsOverlaysShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <ComponentSection title="Modal View Template" description="Generic modal template">
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Open Modal
        </button>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900 bg-opacity-75" onClick={() => setModalOpen(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Modal Title</h2>
                <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <XIcon size="md" />
                </button>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-700">Modal content goes here...</p>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </ComponentSection>

      <ComponentSection title="Dialogue" description="Confirmation dialog">
        <div className="space-y-4">
          <button
            onClick={() => setDialogOpen(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Open Dialog
          </button>
          {dialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-gray-900 bg-opacity-75" onClick={() => setDialogOpen(false)} />
              <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Action</h3>
                <p className="text-sm text-gray-700 mb-6">Are you sure you want to proceed with this action?</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDialogOpen(false)}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setDialogOpen(false)}
                    className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ComponentSection>

      <ComponentSection title="Overlay" description="Modal backdrop">
        <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <span className="text-white text-sm">Overlay backdrop</span>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}

// Content Display Components
function ContentDisplayShowcase() {
  return (
    <div className="space-y-8">
      <ComponentSection title="Avatar" description="User image, icon, or initials">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700">
            JD
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Icon name="User" size="md" className="text-gray-500" />
          </div>
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-lg font-medium text-emerald-700">
            AB
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Tag" description="Removable label">
        <div className="flex flex-wrap gap-2">
          {['Tag 1', 'Tag 2', 'Tag 3'].map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded flex items-center gap-1"
            >
              {tag}
              <button className="text-gray-400 hover:text-gray-600">
                <XIcon size="sm" />
              </button>
            </span>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Counter" description="Notification badge">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Icon name="Bell" size="md" className="text-gray-500" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </div>
          <div className="relative">
            <Icon name="Mail" size="md" className="text-gray-500" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
              12
            </span>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Divider" description="Visual separator">
        <div className="space-y-4">
          <p className="text-sm text-gray-700">Content above</p>
          <hr className="border-gray-200" />
          <p className="text-sm text-gray-700">Content below</p>
        </div>
      </ComponentSection>

      <ComponentSection title="Accordion" description="Expandable content section">
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
          {[
            { title: 'Section 1', content: 'Content for section 1' },
            { title: 'Section 2', content: 'Content for section 2' },
            { title: 'Section 3', content: 'Content for section 3' },
          ].map((section, i) => (
            <details key={i} className="group">
              <summary className="px-4 py-3 cursor-pointer flex items-center justify-between hover:bg-gray-50">
                <span className="text-sm font-medium text-gray-900">{section.title}</span>
                <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" size="sm" />
              </summary>
              <div className="px-4 py-3 bg-gray-50 text-sm text-gray-700">{section.content}</div>
            </details>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Section Headings" description="Standardized heading component">
        <div className="space-y-4">
          <h1 className="text-[30px] leading-[36px] font-semibold text-black border-b border-black pb-1">
            Large Heading
          </h1>
          <h2 className="text-[20px] leading-[28px] font-semibold text-black border-b border-black pb-1">
            Small Heading
          </h2>
        </div>
      </ComponentSection>

      <ComponentSection title="Empty State Illustration" description="No data view">
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon name="Document" size="lg" className="text-gray-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">No data available</h3>
          <p className="text-sm text-gray-500">There are no items to display at this time.</p>
        </div>
      </ComponentSection>

      <ComponentSection title="Sticky Footer" description="Fixed footer at bottom">
        <div className="relative h-64 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4">Scrollable content area...</div>
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
              Save
            </button>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}

// Chat Components
function ChatComponentsShowcase() {
  return (
    <div className="space-y-8">
      <ComponentSection title="Chat Bubble" description="Message container">
        <div className="space-y-4 max-w-md">
          <div className="flex justify-end">
            <div className="bg-indigo-50 rounded-lg px-4 py-2 max-w-[80%]">
              <p className="text-sm text-gray-700">Sent message</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 max-w-[80%]">
              <p className="text-sm text-gray-700">Received message</p>
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Chat Date Label" description="Date separator in chat">
        <div className="max-w-md">
          <div className="text-center mb-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              Today
            </span>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
            <p className="text-sm text-gray-700">Message content</p>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Chat Reactions" description="Message reactions">
        <div className="bg-white border border-gray-200 rounded-lg p-2 inline-flex items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded">👍</button>
          <button className="p-1 hover:bg-gray-100 rounded">👎</button>
          <button className="p-1 hover:bg-gray-100 rounded">😂</button>
          <button className="p-1 hover:bg-gray-100 rounded">❤️</button>
        </div>
      </ComponentSection>

      <ComponentSection title="Chat Attachment" description="File attachment preview">
        <div className="bg-white border border-gray-400 rounded-lg p-4 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <Icon name="Document" size="md" className="text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">document.pdf</p>
              <p className="text-xs text-gray-500">2.4 MB</p>
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Quoted Message" description="Referenced message">
        <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-md">
          <div className="bg-gray-100 border-l-2 border-gray-300 pl-3 py-2 mb-3">
            <p className="text-xs font-medium text-gray-700 mb-1">Original sender</p>
            <p className="text-xs text-gray-600">Quoted message content</p>
          </div>
          <p className="text-sm text-gray-700">Reply message content</p>
        </div>
      </ComponentSection>
    </div>
  );
}

// Application-Specific Components
function ApplicationSpecificShowcase() {
  return (
    <div className="space-y-8">
      <ComponentSection title="Insight/Action" description="Card for insights and actions">
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 max-w-md">
          <h3 className="text-sm font-medium text-white mb-2">Action Required</h3>
          <p className="text-sm text-gray-300 mb-4">Review pending shift assignments</p>
          <button className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700">
            Take Action
          </button>
        </div>
      </ComponentSection>

      <ComponentSection title="Photograph" description="Image component">
        <div className="border border-gray-200 rounded-lg overflow-hidden w-48 h-32 bg-gray-100 flex items-center justify-center">
          <Icon name="Photograph" size="lg" className="text-gray-400" />
        </div>
      </ComponentSection>

      <ComponentSection title="Information Circle" description="Info icon">
        <div className="flex items-center gap-4">
          <InformationCircleIcon className="text-gray-500" size="md" />
          <InformationCircleIcon className="text-indigo-600" size="md" />
        </div>
      </ComponentSection>
    </div>
  );
}

// Helper component for sections
function ComponentSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default DesignSystemShowcase;
