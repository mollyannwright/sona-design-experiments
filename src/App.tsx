import { Routes, Route, Link } from 'react-router-dom'
import { TableView } from './components/TableView'
import { LabourRules } from './components/LabourRules'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          UI Experiments
        </h1>
        <p className="text-gray-600 mb-8">
          Prototype experiments for Sona UI
        </p>
        <div className="flex flex-col gap-3 items-center">
          <Link 
            to="/labour-rules" 
            className="w-64 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
          >
            Labour Rules Prototype
          </Link>
          <Link 
            to="/table" 
            className="w-64 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors"
          >
            Table Demo
          </Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/labour-rules" element={<LabourRules />} />
      <Route path="/table" element={
        <div className="h-screen">
          <TableView onBack={() => window.history.back()} />
        </div>
      } />
    </Routes>
  )
}

export default App
