# Labour Rules Configuration Prototype

Prototype for the Labour Rules v2 feature - Attribute-based and date-bound productivity rules.

## Overview

This prototype implements the four main configuration areas for labour productivity rules:

1. **Attributes** - Define org-level attributes (time, boolean, integer, float, string)
2. **Org Unit Attributes** - Set attribute values per site (bulk edit)
3. **Rulesets & Rules** - Create rulesets with formula editor
4. **Assignments** - Assign rulesets to sites with date ranges

## Files

- `LabourRules.tsx` - Main component with all four tabs
- `labourRulesData.ts` - Mock data and helper functions
- `labourRules.ts` - TypeScript type definitions

## Product Brief

See: `/product-briefs/labour-rules/design-requirements-labour-rules-v2.txt`

## Route

Accessible at: `/labour-rules`
