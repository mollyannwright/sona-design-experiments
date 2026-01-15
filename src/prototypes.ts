/**
 * Prototype Registry
 * 
 * This file automatically lists all prototypes from prototype-outputs/.
 * When adding a new prototype:
 * 1. Create folder in prototype-outputs/[prototype-name]/
 * 2. Add entry below with route, name, and description
 * 3. Add route in App.tsx
 * 4. FloatingNav will automatically show it
 */

export interface Prototype {
  route: string;
  name: string;
  description?: string;
}

/**
 * Prototypes from prototype-outputs/
 * These are automatically discovered and shown in FloatingNav
 */
export const prototypes: Prototype[] = [
  {
    route: '/labour-rules',
    name: 'Labour Rules',
    description: 'Configuration prototype'
  },
  {
    route: '/labour-rules-low-fi',
    name: 'Labour Rules Low-Fi',
    description: 'Low-fidelity wireframe prototype'
  },
  {
    route: '/pws-config',
    name: 'PWS Config',
    description: 'People We Support configuration'
  },
  // Add more prototypes here as they're added to prototype-outputs/
];

/**
 * All prototypes combined
 */
export const allPrototypes: Prototype[] = [
  ...prototypes
];
