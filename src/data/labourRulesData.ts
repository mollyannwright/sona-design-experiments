/**
 * Mock Data for Labour Rules Prototype
 * 
 * Based on Popeyes use case from product brief:
 * - Opening hours that vary by site and day
 * - Fixed rules like "manager from 1hr pre-open to 2hrs post-close"
 * - Multiple sites with different configurations
 */

import type {
  Attribute,
  OrgUnit,
  OrgUnitWithAttributes,
  Ruleset,
  Rule,
  RulesetAssignment,
  OrgUnitWithAssignments,
} from '../types/labourRules';

// ==============================================
// ATTRIBUTES
// ==============================================

export const attributes: Attribute[] = [
  // Opening times by day
  {
    id: 'attr-1',
    name: 'opening_time_monday',
    type: 'time',
    defaultValue: '09:00',
    description: 'Store opening time on Monday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-2',
    name: 'opening_time_tuesday',
    type: 'time',
    defaultValue: '09:00',
    description: 'Store opening time on Tuesday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-3',
    name: 'opening_time_wednesday',
    type: 'time',
    defaultValue: '09:00',
    description: 'Store opening time on Wednesday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-4',
    name: 'opening_time_thursday',
    type: 'time',
    defaultValue: '09:00',
    description: 'Store opening time on Thursday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-5',
    name: 'opening_time_friday',
    type: 'time',
    defaultValue: '09:00',
    description: 'Store opening time on Friday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-6',
    name: 'opening_time_saturday',
    type: 'time',
    defaultValue: '10:00',
    description: 'Store opening time on Saturday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-7',
    name: 'opening_time_sunday',
    type: 'time',
    defaultValue: '11:00',
    description: 'Store opening time on Sunday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  // Closing times by day
  {
    id: 'attr-8',
    name: 'closing_time_monday',
    type: 'time',
    defaultValue: '22:00',
    description: 'Store closing time on Monday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-9',
    name: 'closing_time_tuesday',
    type: 'time',
    defaultValue: '22:00',
    description: 'Store closing time on Tuesday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-10',
    name: 'closing_time_wednesday',
    type: 'time',
    defaultValue: '22:00',
    description: 'Store closing time on Wednesday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-11',
    name: 'closing_time_thursday',
    type: 'time',
    defaultValue: '22:00',
    description: 'Store closing time on Thursday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-12',
    name: 'closing_time_friday',
    type: 'time',
    defaultValue: '23:00',
    description: 'Store closing time on Friday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-13',
    name: 'closing_time_saturday',
    type: 'time',
    defaultValue: '23:00',
    description: 'Store closing time on Saturday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-14',
    name: 'closing_time_sunday',
    type: 'time',
    defaultValue: '21:00',
    description: 'Store closing time on Sunday',
    rulesetCount: 2,
    createdAt: '2024-01-15',
  },
  // Site characteristics
  {
    id: 'attr-15',
    name: 'has_drive_through',
    type: 'boolean',
    defaultValue: false,
    description: 'Whether the site has a drive-through',
    rulesetCount: 1,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-16',
    name: 'floor_count',
    type: 'integer',
    defaultValue: 1,
    description: 'Number of floors at the site',
    rulesetCount: 1,
    createdAt: '2024-01-15',
  },
  {
    id: 'attr-17',
    name: 'has_self_service_drinks',
    type: 'boolean',
    defaultValue: true,
    description: 'Whether customers can self-serve drinks',
    rulesetCount: 1,
    createdAt: '2024-01-15',
  },
];

// ==============================================
// ORG UNITS (Sites with hierarchy)
// ==============================================

export const orgUnits: OrgUnit[] = [
  {
    id: 'region-1',
    name: 'North Region',
    type: 'region',
    children: [
      {
        id: 'area-1',
        name: 'Manchester Area',
        type: 'area',
        parentId: 'region-1',
        children: [
          { id: 'site-1', name: 'Manchester Arndale', type: 'site', parentId: 'area-1' },
          { id: 'site-2', name: 'Manchester Trafford', type: 'site', parentId: 'area-1' },
          { id: 'site-3', name: 'Stockport', type: 'site', parentId: 'area-1' },
        ],
      },
      {
        id: 'area-2',
        name: 'Leeds Area',
        type: 'area',
        parentId: 'region-1',
        children: [
          { id: 'site-4', name: 'Leeds Trinity', type: 'site', parentId: 'area-2' },
          { id: 'site-5', name: 'Leeds White Rose', type: 'site', parentId: 'area-2' },
        ],
      },
    ],
  },
  {
    id: 'region-2',
    name: 'South Region',
    type: 'region',
    children: [
      {
        id: 'area-3',
        name: 'London Area',
        type: 'area',
        parentId: 'region-2',
        children: [
          { id: 'site-6', name: 'London Oxford Street', type: 'site', parentId: 'area-3' },
          { id: 'site-7', name: 'London Stratford', type: 'site', parentId: 'area-3' },
          { id: 'site-8', name: 'London Croydon', type: 'site', parentId: 'area-3' },
        ],
      },
      {
        id: 'area-4',
        name: 'Birmingham Area',
        type: 'area',
        parentId: 'region-2',
        children: [
          { id: 'site-9', name: 'Birmingham Bullring', type: 'site', parentId: 'area-4' },
          { id: 'site-10', name: 'Birmingham High Street', type: 'site', parentId: 'area-4' },
        ],
      },
    ],
  },
];

// Flatten org units for easy iteration
export const flatOrgUnits: OrgUnit[] = orgUnits.flatMap((region) => [
  region,
  ...(region.children?.flatMap((area) => [area, ...(area.children || [])]) || []),
]);

// Sites only (leaf nodes)
export const sites: OrgUnit[] = flatOrgUnits.filter((ou) => ou.type === 'site');

// ==============================================
// ORG UNIT ATTRIBUTE VALUES
// ==============================================

export const orgUnitAttributes: OrgUnitWithAttributes[] = [
  {
    orgUnit: { id: 'site-1', name: 'Manchester Arndale', type: 'site', parentId: 'area-1' },
    attributes: {
      opening_time_monday: '08:00',
      opening_time_tuesday: '08:00',
      opening_time_wednesday: '08:00',
      opening_time_thursday: '08:00',
      opening_time_friday: '08:00',
      opening_time_saturday: '09:00',
      opening_time_sunday: '10:00',
      closing_time_monday: '21:00',
      closing_time_tuesday: '21:00',
      closing_time_wednesday: '21:00',
      closing_time_thursday: '21:00',
      closing_time_friday: '22:00',
      closing_time_saturday: '22:00',
      closing_time_sunday: '18:00',
      has_drive_through: false,
      floor_count: 2,
      has_self_service_drinks: true,
    },
    missingRequired: [],
  },
  {
    orgUnit: { id: 'site-2', name: 'Manchester Trafford', type: 'site', parentId: 'area-1' },
    attributes: {
      opening_time_monday: '10:00',
      opening_time_tuesday: '10:00',
      opening_time_wednesday: '10:00',
      opening_time_thursday: '10:00',
      opening_time_friday: '10:00',
      opening_time_saturday: '09:00',
      opening_time_sunday: '11:00',
      closing_time_monday: '22:00',
      closing_time_tuesday: '22:00',
      closing_time_wednesday: '22:00',
      closing_time_thursday: '22:00',
      closing_time_friday: '22:00',
      closing_time_saturday: '22:00',
      closing_time_sunday: '18:00',
      has_drive_through: true,
      floor_count: 1,
      has_self_service_drinks: true,
    },
    missingRequired: [],
  },
  {
    orgUnit: { id: 'site-3', name: 'Stockport', type: 'site', parentId: 'area-1' },
    attributes: {
      opening_time_monday: '09:00',
      opening_time_tuesday: '09:00',
      opening_time_wednesday: '09:00',
      opening_time_thursday: '09:00',
      opening_time_friday: '09:00',
      opening_time_saturday: '09:00',
      opening_time_sunday: '10:00',
      closing_time_monday: '21:00',
      closing_time_tuesday: '21:00',
      closing_time_wednesday: '21:00',
      closing_time_thursday: '21:00',
      closing_time_friday: '21:00',
      closing_time_saturday: '21:00',
      closing_time_sunday: '17:00',
      has_drive_through: false,
      floor_count: 1,
      has_self_service_drinks: false,
    },
    missingRequired: [],
  },
  {
    orgUnit: { id: 'site-4', name: 'Leeds Trinity', type: 'site', parentId: 'area-2' },
    attributes: {
      opening_time_monday: '09:30',
      opening_time_tuesday: '09:30',
      opening_time_wednesday: '09:30',
      opening_time_thursday: '09:30',
      opening_time_friday: '09:30',
      opening_time_saturday: '09:00',
      opening_time_sunday: '11:00',
      closing_time_monday: '20:00',
      closing_time_tuesday: '20:00',
      closing_time_wednesday: '20:00',
      closing_time_thursday: '21:00',
      closing_time_friday: '21:00',
      closing_time_saturday: '20:00',
      closing_time_sunday: '17:00',
      has_drive_through: false,
      floor_count: 1,
      has_self_service_drinks: true,
    },
    missingRequired: [],
  },
  {
    orgUnit: { id: 'site-5', name: 'Leeds White Rose', type: 'site', parentId: 'area-2' },
    attributes: {
      opening_time_monday: '10:00',
      opening_time_tuesday: '10:00',
      opening_time_wednesday: '10:00',
      opening_time_thursday: '10:00',
      opening_time_friday: '10:00',
      opening_time_saturday: '09:00',
      opening_time_sunday: '11:00',
      closing_time_monday: '21:00',
      closing_time_tuesday: '21:00',
      closing_time_wednesday: '21:00',
      closing_time_thursday: '21:00',
      closing_time_friday: '22:00',
      closing_time_saturday: '21:00',
      closing_time_sunday: '17:00',
      has_drive_through: true,
      floor_count: 1,
      has_self_service_drinks: true,
    },
    missingRequired: [],
  },
  {
    orgUnit: { id: 'site-6', name: 'London Oxford Street', type: 'site', parentId: 'area-3' },
    attributes: {
      opening_time_monday: '07:00',
      opening_time_tuesday: '07:00',
      opening_time_wednesday: '07:00',
      opening_time_thursday: '07:00',
      opening_time_friday: '07:00',
      opening_time_saturday: '08:00',
      opening_time_sunday: '10:00',
      closing_time_monday: '23:00',
      closing_time_tuesday: '23:00',
      closing_time_wednesday: '23:00',
      closing_time_thursday: '23:00',
      closing_time_friday: '00:00',
      closing_time_saturday: '00:00',
      closing_time_sunday: '20:00',
      has_drive_through: false,
      floor_count: 3,
      has_self_service_drinks: true,
    },
    missingRequired: [],
  },
  {
    orgUnit: { id: 'site-7', name: 'London Stratford', type: 'site', parentId: 'area-3' },
    attributes: {
      opening_time_monday: '09:00',
      opening_time_tuesday: '09:00',
      opening_time_wednesday: '09:00',
      opening_time_thursday: '09:00',
      opening_time_friday: '09:00',
      opening_time_saturday: '09:00',
      opening_time_sunday: '12:00',
      closing_time_monday: '21:00',
      closing_time_tuesday: '21:00',
      closing_time_wednesday: '21:00',
      closing_time_thursday: '21:00',
      closing_time_friday: '22:00',
      closing_time_saturday: '22:00',
      closing_time_sunday: '18:00',
      has_drive_through: false,
      floor_count: 2,
      has_self_service_drinks: true,
    },
    missingRequired: [],
  },
  {
    orgUnit: { id: 'site-8', name: 'London Croydon', type: 'site', parentId: 'area-3' },
    attributes: {
      opening_time_monday: '08:00',
      opening_time_tuesday: '08:00',
      opening_time_wednesday: '08:00',
      opening_time_thursday: '08:00',
      opening_time_friday: '08:00',
      opening_time_saturday: '08:00',
      opening_time_sunday: null, // Missing - should show warning
      closing_time_monday: '20:00',
      closing_time_tuesday: '20:00',
      closing_time_wednesday: '20:00',
      closing_time_thursday: '20:00',
      closing_time_friday: '21:00',
      closing_time_saturday: '21:00',
      closing_time_sunday: null,
      has_drive_through: true,
      floor_count: 1,
      has_self_service_drinks: true,
    },
    missingRequired: ['opening_time_sunday', 'closing_time_sunday'],
  },
  {
    orgUnit: { id: 'site-9', name: 'Birmingham Bullring', type: 'site', parentId: 'area-4' },
    attributes: {
      opening_time_monday: '09:00',
      opening_time_tuesday: '09:00',
      opening_time_wednesday: '09:00',
      opening_time_thursday: '09:00',
      opening_time_friday: '09:00',
      opening_time_saturday: '09:00',
      opening_time_sunday: '11:00',
      closing_time_monday: '20:00',
      closing_time_tuesday: '20:00',
      closing_time_wednesday: '20:00',
      closing_time_thursday: '21:00',
      closing_time_friday: '21:00',
      closing_time_saturday: '20:00',
      closing_time_sunday: '17:00',
      has_drive_through: false,
      floor_count: 2,
      has_self_service_drinks: true,
    },
    missingRequired: [],
  },
  {
    orgUnit: { id: 'site-10', name: 'Birmingham High Street', type: 'site', parentId: 'area-4' },
    attributes: {
      opening_time_monday: '07:00',
      opening_time_tuesday: '07:00',
      opening_time_wednesday: '07:00',
      opening_time_thursday: '07:00',
      opening_time_friday: '07:00',
      opening_time_saturday: '08:00',
      opening_time_sunday: '09:00',
      closing_time_monday: '22:00',
      closing_time_tuesday: '22:00',
      closing_time_wednesday: '22:00',
      closing_time_thursday: '22:00',
      closing_time_friday: '23:00',
      closing_time_saturday: '23:00',
      closing_time_sunday: '20:00',
      has_drive_through: true,
      floor_count: 1,
      has_self_service_drinks: false,
    },
    missingRequired: [],
  },
];

// ==============================================
// RULESETS AND RULES
// ==============================================

export const rulesets: Ruleset[] = [
  {
    id: 'ruleset-1',
    name: 'Standard opening fixed rules',
    description: 'Manager coverage from 1hr pre-open to 2hrs post-close, plus batterer during opening hours',
    rules: [],
    assignedSiteCount: 8,
    requiredAttributes: [
      'opening_time_monday', 'opening_time_tuesday', 'opening_time_wednesday',
      'opening_time_thursday', 'opening_time_friday', 'opening_time_saturday', 'opening_time_sunday',
      'closing_time_monday', 'closing_time_tuesday', 'closing_time_wednesday',
      'closing_time_thursday', 'closing_time_friday', 'closing_time_saturday', 'closing_time_sunday',
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: 'ruleset-2',
    name: 'Drive-through rules',
    description: 'Additional staffing for drive-through operations',
    rules: [],
    assignedSiteCount: 4,
    requiredAttributes: ['has_drive_through', 'opening_time_monday', 'closing_time_monday'],
    createdAt: '2024-01-16',
    updatedAt: '2024-01-18',
  },
  {
    id: 'ruleset-3',
    name: 'Multi-floor rules',
    description: 'Additional manager for sites with multiple floors',
    rules: [],
    assignedSiteCount: 3,
    requiredAttributes: ['floor_count'],
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17',
  },
  {
    id: 'ruleset-4',
    name: 'Winter menu rules (2024)',
    description: 'Additional labour for winter menu prep - effective Nov 2024 to Jan 2025',
    rules: [],
    assignedSiteCount: 0,
    requiredAttributes: [],
    createdAt: '2024-10-01',
    updatedAt: '2024-10-01',
  },
];

export const rules: Rule[] = [
  // Standard opening rules - Manager
  {
    id: 'rule-1',
    rulesetId: 'ruleset-1',
    name: 'Manager pre-open to post-close (Mon)',
    type: 'fixed',
    dayOfWeek: 'monday',
    startTime: '#{opening_time_monday} - 1.hour',
    endTime: '#{closing_time_monday} + 2.hours',
    role: 'Manager',
    requiredAttributes: ['opening_time_monday', 'closing_time_monday'],
    hasErrors: false,
  },
  {
    id: 'rule-2',
    rulesetId: 'ruleset-1',
    name: 'Manager pre-open to post-close (Tue)',
    type: 'fixed',
    dayOfWeek: 'tuesday',
    startTime: '#{opening_time_tuesday} - 1.hour',
    endTime: '#{closing_time_tuesday} + 2.hours',
    role: 'Manager',
    requiredAttributes: ['opening_time_tuesday', 'closing_time_tuesday'],
    hasErrors: false,
  },
  {
    id: 'rule-3',
    rulesetId: 'ruleset-1',
    name: 'Manager pre-open to post-close (Wed)',
    type: 'fixed',
    dayOfWeek: 'wednesday',
    startTime: '#{opening_time_wednesday} - 1.hour',
    endTime: '#{closing_time_wednesday} + 2.hours',
    role: 'Manager',
    requiredAttributes: ['opening_time_wednesday', 'closing_time_wednesday'],
    hasErrors: false,
  },
  {
    id: 'rule-4',
    rulesetId: 'ruleset-1',
    name: 'Manager pre-open to post-close (Thu)',
    type: 'fixed',
    dayOfWeek: 'thursday',
    startTime: '#{opening_time_thursday} - 1.hour',
    endTime: '#{closing_time_thursday} + 2.hours',
    role: 'Manager',
    requiredAttributes: ['opening_time_thursday', 'closing_time_thursday'],
    hasErrors: false,
  },
  {
    id: 'rule-5',
    rulesetId: 'ruleset-1',
    name: 'Manager pre-open to post-close (Fri)',
    type: 'fixed',
    dayOfWeek: 'friday',
    startTime: '#{opening_time_friday} - 1.hour',
    endTime: '#{closing_time_friday} + 2.hours',
    role: 'Manager',
    requiredAttributes: ['opening_time_friday', 'closing_time_friday'],
    hasErrors: false,
  },
  {
    id: 'rule-6',
    rulesetId: 'ruleset-1',
    name: 'Manager pre-open to post-close (Sat)',
    type: 'fixed',
    dayOfWeek: 'saturday',
    startTime: '#{opening_time_saturday} - 1.hour',
    endTime: '#{closing_time_saturday} + 2.hours',
    role: 'Manager',
    requiredAttributes: ['opening_time_saturday', 'closing_time_saturday'],
    hasErrors: false,
  },
  {
    id: 'rule-7',
    rulesetId: 'ruleset-1',
    name: 'Manager pre-open to post-close (Sun)',
    type: 'fixed',
    dayOfWeek: 'sunday',
    startTime: '#{opening_time_sunday} - 1.hour',
    endTime: '#{closing_time_sunday} + 2.hours',
    role: 'Manager',
    requiredAttributes: ['opening_time_sunday', 'closing_time_sunday'],
    hasErrors: false,
  },
  // Standard opening rules - Batterer
  {
    id: 'rule-8',
    rulesetId: 'ruleset-1',
    name: 'Batterer during open hours (Mon)',
    type: 'fixed',
    dayOfWeek: 'monday',
    startTime: '#{opening_time_monday}',
    endTime: '#{closing_time_monday}',
    role: 'Batterer',
    requiredAttributes: ['opening_time_monday', 'closing_time_monday'],
    hasErrors: false,
  },
  // Drive-through rules
  {
    id: 'rule-9',
    rulesetId: 'ruleset-2',
    name: 'Drive-through attendant',
    type: 'fixed',
    dayOfWeek: 'all',
    startTime: '#{opening_time_monday}',
    endTime: '#{closing_time_monday}',
    role: 'Drive-through Attendant',
    requiredAttributes: ['opening_time_monday', 'closing_time_monday'],
    hasErrors: false,
  },
  // Multi-floor rules
  {
    id: 'rule-10',
    rulesetId: 'ruleset-3',
    name: 'Additional floor manager',
    type: 'minimum',
    dayOfWeek: 'all',
    startTime: '#{opening_time_monday}',
    endTime: '#{closing_time_monday}',
    minimumPeopleRequired: '#{floor_count} - 1',
    role: 'Floor Manager',
    requiredAttributes: ['floor_count', 'opening_time_monday', 'closing_time_monday'],
    hasErrors: false,
  },
];

// Populate rulesets with their rules
rulesets.forEach((ruleset) => {
  ruleset.rules = rules.filter((rule) => rule.rulesetId === ruleset.id);
});

// ==============================================
// ASSIGNMENTS
// ==============================================

export const assignments: RulesetAssignment[] = [
  // Manchester Arndale
  {
    id: 'assign-1',
    rulesetId: 'ruleset-1',
    rulesetName: 'Standard opening fixed rules',
    orgUnitId: 'site-1',
    orgUnitName: 'Manchester Arndale',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 'assign-2',
    rulesetId: 'ruleset-3',
    rulesetName: 'Multi-floor rules',
    orgUnitId: 'site-1',
    orgUnitName: 'Manchester Arndale',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  // Manchester Trafford
  {
    id: 'assign-3',
    rulesetId: 'ruleset-1',
    rulesetName: 'Standard opening fixed rules',
    orgUnitId: 'site-2',
    orgUnitName: 'Manchester Trafford',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 'assign-4',
    rulesetId: 'ruleset-2',
    rulesetName: 'Drive-through rules',
    orgUnitId: 'site-2',
    orgUnitName: 'Manchester Trafford',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  // Stockport
  {
    id: 'assign-5',
    rulesetId: 'ruleset-1',
    rulesetName: 'Standard opening fixed rules',
    orgUnitId: 'site-3',
    orgUnitName: 'Stockport',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  // Leeds Trinity
  {
    id: 'assign-6',
    rulesetId: 'ruleset-1',
    rulesetName: 'Standard opening fixed rules',
    orgUnitId: 'site-4',
    orgUnitName: 'Leeds Trinity',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  // Leeds White Rose (with scheduled change)
  {
    id: 'assign-7',
    rulesetId: 'ruleset-1',
    rulesetName: 'Standard opening fixed rules',
    orgUnitId: 'site-5',
    orgUnitName: 'Leeds White Rose',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 'assign-8',
    rulesetId: 'ruleset-2',
    rulesetName: 'Drive-through rules',
    orgUnitId: 'site-5',
    orgUnitName: 'Leeds White Rose',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 'assign-9',
    rulesetId: 'ruleset-4',
    rulesetName: 'Winter menu rules (2024)',
    orgUnitId: 'site-5',
    orgUnitName: 'Leeds White Rose',
    effectiveFrom: '2024-11-01',
    effectiveUntil: '2025-01-31',
    status: 'scheduled',
    createdAt: '2024-10-01',
  },
  // London Oxford Street
  {
    id: 'assign-10',
    rulesetId: 'ruleset-1',
    rulesetName: 'Standard opening fixed rules',
    orgUnitId: 'site-6',
    orgUnitName: 'London Oxford Street',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 'assign-11',
    rulesetId: 'ruleset-3',
    rulesetName: 'Multi-floor rules',
    orgUnitId: 'site-6',
    orgUnitName: 'London Oxford Street',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  // London Stratford
  {
    id: 'assign-12',
    rulesetId: 'ruleset-1',
    rulesetName: 'Standard opening fixed rules',
    orgUnitId: 'site-7',
    orgUnitName: 'London Stratford',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 'assign-13',
    rulesetId: 'ruleset-3',
    rulesetName: 'Multi-floor rules',
    orgUnitId: 'site-7',
    orgUnitName: 'London Stratford',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  // London Croydon - with drive-through
  {
    id: 'assign-14',
    rulesetId: 'ruleset-1',
    rulesetName: 'Standard opening fixed rules',
    orgUnitId: 'site-8',
    orgUnitName: 'London Croydon',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 'assign-15',
    rulesetId: 'ruleset-2',
    rulesetName: 'Drive-through rules',
    orgUnitId: 'site-8',
    orgUnitName: 'London Croydon',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  // Birmingham Bullring
  {
    id: 'assign-16',
    rulesetId: 'ruleset-1',
    rulesetName: 'Standard opening fixed rules',
    orgUnitId: 'site-9',
    orgUnitName: 'Birmingham Bullring',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  // Birmingham High Street - with drive-through
  {
    id: 'assign-17',
    rulesetId: 'ruleset-1',
    rulesetName: 'Standard opening fixed rules',
    orgUnitId: 'site-10',
    orgUnitName: 'Birmingham High Street',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 'assign-18',
    rulesetId: 'ruleset-2',
    rulesetName: 'Drive-through rules',
    orgUnitId: 'site-10',
    orgUnitName: 'Birmingham High Street',
    effectiveFrom: '2024-01-01',
    effectiveUntil: undefined,
    status: 'active',
    createdAt: '2024-01-01',
  },
];

// Get assignments for a specific org unit
export const getAssignmentsForOrgUnit = (orgUnitId: string): RulesetAssignment[] => {
  return assignments.filter((a) => a.orgUnitId === orgUnitId);
};

// Get all org units with their assignments
export const orgUnitsWithAssignments: OrgUnitWithAssignments[] = sites.map((site) => {
  const siteAssignments = getAssignmentsForOrgUnit(site.id);
  const siteAttributes = orgUnitAttributes.find((oa) => oa.orgUnit.id === site.id);
  
  return {
    orgUnit: site,
    assignments: siteAssignments,
    hasGap: false, // Would need date logic to determine
    missingAttributes: siteAttributes?.missingRequired || [],
  };
});

// ==============================================
// HELPER FUNCTIONS
// ==============================================

// Available roles for rules
export const availableRoles = [
  'Manager',
  'Shift Supervisor',
  'Team Leader',
  'Batterer',
  'Cashier',
  'Drive-through Attendant',
  'Floor Manager',
  'Kitchen Staff',
  'Cleaner',
];

// Get attribute by name
export const getAttributeByName = (name: string): Attribute | undefined => {
  return attributes.find((a) => a.name === name);
};

// Get attribute suggestions for autocomplete
export const getAttributeSuggestions = (query: string): Attribute[] => {
  const lowerQuery = query.toLowerCase();
  return attributes.filter((a) => a.name.toLowerCase().includes(lowerQuery));
};

// Parse formula to extract referenced attributes
export const parseFormulaAttributes = (formula: string): string[] => {
  const regex = /#\{(\w+)\}/g;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(formula)) !== null) {
    matches.push(match[1]);
  }
  return [...new Set(matches)];
};

// Validate formula
export const validateFormula = (formula: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const referencedAttrs = parseFormulaAttributes(formula);
  
  for (const attrName of referencedAttrs) {
    if (!getAttributeByName(attrName)) {
      errors.push(`Unknown attribute: ${attrName}`);
    }
  }
  
  // Check for unclosed brackets
  const openBrackets = (formula.match(/#\{/g) || []).length;
  const closeBrackets = (formula.match(/\}/g) || []).length;
  if (openBrackets !== closeBrackets) {
    errors.push('Unclosed attribute reference bracket');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
