import { Routes, Route, Link } from 'react-router-dom'
import { LabourRules } from '../prototype-outputs/labour-rules-configuration/LabourRules.tsx'
import { LabourRulesLowFi } from '../prototype-outputs/labour-rules-low-fi/LabourRulesLowFi.tsx'
import { FloatingNav } from './components/FloatingNav'
import { PWSConfig } from '../prototype-outputs/pws-config/PWSConfig'
import { ChevronRightIcon } from './components/shared/Icon'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center w-full max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          UI Experiments
        </h1>
        <p className="text-gray-600 mb-12">
          Prototype experiments for Sona UI
        </p>
        <div className="flex flex-col gap-8 items-center">
          {/* Most Recent Section */}
          <div className="w-full">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-left">
              Most recent
            </h2>
            <Link 
              to="/pws-config" 
              className="w-full flex items-center justify-between px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors group"
            >
              <span>PWS Config Prototype</span>
              <ChevronRightIcon size="sm" className="text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* All Other Prototypes Section */}
          <div className="w-full">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-left">
              All other prototypes
            </h2>
            <div className="flex flex-col gap-3">
              <Link 
                to="/labour-rules" 
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors group"
              >
                <span>Labour Rules Prototype</span>
                <ChevronRightIcon size="sm" className="text-gray-500 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/labour-rules-low-fi" 
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors group"
              >
                <span>Labour Rules Low-Fi Wireframe</span>
                <ChevronRightIcon size="sm" className="text-gray-500 group-hover:translate-x-1 transition-transform" />
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
      </Routes>
      <FloatingNav />
    </>
  )
}

export default App
