import { useState } from 'react'
import VerificationPanel from './VerificationPanel'
import StatsPanel from './StatsPanel'

export default function AdminDashboard() {
  const [tab, setTab] = useState('verify')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="font-bold text-black">KcBlendz Admin</h1>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setTab('verify')}
            className={`flex-1 rounded-md py-2.5 font-medium transition-colors duration-200 min-h-11 ${
              tab === 'verify' ? 'bg-black text-white' : 'bg-white border border-gray-300 text-gray-700'
            }`}
          >
            Verify
          </button>
          <button
            type="button"
            onClick={() => setTab('stats')}
            className={`flex-1 rounded-md py-2.5 font-medium transition-colors duration-200 min-h-11 ${
              tab === 'stats' ? 'bg-black text-white' : 'bg-white border border-gray-300 text-gray-700'
            }`}
          >
            Stats
          </button>
        </div>

        {tab === 'verify' ? <VerificationPanel /> : <StatsPanel />}
      </div>
    </div>
  )
}
