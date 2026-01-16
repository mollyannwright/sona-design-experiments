# SonaUI Design System Prototype

Interactive component showcase for the SonaUI design system, similar to Storybook. This prototype demonstrates all components from the design system with interactive examples and variants.

## Route

Accessible at: `/design-system`

## Component Categories

The showcase is organized into the following categories:

1. **Buttons & Navigation** - Buttons, toggles, menus, breadcrumbs, links, tabs, action headers
2. **Form Inputs** - Text fields, textareas, search, dropdowns, radio buttons, checkboxes, toggles, steppers, tag fields, filters
3. **Date & Time** - Date selectors, date picker panels
4. **Tables & Data** - Tables, pagination, list items, description tables
5. **Feedback & Status** - Banners, toasts, pills, loading spinners, tooltips, hover hints, summary panels
6. **Modals & Overlays** - Modal templates, dialogs, overlays
7. **Content Display** - Avatars, tags, counters, dividers, accordions, section headings, empty states, sticky footers
8. **Chat Components** - Chat bubbles, date labels, reactions, attachments, quoted messages
9. **Application Specific** - Insights/actions, photographs, information circles

## Usage

Navigate through categories using the top navigation bar. Each component includes:
- Title and description
- Interactive examples
- Multiple variants and states
- Real-time interaction

## Design Tokens

All components use design tokens from `/sonaui-design-system/tokens`:
- Colors: Semantic colors for text, backgrounds, borders, states
- Spacing: Consistent spacing scale (0.25x to 5x)
- Radius: Border radius values (0.5x to infinite)
- Typography: Lexend font family with defined weights and sizes

---

# New Components

This section documents components found in prototypes that are **not** part of the standard SonaUI design system. These are custom components created for specific prototype needs.

## 1. SquiggleText Component

**Location:** `prototype-outputs/labour-rules-low-fi/LabourRulesLowFi.tsx`

**Purpose:** Creates hand-drawn style squiggle lines for low-fidelity wireframes. Used to represent paragraph blocks of text in wireframe prototypes.

**Variants:**
- Height: Configurable (default: 16px)
- Rows: Multiple rows of squiggles (default: 1)
- Customizable className for styling

**Usage:**
```tsx
<SquiggleText height={16} rows={2} className="my-4" />
```

**Design Notes:**
- Creates wavy, hand-drawn style patterns using SVG paths
- Uses cubic bezier curves for natural wave appearance
- Pattern repeats horizontally
- Used exclusively in low-fidelity wireframe prototypes

**Link:** [Labour Rules Low-Fi Prototype](/labour-rules-low-fi)

---

## 2. Compliance Rate Progress Bar

**Location:** `prototype-outputs/compliance-dashboard/ComplianceDashboard.tsx` (lines 390-400)

**Purpose:** Visual indicator showing compliance percentage as a progress bar with color coding based on compliance rate.

**Variants:**
- **100% Compliant:** Green (`bg-emerald-600`)
- **75-99% Compliant:** Amber (`bg-amber-500`)
- **<75% Compliant:** Red (`bg-red-600`)

**Usage:**
```tsx
<div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
  <div
    className={`h-2 rounded-full ${
      complianceRate === 100
        ? 'bg-emerald-600'
        : complianceRate >= 75
        ? 'bg-amber-500'
        : 'bg-red-600'
    }`}
    style={{ width: `${complianceRate}%` }}
  />
</div>
```

**Design Notes:**
- Uses semantic colors matching Pill component (Success/Warning/Error)
- Shows percentage visually with color coding
- Typically displayed alongside percentage text
- Max width constraint for consistent sizing

**Link:** [Compliance Dashboard Prototype](/compliance)

---

## 3. Status Badge (Custom Variants)

**Location:** Multiple prototypes use custom status badge implementations

**Purpose:** Displays status information with color-coded backgrounds and borders. While similar to the Pill component, these prototypes use custom implementations with specific status values.

**Variants Found:**

### Compliance Dashboard Statuses:
- **Compliant:** Green background (`bg-green-50`), green text (`text-green-700`), green border (`border-green-200`)
- **Expiring Soon:** Amber background (`bg-amber-50`), amber text (`text-amber-700`), amber border (`border-amber-200`)
- **Expired:** Red background (`bg-red-50`), red text (`text-red-700`), red border (`border-red-200`)
- **Missing:** Gray background (`bg-gray-50`), gray text (`text-gray-700`), gray border (`border-gray-200`)

### PWS Config Statuses:
- **Active:** Green variant
- **Pending:** Amber variant
- **Inactive:** Gray variant

**Usage:**
```tsx
<span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
  Compliant
</span>
```

**Design Notes:**
- Follows Pill component pattern but with specific status values
- Uses same color tokens as Pill component (Success/Warning/Error/Neutral)
- Rounded-full for pill shape
- Small text size (text-xs)

**Links:**
- [Compliance Dashboard](/compliance)
- [PWS Config Prototype](/pws-config)

---

## 4. Summary Cards (Dashboard Metrics)

**Location:** `prototype-outputs/compliance-dashboard/ComplianceDashboard.tsx` (lines 150-205)

**Purpose:** Displays key metrics in card format with icons, values, and labels. Used for dashboard overview sections.

**Variants:**
- Icon + Value + Label format
- Optional subtitle/secondary text
- Hover states
- Clickable (optional)

**Usage:**
```tsx
<div className="bg-white rounded-lg border border-gray-200 p-6">
  <div className="flex items-center gap-3 mb-2">
    <Icon name="Check circle" className="text-green-600" />
    <div>
      <div className="text-2xl font-semibold text-gray-900">125</div>
      <div className="text-xs text-gray-500">Compliant employees</div>
    </div>
  </div>
</div>
```

**Design Notes:**
- White background with border
- Icon positioned left of content
- Large number (text-2xl) for emphasis
- Small label text below value
- Optional secondary metric text

**Link:** [Compliance Dashboard](/compliance)

---

## 5. Formula Editor

**Location:** `prototype-outputs/labour-rules-configuration/LabourRules.tsx`

**Purpose:** Text input with syntax highlighting and validation for creating formula-based rules. Includes attribute suggestions and formula parsing.

**Variants:**
- Multi-line textarea for formula input
- Syntax validation
- Attribute autocomplete/suggestions
- Error highlighting
- Formula preview

**Usage:**
```tsx
<textarea
  value={formula}
  onChange={(e) => setFormula(e.target.value)}
  placeholder="Enter formula (e.g., hours > 40)"
  className="font-mono text-sm"
/>
```

**Design Notes:**
- Uses monospace font for formula readability
- Includes validation feedback
- Shows available attributes for reference
- Supports complex expressions with operators

**Link:** [Labour Rules Configuration](/labour-rules)

---

## 6. Bulk Edit Table

**Location:** `prototype-outputs/labour-rules-configuration/LabourRules.tsx`

**Purpose:** Table interface for editing multiple rows simultaneously with bulk actions and inline editing.

**Variants:**
- Inline editing cells
- Bulk selection (checkboxes)
- Bulk actions toolbar
- Save/Cancel controls
- Validation feedback

**Design Notes:**
- Standard table structure with editable cells
- Checkbox column for selection
- Action buttons for bulk operations
- Visual feedback for edited cells
- Save state management

**Link:** [Labour Rules Configuration](/labour-rules)

---

## 7. Date Range Selector

**Location:** `prototype-outputs/labour-rules-configuration/LabourRules.tsx` and `prototype-outputs/pws-config/PWSConfig.tsx`

**Purpose:** Dual date inputs for selecting start and end dates for date ranges (e.g., ruleset assignments, care package effective dates).

**Variants:**
- From/To date inputs
- Single date input
- Date validation (end date after start date)
- Calendar picker integration

**Usage:**
```tsx
<div className="flex gap-4">
  <div>
    <label>From</label>
    <input type="date" />
  </div>
  <div>
    <label>To</label>
    <input type="date" />
  </div>
</div>
```

**Design Notes:**
- Two date inputs side by side
- Labels above inputs
- Validation ensures logical date ranges
- Uses standard date input styling

**Links:**
- [Labour Rules Configuration](/labour-rules)
- [PWS Config Prototype](/pws-config)

---

## 8. Tab Navigation with Content

**Location:** Multiple prototypes

**Purpose:** Tab-based navigation for switching between different views within a page. While Tabset exists in design system, these implementations include full content switching.

**Variants:**
- Horizontal tabs
- Active/inactive states
- Content panels below tabs
- Tab-specific filters and actions

**Design Notes:**
- Uses Tabset component pattern
- Content area changes based on active tab
- Each tab can have its own state and filters
- Maintains state when switching tabs

**Links:**
- [Compliance Dashboard](/compliance) - Right to Work / Policy Acknowledgements tabs
- [Labour Rules Configuration](/labour-rules) - Attributes / Org Unit Attributes / Rulesets / Assignments tabs
- [PWS Config Prototype](/pws-config) - Multiple tab sets

---

## 9. Nested Detail View

**Location:** `prototype-outputs/pws-config/PWSConfig.tsx`

**Purpose:** Drill-down interface showing detail view of a selected item (e.g., care package detail, shift detail) with back navigation.

**Variants:**
- Back button/link
- Detail card with sections
- Related data tables
- Action buttons in header

**Design Notes:**
- Back navigation to parent view
- Full-width detail card
- Sections separated by borders
- Related data in nested tables
- Actions in header or footer

**Link:** [PWS Config Prototype](/pws-config)

---

## 10. Filter Bar with Search

**Location:** Multiple prototypes

**Purpose:** Combined search and filter controls above data tables. While Search Field and Filter components exist separately, these combine them into a unified interface.

**Variants:**
- Search input with icon
- Dropdown filters
- Applied filter pills
- Clear all filters action

**Design Notes:**
- Search input on left (flex-1)
- Filter dropdowns on right
- Applied filters shown as removable pills
- Consistent spacing and alignment

**Links:**
- [Compliance Dashboard](/compliance)
- [Labour Rules Configuration](/labour-rules)

---

## Recommendations

### Components to Consider Adding to Design System:

1. **Progress Bar** - The compliance rate progress bar pattern is reusable and could be standardized
2. **Summary Card** - Dashboard metric cards are common and could benefit from standardization
3. **Date Range Selector** - Dual date inputs for ranges are frequently used
4. **Bulk Edit Table** - Pattern for editing multiple rows could be a reusable component
5. **Nested Detail View** - Drill-down pattern with back navigation is common

### Components That Are Prototype-Specific:

1. **SquiggleText** - Only for low-fidelity wireframes, not needed in production
2. **Formula Editor** - Very specific to Labour Rules use case
3. **Custom Status Badges** - Should use standard Pill component with status variants instead

---

## Component Comparison

| Component | In Design System? | Prototype Location | Recommendation |
|-----------|-------------------|-------------------|----------------|
| SquiggleText | No | labour-rules-low-fi | Keep as prototype-only |
| Progress Bar | No | compliance-dashboard | Consider adding to design system |
| Status Badge (custom) | Yes (as Pill) | Multiple | Use Pill component instead |
| Summary Card | Partial (Summary Panel) | compliance-dashboard | Consider standardizing |
| Formula Editor | No | labour-rules-configuration | Keep as prototype-specific |
| Bulk Edit Table | No | labour-rules-configuration | Consider adding to design system |
| Date Range Selector | No | Multiple | Consider adding to design system |
| Tab Navigation | Yes (Tabset) | Multiple | Using correctly |
| Nested Detail View | No | pws-config | Consider adding pattern to design system |
| Filter Bar | Partial | Multiple | Document as pattern |

---

## Notes

- All new components follow SonaUI design tokens (colors, spacing, typography)
- Components are built with React and Tailwind CSS
- Interactive examples are provided in the main showcase
- Components can be copied and adapted for new prototypes
- When creating new prototypes, prefer standard design system components when possible
