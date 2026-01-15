/**
 * Labour Rules Type Definitions
 * 
 * Based on: product-briefs/labour-rules/design-requirements-labour-rules-v2.txt
 * 
 * Four main areas:
 * 1. Attributes - org-level attribute definitions
 * 2. Org Unit Attributes - attribute values per site
 * 3. Rulesets & Rules - containers with formula-based rules
 * 4. Assignments - ruleset assignments to sites with date ranges
 */

// Attribute types that can be defined
export type AttributeType = 'time' | 'boolean' | 'integer' | 'float' | 'string';

// An attribute definition at the organisation level
export interface Attribute {
  id: string;
  name: string; // e.g., "opening_time_monday", "has_drive_through"
  type: AttributeType;
  defaultValue?: string | number | boolean;
  description?: string;
  rulesetCount: number; // How many rulesets reference this attribute
  createdAt: string;
}

// Organisation unit (site, region, area)
export type OrgUnitType = 'region' | 'area' | 'site';

export interface OrgUnit {
  id: string;
  name: string;
  type: OrgUnitType;
  parentId?: string; // For hierarchy
  children?: OrgUnit[];
}

// Attribute value for a specific org unit
export interface OrgUnitAttributeValue {
  orgUnitId: string;
  attributeId: string;
  value: string | number | boolean | null;
  isInherited?: boolean; // True if using default value
}

// Org unit with all its attribute values (for bulk edit view)
export interface OrgUnitWithAttributes {
  orgUnit: OrgUnit;
  attributes: Record<string, string | number | boolean | null>;
  missingRequired: string[]; // Attribute IDs that are required but missing
}

// Rule types supported
export type RuleType = 'fixed' | 'minimum' | 'variable';

// A single rule within a ruleset
export interface Rule {
  id: string;
  rulesetId: string;
  name: string; // e.g., "Manager pre-open"
  type: RuleType;
  dayOfWeek?: string; // 'monday' | 'tuesday' | etc. or 'all'
  
  // For fixed rules
  startTime?: string; // Can be literal "07:00" or formula "#{opening_time_monday} - 1.hour"
  endTime?: string;
  duration?: string; // In minutes or formula
  
  // For minimum rules
  minimumPeopleRequired?: string; // Number or formula
  
  // Role/position this rule applies to
  role?: string;
  
  // Computed from parsing formulas
  requiredAttributes: string[]; // Attribute names referenced in formulas
  
  // Validation
  hasErrors: boolean;
  errors?: string[];
}

// A ruleset (container for rules)
export interface Ruleset {
  id: string;
  name: string;
  description?: string;
  rules: Rule[];
  assignedSiteCount: number;
  requiredAttributes: string[]; // Union of all rules' required attributes
  createdAt: string;
  updatedAt: string;
}

// Assignment status
export type AssignmentStatus = 'active' | 'scheduled' | 'expired';

// A ruleset assignment to an org unit
export interface RulesetAssignment {
  id: string;
  rulesetId: string;
  rulesetName: string;
  orgUnitId: string;
  orgUnitName: string;
  effectiveFrom: string; // ISO date
  effectiveUntil?: string; // ISO date, null = indefinite
  status: AssignmentStatus;
  createdAt: string;
}

// Org unit with its assignments (for timeline view)
export interface OrgUnitWithAssignments {
  orgUnit: OrgUnit;
  assignments: RulesetAssignment[];
  hasGap: boolean; // True if there's a future period with no rulesets
  missingAttributes: string[]; // Required by assigned rulesets but not set
}

// Validation result for assignment
export interface AssignmentValidation {
  isValid: boolean;
  missingAttributes: string[];
  warnings: string[];
}

// Formula token types for syntax highlighting
export type FormulaTokenType = 'attribute' | 'operator' | 'literal' | 'function' | 'error';

export interface FormulaToken {
  type: FormulaTokenType;
  value: string;
  startIndex: number;
  endIndex: number;
}

// Parsed formula result
export interface ParsedFormula {
  raw: string;
  tokens: FormulaToken[];
  referencedAttributes: string[];
  isValid: boolean;
  errors: string[];
  resolvedValue?: string; // For preview with specific org unit
}

// Tab navigation
export type LabourRulesTab = 'attributes' | 'org-unit-attributes' | 'rulesets' | 'assignments';

// Modal state types
export interface ModalState {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'delete' | 'assign';
}
