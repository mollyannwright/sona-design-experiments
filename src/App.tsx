import { Routes, Route, Link } from 'react-router-dom'
import { LabourRules } from '../prototype-outputs/labour-rules-configuration/LabourRules.tsx'
import { LabourRulesLowFi } from '../prototype-outputs/labour-rules-low-fi/LabourRulesLowFi.tsx'
import { FloatingNav } from './components/FloatingNav'
import { PWSConfig } from '../prototype-outputs/pws-config/PWSConfig'
import ComplianceDashboardLowFi from '../prototype-outputs/compliance-dashboard-low-fi/ComplianceDashboardLowFi'
import ComplianceDashboardV2 from '../prototype-outputs/compliance-dashboard-v2/ComplianceDashboardV2'
import DesignSystemShowcase from '../prototype-outputs/sonaui-design-system/DesignSystemShowcase'
import { ChevronRightIcon } from './components/shared/Icon'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          UI Experiments
        </h1>
        <p className="text-gray-600 mb-12">
          Prototype experiments for Sona UI
        </p>
        <div className="flex flex-col gap-8 items-center">
          {/* Most Recent Section */}
          <div className="w-[280px]">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-left">
              Most recent
            </h2>
            <Link 
              to="/labour-rules" 
              className="w-full flex items-center justify-between px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors group text-left min-w-0"
            >
              <span className="flex-1 truncate min-w-0">Labour Rules Prototype</span>
              <ChevronRightIcon size="sm" className="text-white group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
            </Link>
          </div>

          {/* All Other Prototypes Section */}
          <div className="w-[280px]">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-left">
              All other prototypes
            </h2>
            <div className="flex flex-col gap-3">
              <Link 
                to="/pws-config" 
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors group text-left min-w-0"
              >
                <span className="flex-1 truncate min-w-0">PWS Configuration</span>
                <ChevronRightIcon size="sm" className="text-gray-500 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
              </Link>
              <Link 
                to="/design-system" 
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors group text-left min-w-0"
              >
                <span className="flex-1 truncate min-w-0">Design System Showcase</span>
                <ChevronRightIcon size="sm" className="text-gray-500 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
              </Link>
              <Link 
                to="/compliance-low-fi" 
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors group text-left min-w-0"
              >
                <span className="flex-1 truncate min-w-0">Compliance Dashboard Low-Fi Wireframe</span>
                <ChevronRightIcon size="sm" className="text-gray-500 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
              </Link>
              <Link 
                to="/compliance-v2" 
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors group text-left min-w-0"
              >
                <span className="flex-1 truncate min-w-0">Compliance Dashboard V2</span>
                <ChevronRightIcon size="sm" className="text-gray-500 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
              </Link>
              <Link 
                to="/labour-rules-low-fi" 
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors group text-left min-w-0"
              >
                <span className="flex-1 truncate min-w-0">Labour Rules Low-Fi Wireframe</span>
                <ChevronRightIcon size="sm" className="text-gray-500 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pws-config" element={<PWSConfig />} />
        <Route path="/labour-rules" element={<LabourRules />} />
        <Route path="/labour-rules-low-fi" element={<LabourRulesLowFi />} />
        <Route path="/design-system" element={<DesignSystemShowcase />} />
        <Route path="/compliance-low-fi" element={<ComplianceDashboardLowFi />} />
        <Route path="/compliance-v2" element={<ComplianceDashboardV2 />} />
      </Routes>
      <FloatingNav />
    </>
  )
}

export default App
