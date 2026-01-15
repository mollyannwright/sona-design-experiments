# Sona Component Snippets

Quick copy-paste snippets for common Sona UI patterns. All snippets use Tailwind CSS classes that match the design tokens.

**PRIMARY REFERENCE**: `example-sona-UI-screens/side-navigation.html`

---

## Side Navigation (REQUIRED FOR ALL PROTOTYPES)

### Complete Sidebar Structure

```tsx
{/* Sidebar - MUST be 280px wide */}
<aside className="w-[280px] bg-white border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0">
  
  {/* Logo Header - padding: 16px 24px */}
  <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
    <span className="text-2xl font-semibold text-emerald-500">Sona.</span>
    <button className="text-lg text-gray-500 hover:text-gray-700 lg:hidden">☰</button>
  </div>
  
  {/* Navigation Content - padding: 24px 0 */}
  <nav className="py-6">
    {/* Section */}
    <div className="mb-8">
      <div className="px-6 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em]">
        Business Wide
      </div>
      
      {/* Nav items go here */}
    </div>
  </nav>
</aside>
```

### Sidebar Navigation Item (Default)

```tsx
<a href="#" className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
  <span className="w-5 mr-3 text-center">🏠</span>
  Home
</a>
```

### Sidebar Navigation Item (Active)

```tsx
<a href="#" className="flex items-center px-6 py-3 text-sm font-medium text-sky-700 bg-sky-50 border-r-[3px] border-sky-700">
  <span className="w-5 mr-3 text-center">📋</span>
  Roster
</a>
```

### Sidebar Navigation Item (With Notification Badge)

```tsx
<a href="#" className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
  <span className="w-5 mr-3 text-center">✅</span>
  Tasks
  <span className="ml-auto bg-red-500 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
    3
  </span>
</a>
```

### Section Title

```tsx
<div className="px-6 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em]">
  Section Title
</div>
```

### Full Navigation Menu (from side-navigation.html)

```tsx
const navigationItems = [
  { label: 'Home', icon: '🏠', path: '/' },
  { label: 'Roster', icon: '📋', path: '/roster' },
  { label: 'Revenues & Forecasts', icon: '💰', path: '/revenues' },
  { label: 'Employee Management', icon: '👥', path: '/employees' },
  { label: 'Agentic Workforce', icon: '🎯', path: '/agentic' },
  { label: 'Tasks', icon: '✅', path: '/tasks', badge: 3 },
  { label: 'Inbox', icon: '📧', path: '/inbox' },
  { label: 'Vacation', icon: '🏖️', path: '/vacation' },
  { label: 'Retention', icon: '🎯', path: '/retention' },
  { label: 'Payroll', icon: '💼', path: '/payroll' },
  { label: 'Insights', icon: '📊', path: '/insights' },
  { label: 'Feed', icon: '📰', path: '/feed' },
  { label: 'Chat', icon: '💬', path: '/chat', badge: 1 },
  { label: 'Admin', icon: '⚙️', path: '/admin' },
];

const supportItems = [
  { label: 'Select a location...', icon: '📍', path: '/locations' },
  { label: "What's new in Sona", icon: '🆕', path: '/whats-new' },
  { label: 'Support', icon: '❓', path: '/support' },
  { label: 'Settings', icon: '⚙️', path: '/settings' },
];
```

### Breadcrumb

```tsx
<nav className="flex items-center space-x-2 text-sm text-slate-500">
  <a href="#" className="hover:text-slate-700">Home</a>
  <span>/</span>
  <a href="#" className="hover:text-slate-700">Section</a>
  <span>/</span>
  <span className="text-slate-900 font-medium">Current Page</span>
</nav>
```

### Tab Navigation

```tsx
<div className="flex border-b border-slate-200">
  {/* Active tab */}
  <button className="px-4 py-3 text-sm font-medium text-emerald-700 border-b-2 border-emerald-700">
    Active Tab
  </button>
  {/* Inactive tab */}
  <button className="px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 border-b-2 border-transparent">
    Inactive Tab
  </button>
</div>
```

---

## Buttons

### All Button Variants

```tsx
// Primary
<button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
  Primary
</button>

// Secondary
<button className="px-4 py-2 bg-white hover:bg-slate-50 text-emerald-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors">
  Secondary
</button>

// Tertiary (text only)
<button className="px-4 py-2 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors">
  Tertiary
</button>

// Destructive Primary
<button className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors">
  Delete
</button>

// Destructive Secondary
<button className="px-4 py-2 bg-white hover:bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors">
  Remove
</button>

// Disabled
<button className="px-4 py-2 bg-slate-100 text-slate-400 text-sm font-medium rounded-lg cursor-not-allowed" disabled>
  Disabled
</button>

// Loading
<button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg flex items-center gap-2" disabled>
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
  Loading...
</button>

// Icon Button
<button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
  {/* Icon SVG */}
</button>
```

### Button with Icon

```tsx
<button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  Add New
</button>
```

---

## Form Elements

### Text Input

```tsx
// Default
<div className="space-y-1.5">
  <label className="text-sm font-medium text-slate-900">Label</label>
  <input 
    type="text"
    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400"
    placeholder="Placeholder text"
  />
</div>

// With helper text
<div className="space-y-1.5">
  <label className="text-sm font-medium text-slate-900">Label</label>
  <input 
    type="text"
    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
  />
  <p className="text-xs text-slate-500">Helper text goes here</p>
</div>

// Error state
<div className="space-y-1.5">
  <label className="text-sm font-medium text-slate-900">Label</label>
  <input 
    type="text"
    className="w-full px-3 py-2 text-sm border-2 border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
  />
  <p className="text-xs text-red-600">Error message</p>
</div>

// Disabled
<div className="space-y-1.5">
  <label className="text-sm font-medium text-slate-900">Label</label>
  <input 
    type="text"
    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
    disabled
  />
</div>
```

### Textarea

```tsx
<div className="space-y-1.5">
  <label className="text-sm font-medium text-slate-900">Label</label>
  <textarea 
    rows={4}
    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
    placeholder="Enter description..."
  />
</div>
```

### Select/Dropdown

```tsx
<div className="space-y-1.5">
  <label className="text-sm font-medium text-slate-900">Label</label>
  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white">
    <option value="">Select option...</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</div>
```

### Checkbox

```tsx
<label className="flex items-center gap-2 cursor-pointer">
  <input 
    type="checkbox" 
    className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
  />
  <span className="text-sm text-slate-700">Checkbox label</span>
</label>
```

### Radio Button

```tsx
<div className="space-y-2">
  <label className="flex items-center gap-2 cursor-pointer">
    <input 
      type="radio" 
      name="option"
      className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
    />
    <span className="text-sm text-slate-700">Option 1</span>
  </label>
  <label className="flex items-center gap-2 cursor-pointer">
    <input 
      type="radio" 
      name="option"
      className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
    />
    <span className="text-sm text-slate-700">Option 2</span>
  </label>
</div>
```

### Toggle Switch

```tsx
// Using a custom toggle
<button 
  className={`relative w-11 h-6 rounded-full transition-colors ${
    isOn ? 'bg-emerald-600' : 'bg-slate-200'
  }`}
  onClick={() => setIsOn(!isOn)}
>
  <span 
    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
      isOn ? 'translate-x-5' : 'translate-x-0'
    }`}
  />
</button>
```

### Search Field

```tsx
<div className="relative">
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
  <input 
    type="search"
    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
    placeholder="Search..."
  />
</div>
```

---

## Status & Feedback

### Pills/Badges

```tsx
// Success
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-emerald-700 bg-green-50 border border-emerald-700/20 rounded-full">
  Active
</span>

// Warning
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-700/20 rounded-full">
  Pending
</span>

// Error
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-red-600 bg-red-50 border border-red-600/20 rounded-full">
  Failed
</span>

// Info
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-600/20 rounded-full">
  New
</span>

// Neutral
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded-full">
  Draft
</span>

// High Contrast
<span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-white bg-slate-700 rounded-full">
  Premium
</span>
```

### Banner/Alert

```tsx
// Info
<div className="p-4 bg-indigo-50 border border-indigo-600/20 rounded-lg flex items-start gap-3">
  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <div>
    <p className="text-sm font-medium text-slate-900">Information</p>
    <p className="text-sm text-slate-600 mt-1">This is an informational message.</p>
  </div>
</div>

// Success
<div className="p-4 bg-green-50 border border-emerald-700/20 rounded-lg flex items-start gap-3">
  <svg className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <p className="text-sm text-slate-700">Successfully saved!</p>
</div>

// Warning
<div className="p-4 bg-amber-50 border border-amber-700/20 rounded-lg flex items-start gap-3">
  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
  <p className="text-sm text-slate-700">Please review before continuing.</p>
</div>

// Error
<div className="p-4 bg-red-50 border border-red-600/20 rounded-lg flex items-start gap-3">
  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <p className="text-sm text-slate-700">Something went wrong. Please try again.</p>
</div>
```

### Toast Notification

```tsx
// Success Toast
<div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-slate-200 p-4 flex items-center gap-3 animate-slide-up">
  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  </div>
  <p className="text-sm font-medium text-slate-900">Changes saved successfully</p>
  <button className="ml-2 text-slate-400 hover:text-slate-600">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>
```

---

## Cards & Containers

### Basic Card

```tsx
<div className="bg-white rounded-lg border border-slate-200 p-6">
  <h3 className="text-lg font-semibold text-slate-900 mb-2">Card Title</h3>
  <p className="text-sm text-slate-600">Card content goes here.</p>
</div>
```

### Card with Header

```tsx
<div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
    <h3 className="text-lg font-semibold text-slate-900">Section Title</h3>
  </div>
  <div className="p-6">
    {/* Content */}
  </div>
</div>
```

### Summary/Stats Card

```tsx
<div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
  <div className="text-3xl font-bold text-emerald-600 mb-2">127</div>
  <div className="text-sm font-medium text-slate-500">Active Users</div>
</div>
```

### Clickable Card

```tsx
<div className="bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 hover:shadow-sm cursor-pointer transition-all">
  <h3 className="text-lg font-semibold text-slate-900 mb-2">Clickable Card</h3>
  <p className="text-sm text-slate-600">Click to view details</p>
  <div className="mt-4 flex items-center text-sm text-slate-500">
    <span>View details</span>
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
</div>
```

---

## Tables

### Basic Table

```tsx
<div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
  <table className="w-full">
    <thead>
      <tr className="bg-slate-50 border-b border-slate-200">
        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Role
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Status
        </th>
        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
      <tr className="hover:bg-slate-50 transition-colors">
        <td className="px-6 py-4 text-sm font-medium text-slate-900">Sarah Johnson</td>
        <td className="px-6 py-4 text-sm text-slate-600">Care Assistant</td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-emerald-700 bg-green-50 border border-emerald-700/20 rounded-full">
            Active
          </span>
        </td>
        <td className="px-6 py-4 text-right">
          <button className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Pagination

```tsx
<div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
  <p className="text-sm text-slate-600">
    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">97</span> results
  </p>
  <div className="flex items-center gap-2">
    <button className="px-3 py-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
      Previous
    </button>
    <button className="px-3 py-1.5 text-sm text-white bg-slate-700 rounded">1</button>
    <button className="px-3 py-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50">2</button>
    <button className="px-3 py-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50">3</button>
    <button className="px-3 py-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50">
      Next
    </button>
  </div>
</div>
```

---

## Modals

### Confirmation Dialog

```tsx
<div className="fixed inset-0 bg-slate-500/75 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
    <div className="p-6 text-center">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete item?</h3>
      <p className="text-sm text-slate-600">This action cannot be undone. Are you sure you want to continue?</p>
    </div>
    <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
      <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">
        Cancel
      </button>
      <button className="px-4 py-2 text-sm font-medium bg-red-700 hover:bg-red-800 text-white rounded-lg">
        Delete
      </button>
    </div>
  </div>
</div>
```

---

## Avatars

```tsx
// Image Avatar
<img 
  src="avatar.jpg" 
  alt="User name"
  className="w-10 h-10 rounded-full object-cover"
/>

// Initials Avatar
<div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
  <span className="text-sm font-medium text-slate-600">SJ</span>
</div>

// Icon Avatar
<div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
</div>

// Size variants
<div className="w-8 h-8 rounded-full bg-slate-100" /> {/* Small */}
<div className="w-10 h-10 rounded-full bg-slate-100" /> {/* Medium */}
<div className="w-12 h-12 rounded-full bg-slate-100" /> {/* Large */}
```

---

## Empty States

```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  </div>
  <h3 className="text-lg font-semibold text-slate-900 mb-1">No items yet</h3>
  <p className="text-sm text-slate-500 mb-4">Get started by creating your first item.</p>
  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
    Create Item
  </button>
</div>
```

---

## Loading States

### Spinner

```tsx
<svg className="animate-spin h-5 w-5 text-emerald-600" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
</svg>
```

### Skeleton Loading

```tsx
// Text skeleton
<div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />

// Card skeleton
<div className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse">
  <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
  <div className="space-y-2">
    <div className="h-4 bg-slate-200 rounded" />
    <div className="h-4 bg-slate-200 rounded w-5/6" />
  </div>
</div>
```
