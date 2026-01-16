# Compliance Dashboard

A comprehensive dashboard for monitoring employee right to work status and policy acknowledgements for Sona.

## Features

### Right to Work Monitoring
- **Summary Cards**: Overview of compliance status with counts for compliant, expiring soon, and action required
- **Employee Table**: Detailed view of each employee's right to work status including:
  - Employee information (name, ID, department, role)
  - Compliance status (compliant, expiring soon, expired, missing)
  - Document details (type, expiry dates)
  - Verification dates and next review dates
- **Search & Filters**: Filter by status and search by employee name, department, or role

### Policy Acknowledgements
- **Compliance Rate**: Overall percentage of required policy acknowledgements
- **Employee Compliance View**: Per-employee compliance rates with visual progress indicators
- **Policy Details Table**: Detailed breakdown of each policy acknowledgement including:
  - Employee and policy information
  - Acknowledgment status and dates
  - Policy version tracking
  - Expiry dates for policies requiring re-acknowledgement
- **Search & Filters**: Filter by status and search across employees, departments, and policies

## Data Structure

### Right to Work
- Tracks document types (passport, visa, birth certificate, driving license)
- Monitors expiry dates and verification status
- Calculates compliance status based on document validity

### Policy Acknowledgements
- Tracks required vs optional policies
- Monitors acknowledgment dates and expiry dates
- Calculates compliance rates per employee and overall

## Design System

Follows SonaUI design system:
- Uses SonaLayout with sidebar navigation
- Status badges with semantic colors (green for compliant, amber for expiring, red for action required)
- Summary cards with icon indicators
- Tabbed interface for switching between views
- Responsive table layouts with hover states

## Usage

Navigate to `/compliance` to view the dashboard. Use the tabs to switch between "Right to work" and "Policy acknowledgements" views.

## Mock Data

All data is stored in `complianceDashboardData.ts` and can be easily modified to match your requirements.
