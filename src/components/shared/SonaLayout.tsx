import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * SonaLayout - Standard page layout with sidebar navigation
 * 
 * Based on: example-sona-UI-screens/side-navigation.html
 * Uses: Design system tokens (typography, colors, spacing)
 * 
 * Sidebar specs:
 * - Width: 280px
 * - Logo: Sona. in emerald-500, 24px semibold
 * - Nav items: 14px medium, gray-700, hover: gray-100
 * - Active: sky-700, bg-sky-50, 3px right border
 * - Notification badge: red-500, 11px semibold, rounded-full
 */

// Navigation item type
interface NavItem {
  label: string;
  path: string;
  icon: string; // Emoji icon to match side-navigation.html
  badge?: number; // Notification count
}

// Section type for grouping nav items
interface NavSection {
  title: string;
  items: NavItem[];
}

interface SonaLayoutProps {
  children: ReactNode;
  navigation?: NavSection[];
  pageTitle?: string;
  pageSubtitle?: string;
  headerActions?: ReactNode;
  showHeader?: boolean;
}

// Default Sona navigation structure (from side-navigation.html)
const defaultNavigation: NavSection[] = [
  {
    title: 'Business Wide',
    items: [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Roster', path: '/roster', icon: '📋' },
      { label: 'Revenues & Forecasts', path: '/revenues', icon: '💰' },
      { label: 'Employee Management', path: '/employees', icon: '👥' },
      { label: 'Agentic Workforce', path: '/agentic', icon: '🎯' },
      { label: 'Tasks', path: '/tasks', icon: '✅', badge: 3 },
      { label: 'Inbox', path: '/inbox', icon: '📧' },
      { label: 'Vacation', path: '/vacation', icon: '🏖️' },
      { label: 'Retention', path: '/retention', icon: '🎯' },
      { label: 'Payroll', path: '/payroll', icon: '💼' },
      { label: 'Insights', path: '/insights', icon: '📊' },
      { label: 'Feed', path: '/feed', icon: '📰' },
      { label: 'Chat', path: '/chat', icon: '💬', badge: 1 },
      { label: 'Admin', path: '/admin', icon: '⚙️' },
    ],
  },
  {
    title: 'People We Support',
    items: [
      { label: 'Select a location...', path: '/locations', icon: '📍' },
      { label: "What's new in Sona", path: '/whats-new', icon: '🆕' },
      { label: 'Support', path: '/support', icon: '❓' },
      { label: 'Settings', path: '/settings', icon: '⚙️' },
    ],
  },
];

export function SonaLayout({
  children,
  navigation = defaultNavigation,
  pageTitle,
  pageSubtitle,
  headerActions,
  showHeader = true,
}: SonaLayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - 280px width per side-navigation.html */}
      <aside className="w-[280px] bg-white border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0">
        {/* Logo Header - padding: 16px 24px */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-emerald-500">
            Sona.
          </Link>
          {/* Hamburger menu for mobile */}
          <button className="text-lg text-gray-500 hover:text-gray-700 lg:hidden">
            ☰
          </button>
        </div>

        {/* Navigation Content - padding: 24px 0 */}
        <nav className="py-6">
          {navigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              {/* Section Title - 12px semibold uppercase with letter-spacing */}
              <div className="px-6 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em]">
                {section.title}
              </div>
              
              {/* Nav Items */}
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-sky-700 bg-sky-50 border-r-[3px] border-sky-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {/* Icon - 20px width with 12px right margin */}
                    <span className="w-5 mr-3 text-center">{item.icon}</span>
                    
                    {/* Label */}
                    {item.label}
                    
                    {/* Notification Badge */}
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Page Header Card (optional) */}
          {showHeader && (pageTitle || headerActions) && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6 flex items-center justify-between">
              <div>
                {pageTitle && (
                  <h1 className="text-h2 text-gray-900">
                    {pageTitle}
                  </h1>
                )}
                {pageSubtitle && (
                  <p className="text-body text-gray-500 mt-1">{pageSubtitle}</p>
                )}
              </div>
              {headerActions && <div className="flex gap-3">{headerActions}</div>}
            </div>
          )}

          {/* Page Content */}
          {children}
        </div>
      </main>
    </div>
  );
}

/**
 * SonaSidebar - Standalone sidebar component for custom layouts
 * 
 * Use this when you need just the sidebar without the full layout.
 */
export function SonaSidebar({
  navigation = defaultNavigation,
  currentPath,
}: {
  navigation?: NavSection[];
  currentPath?: string;
}) {
  return (
    <aside className="w-[280px] bg-white border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0">
      {/* Logo Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <span className="text-2xl font-semibold text-emerald-500">Sona.</span>
        <button className="text-lg text-gray-500 hover:text-gray-700 lg:hidden">
          ☰
        </button>
      </div>

      {/* Navigation */}
      <nav className="py-6">
        {navigation.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <div className="px-6 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-[0.05em]">
              {section.title}
            </div>
            {section.items.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-sky-700 bg-sky-50 border-r-[3px] border-sky-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="w-5 mr-3 text-center">{item.icon}</span>
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default SonaLayout;
