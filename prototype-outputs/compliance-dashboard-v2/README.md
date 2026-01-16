# Compliance Dashboard V2

A card-based dashboard layout for monitoring employee right to work status and policy acknowledgements.

## Design Approach

This version uses a **card-based grid layout** instead of traditional tables, providing a more visual and scannable interface.

### Key Differences from V1

1. **Card Layout**: Each employee is displayed as a card showing both compliance areas at once
2. **Visual Hierarchy**: Right-to-work and policy compliance are shown together in each card
3. **Grid View**: Responsive grid (1-3 columns) instead of a single table
4. **Quick Filters**: Filter buttons for "All", "Action Required", and "Fully Compliant"
5. **Visual Indicators**: Color-coded borders and badges for quick status identification
6. **Progress Bars**: Visual progress bars for policy compliance rates
7. **Expiry Warnings**: Days until expiry shown for documents expiring soon

## Features

### Overview Stats
- Total employees count
- Right to work compliance
- Policy compliance percentage
- Action required count

### Employee Cards
Each card displays:
- **Employee Information**: Name, role, department
- **Right to Work Section**:
  - Status badge (compliant, expiring soon, expired, missing)
  - Document type and expiry date
  - Days until expiry (if < 90 days)
  - Last verification date
- **Policy Compliance Section**:
  - Compliance rate percentage
  - Visual progress bar
  - Acknowledged vs total required
  - Pending policies count
- **Next Review Date**: Shown in footer if available

### Filtering
- Search by employee name, department, or role
- Filter by view: All, Action Required, Fully Compliant

## Layout Benefits

- **Better Scanning**: Cards allow quick visual scanning of all employees
- **Context Together**: Both compliance areas visible without switching tabs
- **Action Focus**: Cards with action required have highlighted borders
- **Responsive**: Adapts to different screen sizes (1-3 columns)
- **Visual Feedback**: Color coding and progress bars provide immediate status understanding

## Usage

Navigate to `/compliance-v2` to view the card-based dashboard.
