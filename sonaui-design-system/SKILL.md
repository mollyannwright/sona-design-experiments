---
description: Guidelines for using SonaUI design system - see full documentation in backend/specs/design-system/
globs: backend/lib/**/*.ex,backend/lib/**/*.heex,backend/lib/**/*.exs
alwaysApply: true
---

# SonaUI Design System

## Component & Token Sources (Priority Order)

### 1. PRIMARY - Sona Repository (ALWAYS check first)
**Path:** `/Users/molly/Documents/Sona/backend/`

| Resource | Path |
|----------|------|
| **SonaUI Components** | `lib/sona_ui/components/` - Table, Button, Badge, Avatar, Modal, Form, etc. |
| **ComponentsV2** | `lib/backend_web/components_v2/` - Additional components |
| **Color Tokens CSS** | `assets/css/sonaui/colors.css` |
| **Typography** | `lib/backend_web/components_v2/core/typography.ex` |
| **Design Specs** | `specs/design-system/` and `specs/live-view-components.md` |

### 2. EXAMPLE UI SCREENS (Visual Reference)
**Path:** `/Users/molly/Documents/UI Experiments/example-sona-UI-screens/`

When creating new UI, **always review these example screens** for layout patterns, spacing, and component usage:

| Screen | File | Use For |
|--------|------|---------|
| **Side Navigation** | `side-navigation.html` | **PRIMARY** - Sidebar structure, nav items, badges |
| **Roster** | `roster.html`, `Roster.png` | Table layouts, filters, data grids |
| **Payroll** | `payroll.html` | Dashboard cards, summary stats, grouped sections |
| **Modal** | `Modal example.png` | Modal dialogs, form layouts, action buttons |

### 3. FALLBACK - Reference Files (only if Sona repo unavailable)
**Path:** `/Users/molly/Documents/UI Experiments/sonaui-design-system/`

| Resource | Path |
|----------|------|
| **Components Reference** | `components` - Figma component lookup with color tokens |
| **Design Tokens** | `tokens` - CSS variables for colors, spacing, radius |
| **Typography Reference** | `Sona typography.png` - Font styles and sizing |
| **Icons** | `icons/` - SVG icons for UI elements |

---

## Icons

**Path:** `/Users/molly/Documents/UI Experiments/sonaui-design-system/icons/`

**ALWAYS use icons from this folder** instead of emoji or custom icons. These are the official Sona icons.

### Available Icons

| Category | Icons |
|----------|-------|
| **Navigation** | Home, Arrow left/right/up/down, Chevron (all directions + sizes), Sidebar collapse/expand |
| **Actions** | Plus, Minus, Edit, Trash, Download, Upload, Share, Duplicate, Refresh, Search, Print |
| **Communication** | Chat, Mail, Bell, Phone, Send, Microphone, Video camera |
| **Status** | Check, Check circle, X, X circle, Exclamation circle/triangle, Information circle, Question mark circle |
| **Content** | Document, Document text, Photograph, Attachment, Link, External link |
| **User** | User, Users, User add |
| **Business** | Calendar, Clock, Briefcase, Wallet, Currency Dollar/Pound, Money, Office building, Chart bar |
| **Other** | Cog, Lock open/closed, Eye, Flag, Heart, Star, Lightning bolt, Sparkle |

### Icon Variants

Many icons have variants:
- **Outline** (default): `Chat.svg`, `Bell.svg`, `Calendar.svg`
- **Solid**: `Chat-solid.svg`, `Bell-solid.svg`, `Calendar-solid.svg`
- **Size variants**: `Chevron down.svg`, `Chevron down small.svg`, `Chevron down micro.svg`

### Icon Styling

All icons use `currentColor` for stroke/fill, so they inherit text color from CSS:
```tsx
// Icon will be gray
<SearchIcon className="text-gray-500" />

// Icon will be red on hover
<TrashIcon className="text-gray-400 hover:text-red-600" />
```

### Usage in React (Recommended)

Use the Icon component from `src/components/shared/Icon.tsx`:

```tsx
import { 
  SearchIcon, 
  EditIcon, 
  TrashIcon, 
  PlusIcon,
  Icon  // For any icon by name
} from '@/components/shared/Icon';

// Named exports for common icons
<SearchIcon size="sm" className="text-gray-500" />
<EditIcon size="md" />
<TrashIcon className="text-red-600" />

// Generic Icon component for any icon
<Icon name="Calendar" size="lg" />
<Icon name="Chevron down small" className="text-gray-400" />
```

### Icon Sizing

| Size | Tailwind | Use Case |
|------|----------|----------|
| 16px | `w-4 h-4` | Inline with text, badges |
| 20px | `w-5 h-5` | Navigation items, buttons |
| 24px | `w-6 h-6` | Headers, standalone icons |

### 4. AVOID - Legacy Components
Do NOT use: `backend/lib/backend_web/components` - Legacy, deprecated

---

## Typography

**Font:** Lexend (Google Fonts)

All text in Sona uses the Lexend typeface. Use sentence casing for headings (only capitalize proper nouns and first letter).

| Style | Weight | Size / Line Height | CSS Class |
|-------|--------|-------------------|-----------|
| **H1** | SemiBold (600) | 30px / 36px | `.text-h1` |
| **H2** | SemiBold (600) | 20px / 28px | `.text-h2` |
| **H3** | SemiBold (600) | 16px / 24px | `.text-h3` |
| **Subtitle** | Light (300) | 16px / 24px | `.text-subtitle` |
| **Body** | Light (300) | 14px / 20px | `.text-body` |
| **Body Bold** | Medium (500) | 14px / 20px | `.text-body-bold` |
| **Caption** | Light (300) | 12px / 16px | `.text-caption` |
| **Caption Bold** | Medium (500) | 12px / 16px | `.text-caption-bold` |
| **Micro** | Light (300) | 10px / 12px | `.text-micro` |
| **Micro Bold** | Medium (500) | 10px / 12px | `.text-micro-bold` |

### Typography Guidelines
- Use sentence casing for all headings (e.g., "Team members" not "Team Members")
- Body text optimal line length: 50-75 characters (~70 per line)
- Use Micro styles sparingly for space-constrained areas (roster, dense tables)

---

## Quick Reference

### Key Rules
- Always use SonaUI components when available
- Use Tailwind CSS classes - NEVER inline styles (`style="..."` is forbidden)
- Use colour design tokens from `backend/assets/css/sonaui/colors.css` - never hardcode colors
- Use text styles as defined in `backend/lib/backend_web/components_v2/core/typography.ex`
- LiveView components must use `use BackendWeb, :live_component`
- When updating files, review the ENTIRE file for consistency improvements and components that can be replaced with those from `backend/lib/sona_ui/` as our primary component library

### File-Wide Consistency Review
When updating any file, ALWAYS:
1. Convert inline styles to Tailwind classes
2. Replace custom components with SonaUI components where applicable
3. Standardize text styles with typography styles where possible 
4. Replace hardcoded colors with design tokens

