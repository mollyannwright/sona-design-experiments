---
name: sona-prototype-builder
description: This skill should be used when users want to create, iterate on, or build interactive UI prototypes and experiments following the SonaUI design system. It enables rapid creation of wireframes, mockups, and functional prototypes that can be easily hosted online for stakeholder review. Use this skill for any request involving UI design, prototype creation, dashboard building, form design, or visual interface development.
alwaysApply: false
---

# Sona Prototype Builder

This skill enables rapid creation of interactive UI prototypes and experiments using the SonaUI design system. All prototypes are built with React + Vite + Tailwind CSS for easy online hosting and sharing.

## Quick Commands

**When user asks to "create a link" or "deploy this prototype":**

```bash
# Deploy and get shareable URL
cd "/Users/molly/Documents/UI Experiments"
vercel --prod

# Or check existing deployments
vercel ls

# Get production URL
vercel inspect
```

**Repository:** `https://github.com/mollyannwright/sona-design-experiments`  
**Production URL:** `https://sona-design-experiments.vercel.app` (after first deployment)

---

## Resource Locations

### Design System Sources (Priority Order)

| Priority | Resource | Path | Use For |
|----------|----------|------|---------|
| **1** | Design Tokens | `/Users/molly/Documents/UI Experiments/sonaui-design-system/tokens` | Colors, spacing, radius values |
| **2** | Components Reference | `/Users/molly/Documents/UI Experiments/sonaui-design-system/components` | Component patterns and color tokens |
| **3** | Typography Reference | `/Users/molly/Documents/UI Experiments/sonaui-design-system/Sona typography.png` | Font styles and sizing |
| **4** | **Icons** | `/Users/molly/Documents/UI Experiments/sonaui-design-system/icons/` | **SVG icons - USE THESE instead of emoji** |
| **5** | Example Screens | `/Users/molly/Documents/UI Experiments/example-sona-UI-screens/` | Layout patterns, real implementations |

### Example Screen Reference

| Screen | File | Use For |
|--------|------|---------|
| **Side Navigation** | `side-navigation.html` | **PRIMARY** - Sidebar structure, nav items, notification badges |
| **Roster** | `roster.html`, `Roster.png` | Table layouts, filters, data grids, employee lists |
| **Payroll** | `payroll.html` | Dashboard cards, summary stats, grouped sections |
| **Modal** | `Modal example.png` | Modal dialogs, form layouts, action buttons |

**IMPORTANT**: Always use `side-navigation.html` as the reference for sidebar navigation. This is the canonical source for:
- Logo placement and sizing
- Navigation section structure
- Active/hover states
- Notification badge styling

### Prototype Output Location

All prototypes are created in: `/Users/molly/Documents/UI Experiments/`

---

## Design System Quick Reference

### Typography (Lexend Font)

| Style | Weight | Size / Line Height | Tailwind Classes |
|-------|--------|-------------------|------------------|
| **H1** | SemiBold (600) | 30px / 36px | `text-[30px] leading-[36px] font-semibold` |
| **H2** | SemiBold (600) | 20px / 28px | `text-[20px] leading-[28px] font-semibold` |
| **H3** | SemiBold (600) | 16px / 24px | `text-[16px] leading-[24px] font-semibold` |
| **Subtitle** | Light (300) | 16px / 24px | `text-[16px] leading-[24px] font-light` |
| **Body** | Light (300) | 14px / 20px | `text-[14px] leading-[20px] font-light` |
| **Body Bold** | Medium (500) | 14px / 20px | `text-[14px] leading-[20px] font-medium` |
| **Caption** | Light (300) | 12px / 16px | `text-[12px] leading-[16px] font-light` |
| **Caption Bold** | Medium (500) | 12px / 16px | `text-[12px] leading-[16px] font-medium` |
| **Micro** | Light (300) | 10px / 12px | `text-[10px] leading-[12px] font-light` |

**Typography Rules:**
- Use sentence casing for all headings (e.g., "Team members" not "Team Members")
- Body text optimal line length: 50-75 characters

### Color Tokens (Tailwind Equivalents)

#### Brand & Primary Actions
| Token | Hex | Tailwind |
|-------|-----|----------|
| Primary | `#059669` | `emerald-600` |
| Primary Dark | `#047857` | `emerald-700` |
| Primary Light | `#10b981` | `emerald-500` |

#### Text Colors
| Token | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| Text Primary | `#000000` | `black` | Headings, emphasis |
| Text Secondary | `#334155` | `slate-700` | Body text |
| Text Tertiary | `#64748B` | `slate-500` | Subtle text, icons |
| Text Inverted | `#FFFFFF` | `white` | On dark backgrounds |

#### Surface & Backgrounds
| Token | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| Surface Default | `#FFFFFF` | `white` | Cards, modals |
| Surface Subtle | `#F8FAFC` | `slate-50` | Hover states |
| Surface Strong | `#F1F5F9` | `slate-100` | Headers, disabled |
| Background | `#FBFDFD` | `gray-50` | Page background |

#### Border Colors
| Token | Hex | Tailwind |
|-------|-----|----------|
| Border Default | `#E2E8F0` | `slate-200` |
| Border Subtle | `#F1F5F9` | `slate-100` |
| Border Strong | `#94A3B8` | `slate-400` |

#### Status Colors
| Status | Background | Border | Text |
|--------|------------|--------|------|
| Success | `green-50` | `emerald-700/20` | `emerald-700` |
| Warning | `amber-50` | `amber-700/20` | `amber-700` |
| Error | `red-50` | `red-600/20` | `red-600` |
| Info | `indigo-50` | `indigo-600/20` | `indigo-600` |

### Spacing Scale (8px base)

| Token | Value | Tailwind |
|-------|-------|----------|
| 0.25x | 2px | `0.5` |
| 0.5x | 4px | `1` |
| Base | 8px | `2` |
| 1.5x | 12px | `3` |
| 2x | 16px | `4` |
| 3x | 24px | `6` |
| 4x | 32px | `8` |
| 5x | 40px | `10` |

### Border Radius

| Token | Value | Tailwind |
|-------|-------|----------|
| 0.5x | 4px | `rounded` |
| 0.75x | 6px | `rounded-md` |
| Base | 8px | `rounded-lg` |
| 1.5x | 12px | `rounded-xl` |
| 2x | 16px | `rounded-2xl` |
| Infinite | 1000px | `rounded-full` |

### Icons

**Path:** `/Users/molly/Documents/UI Experiments/sonaui-design-system/icons/`

**USE SVG ICONS** from this folder instead of emoji for production-quality prototypes.

| Category | Available Icons |
|----------|-----------------|
| Navigation | Home, Arrow (left/right/up/down), Chevron (all directions), Sidebar collapse/expand |
| Actions | Plus, Edit, Trash, Download, Upload, Search, Refresh, Share, Print |
| Communication | Chat, Mail, Bell, Phone, Send, Microphone |
| Status | Check, X, Exclamation, Information, Question mark (outline + solid variants) |
| User | User, Users, User add |
| Business | Calendar, Clock, Briefcase, Wallet, Currency, Chart bar, Office building |

**Icon Usage:**

```tsx
// Copy SVG content inline for color control
<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  {/* SVG path from icons folder */}
</svg>

// Or import as image
<img src="/sonaui-design-system/icons/Search.svg" className="w-5 h-5" alt="" />
```

**Icon Sizes:** `w-4 h-4` (small), `w-5 h-5` (default), `w-6 h-6` (large)

---

## Input Processing

When users provide prototype requirements, identify and clarify:

### Required Information
- **Platform**: web (default), mobile, desktop app
- **Type**: landing page, dashboard, form, table view, modal, etc.
- **Components**: navigation, forms, tables, cards, content areas
- **Fidelity**: wireframe (low-fi), mockup (high-fi), or interactive prototype

### Optional Information
- **User flows**: interaction behaviors, navigation paths
- **Content**: specific text, data displays, images
- **Style**: follow Sona exactly, or custom variations
- **Functionality**: search, filters, authentication, CRUD operations

### Questions to Ask When Unclear

**Requirements:**
- "What's the primary goal users should accomplish?"
- "Who is the target audience for this prototype?"
- "What devices should this work on?"
- "Should this be a quick wireframe or a polished mockup?"

**Design System:**
- "Should I follow the exact Sona navigation structure?"
- "Which example screen best represents the desired style?"
- "Are there specific Sona components you want to use?"

---

## Creation Strategy

### For Wireframes (Low-Fidelity)
- Simple gray boxes with `bg-slate-100` and `border-slate-300`
- Placeholder text using `text-slate-400`
- Focus on layout, hierarchy, component placement
- Include annotations as comments or labels
- Minimal styling to emphasize structure

### For Mockups (High-Fidelity)
- Full Sona color palette from design tokens
- Proper typography hierarchy with Lexend font
- Authentic placeholder content (realistic names, dates, values)
- Visual polish with shadows (`shadow-sm`, `shadow-md`)
- Actual UI component patterns from components reference

### For Interactive Prototypes
- Functional React components with state
- Click/hover interactions with Tailwind transitions
- State changes (hover, active, loading, validation)
- Navigation between views using React Router
- Mock data that's easy to edit

---

## Standard Layout Patterns

### Page Layout with Sidebar (from side-navigation.html)

**CRITICAL**: All prototypes MUST use this sidebar structure. Reference `example-sona-UI-screens/side-navigation.html` for the canonical implementation.

```tsx
// Standard Sona layout structure - uses design system tokens
<div className="flex h-screen bg-gray-50">
  {/* Sidebar - MUST be 280px wide */}
  <aside className="w-[280px] bg-white border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0">
    
    {/* Logo Header - padding: 16px 24px */}
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <span className="text-2xl font-semibold text-emerald-500">Sona.</span>
      {/* Optional hamburger for mobile */}
      <button className="text-lg text-gray-500 hover:text-gray-700 lg:hidden">☰</button>
    </div>
    
    {/* Navigation Content - padding: 24px 0 */}
    <nav className="py-6">
      
      {/* Section: Business Wide */}
      <div className="mb-8">
        <div className="px-6 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em]">
          Business Wide
        </div>
        
        {/* Nav Item - Default */}
        <a href="#" className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
          <span className="w-5 mr-3 text-center">🏠</span>
          Home
        </a>
        
        {/* Nav Item - Active (sky-700 for active state) */}
        <a href="#" className="flex items-center px-6 py-3 text-sm font-medium text-sky-700 bg-sky-50 border-r-[3px] border-sky-700">
          <span className="w-5 mr-3 text-center">📋</span>
          Roster
        </a>
        
        {/* Nav Item - With Notification Badge */}
        <a href="#" className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
          <span className="w-5 mr-3 text-center">✅</span>
          Tasks
          <span className="ml-auto bg-red-500 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
            3
          </span>
        </a>
      </div>
      
      {/* Section: People We Support */}
      <div className="mb-8">
        <div className="px-6 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em]">
          People We Support
        </div>
        <a href="#" className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
          <span className="w-5 mr-3 text-center">📍</span>
          Select a location...
        </a>
      </div>
      
    </nav>
  </aside>
  
  {/* Main Content Area */}
  <main className="flex-1 overflow-y-auto">
    <div className="p-6">
      {/* Page Header Card */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h1 className="text-h2 text-gray-900 mb-1">Page title</h1>
        <p className="text-body text-gray-500">Page description here</p>
      </div>
      
      {/* Content Area */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Page content */}
      </div>
    </div>
  </main>
</div>
```

### Side Navigation Specs (from side-navigation.html)

| Element | Specification |
|---------|---------------|
| Sidebar width | `280px` fixed |
| Logo | `text-2xl font-semibold text-emerald-500` ("Sona.") |
| Logo padding | `px-6 py-4` (16px 24px) |
| Section title | `text-xs font-semibold text-gray-500 uppercase tracking-[0.05em]` |
| Section padding | `px-6 mb-4` |
| Nav item padding | `px-6 py-3` (24px 12px) |
| Nav item text | `text-sm font-medium text-gray-700` |
| Nav hover | `bg-gray-100` |
| Nav active | `text-sky-700 bg-sky-50 border-r-[3px] border-sky-700` |
| Icon width | `w-5` (20px) with `mr-3` spacing |
| Notification badge | `bg-red-500 text-white text-[11px] font-semibold rounded-full min-w-[16px]` |

### Summary Dashboard Cards

```tsx
<div className="grid grid-cols-4 gap-4 mb-8">
  <div className="bg-white p-5 rounded-lg border border-slate-200 text-center">
    <div className="text-3xl font-bold text-slate-700 mb-2">28</div>
    <div className="text-sm font-medium text-slate-500">Total Items</div>
  </div>
  {/* Success variant */}
  <div className="bg-white p-5 rounded-lg border border-slate-200 text-center">
    <div className="text-3xl font-bold text-emerald-600 mb-2">12</div>
    <div className="text-sm font-medium text-slate-500">Completed</div>
  </div>
  {/* Warning variant */}
  <div className="bg-white p-5 rounded-lg border border-slate-200 text-center">
    <div className="text-3xl font-bold text-amber-500 mb-2">6</div>
    <div className="text-sm font-medium text-slate-500">Pending</div>
  </div>
</div>
```

### Data Table Pattern

```tsx
<div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
  {/* Table Header */}
  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
    <h2 className="text-lg font-semibold text-slate-900">Table Title</h2>
  </div>
  
  <table className="w-full">
    <thead>
      <tr className="bg-slate-50 border-b border-slate-200">
        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
          Column
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
      <tr className="hover:bg-slate-50 transition-colors">
        <td className="px-6 py-4 text-sm text-slate-700">Cell content</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Mock Data Structure

Create mock data in `/src/data/` with TypeScript interfaces for type safety. Structure data for easy editing:

```tsx
// src/data/mockData.ts

// Define clear interfaces
export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'away' | 'offline';
  avatar?: string;
}

// Export editable arrays
export const employees: Employee[] = [
  { id: '1', name: 'Sarah Johnson', role: 'Care Assistant', department: 'Floor 1', status: 'active' },
  { id: '2', name: 'Mike Chen', role: 'Senior Carer', department: 'Floor 2', status: 'active' },
  { id: '3', name: 'Emma Wilson', role: 'Night Nurse', department: 'Floor 1', status: 'away' },
  // Add more entries as needed
];

// Helper functions for common operations
export const getEmployeesByDepartment = (dept: string) => 
  employees.filter(e => e.department === dept);

export const getActiveEmployees = () => 
  employees.filter(e => e.status === 'active');
```

### Mock Data Guidelines
- Use realistic UK-style names and data
- Include enough entries to demonstrate scrolling/pagination (15-25 items)
- Add variety in statuses and categories
- Keep data editable in one location
- Export helper functions for filtering/sorting

---

## Component Patterns

### Button Variants

```tsx
// Primary Button
<button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
  Primary Action
</button>

// Secondary Button
<button className="px-4 py-2 bg-white hover:bg-slate-50 text-emerald-700 font-medium rounded-lg border border-slate-200 transition-colors">
  Secondary
</button>

// Destructive Button
<button className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors">
  Delete
</button>

// Disabled State
<button className="px-4 py-2 bg-slate-100 text-slate-400 font-medium rounded-lg cursor-not-allowed" disabled>
  Disabled
</button>
```

### Status Pills/Badges

```tsx
// Success
<span className="px-2 py-1 text-xs font-medium text-emerald-700 bg-green-50 border border-emerald-700/20 rounded-full">
  Active
</span>

// Warning
<span className="px-2 py-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-700/20 rounded-full">
  Pending
</span>

// Error
<span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-600/20 rounded-full">
  Error
</span>

// Neutral
<span className="px-2 py-1 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded-full">
  Draft
</span>
```

### Form Inputs

```tsx
// Text Field
<div className="space-y-1">
  <label className="text-sm font-medium text-slate-900">Label</label>
  <input 
    type="text"
    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
    placeholder="Placeholder text"
  />
</div>

// Error State
<div className="space-y-1">
  <label className="text-sm font-medium text-slate-900">Label</label>
  <input 
    type="text"
    className="w-full px-3 py-2 border-2 border-red-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
  />
  <p className="text-xs text-red-600">Error message here</p>
</div>
```

### Modal Template

```tsx
// Overlay
<div className="fixed inset-0 bg-slate-500/75 flex items-center justify-center z-50">
  {/* Modal */}
  <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
    {/* Header */}
    <div className="px-6 py-4 border-b border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">Modal Title</h3>
    </div>
    
    {/* Content */}
    <div className="p-6">
      {/* Form or content */}
    </div>
    
    {/* Footer */}
    <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
      <button className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg">
        Cancel
      </button>
      <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

## Hosting & Sharing

### Local Development

```bash
cd "/Users/molly/Documents/UI Experiments"
npm run dev
```

### Build for Production

```bash
npm run build
# Output in dist/ folder
```

---

## Vercel Deployment (Primary Method)

**Use this skill to create shareable links when users ask you to deploy or share prototypes.**

### Initial Setup (One-Time)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```
   - Opens browser for authentication
   - Use your GitHub account (recommended) or email

3. **Connect GitHub Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import `mollyannwright/sona-design-experiments`
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

### Automatic Deployments

Once connected, **every push to GitHub automatically deploys**:
- **Production URL**: `https://sona-design-experiments.vercel.app` (or your custom domain)
- **Preview URLs**: Each branch/PR gets its own unique URL
- **Instant updates**: Changes go live in ~30 seconds

### Manual Deployment via CLI

```bash
cd "/Users/molly/Documents/UI Experiments"
vercel
```

Follow prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → Yes (select `sona-design-experiments`)
- **Override settings?** → No (uses defaults)

### Getting Deployment URLs

**When user asks to "create a link" or "deploy this prototype":**

1. **Check if already deployed**:
   ```bash
   vercel ls
   ```
   Shows all deployments with URLs

2. **Deploy current state**:
   ```bash
   vercel --prod
   ```
   Returns production URL immediately

3. **Get latest deployment URL**:
   ```bash
   vercel inspect
   ```
   Shows production URL and recent deployments

### Vercel Configuration

The project uses Vercel's **automatic detection** for Vite projects. No `vercel.json` needed, but you can customize:

```json
// vercel.json (optional)
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Deployment Workflow

**Standard flow when user requests deployment:**

1. **Ensure code is committed and pushed**:
   ```bash
   git add .
   git commit -m "Update prototype"
   git push
   ```
   → Auto-deploys via GitHub integration

2. **Or deploy directly**:
   ```bash
   vercel --prod
   ```
   → Returns shareable URL immediately

3. **Share the URL**:
   - Production: `https://sona-design-experiments.vercel.app`
   - Preview: `https://sona-design-experiments-[hash].vercel.app`

### Free Tier Limits

- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments for every branch
- ⚠️ Personal/non-commercial use only

### Alternative Deploy Options

1. **Netlify Drop**
   - Build locally: `npm run build`
   - Drag `dist/` folder to netlify.com/drop

2. **GitHub Pages**
   - Push to GitHub
   - Enable Pages in repo settings
   - Requires `gh-pages` branch setup

---

## Workflow

### 1. Analyze
- Review user requirements
- Check example screens for similar patterns
- Identify required components from design system

### 2. Clarify (if needed)
- Ask targeted questions if input is unclear
- Confirm fidelity level (wireframe/mockup/prototype)
- Verify which example screens to reference

### 3. Confirm
- Briefly summarize what will be created
- List key components and patterns to be used

### 4. Build
- Create React component in `src/components/`
- Set up mock data in `src/data/`
- Add route in `App.tsx` if multi-page
- Apply Sona design patterns consistently

### 5. Explain
- Provide 2-3 sentences on key design decisions
- Note which patterns were extracted from examples
- Highlight any deviations from standard Sona

### 6. Deploy & Share (when requested)
- When user asks to "create a link" or "deploy":
  - Run `vercel --prod` to deploy
  - Share the returned URL
  - Or push to GitHub for automatic deployment
- Provide the shareable URL for stakeholder review

### 7. Iterate
- Be ready to modify based on feedback
- Keep changes isolated for easy updates
- Maintain design system consistency
- Re-deploy after updates when user requests

---

## File Structure for Prototypes

```
UI Experiments/
├── src/
│   ├── components/
│   │   ├── [PrototypeName].tsx    # Main prototype component
│   │   ├── shared/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Table.tsx
│   │   └── layouts/                # Layout templates
│   │       └── SonaLayout.tsx
│   ├── data/
│   │   └── [prototypeName]Data.ts  # Mock data for prototype
│   ├── types/
│   │   └── [prototypeName].ts      # TypeScript interfaces
│   ├── App.tsx                     # Routes and navigation
│   └── index.css                   # Global styles + Lexend font
├── sonaui-design-system/           # Design reference (read-only)
└── example-sona-UI-screens/        # Visual reference (read-only)
```

---

## Success Criteria

Prototypes should:

- [ ] Be immediately usable and interactive
- [ ] Follow Sona design tokens and patterns exactly
- [ ] Look professional with proper typography and spacing
- [ ] Work responsively (unless mobile-specific)
- [ ] Include realistic mock data
- [ ] Be easy to modify and iterate on
- [ ] Be ready for stakeholder review
- [ ] Maintain brand consistency throughout

---

## Common Prototype Types

| Type | Reference Screen | Key Patterns |
|------|-----------------|--------------|
| Dashboard | `payroll.html` | Summary cards, grouped sections, drill-down |
| Data Table | `roster.html` | Filters, sorting, pagination, row actions |
| Form/Modal | `Modal example.png` | Field layout, validation, action buttons |
| Navigation | `sona.html` | Sidebar, breadcrumbs, page structure |
| Landing Page | - | Hero section, features, CTAs |
| Settings Page | - | Sections, toggles, form groups |

Remember: Start lean, iterate quickly, and always reference the established design system before creating custom patterns.
