import { useState } from 'react'
import { ScanLine, Users, BarChart3, LogOut } from 'lucide-react'
import VerificationPanel from './VerificationPanel'
import StatsPanel from './StatsPanel'
import RegistrantsPanel from './RegistrantsPanel'

const TABS = [
  { id: 'verify', label: 'Verify', icon: ScanLine },
  { id: 'registrants', label: 'Registrants', icon: Users },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState('verify')

  function handleLogout() {
    sessionStorage.removeItem('kcblendz-admin-authed')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <h1 className="font-display font-bold text-ink">KcBlendz Admin</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-neutral hover:text-ink text-sm transition-colors duration-200"
        >
          <LogOut size={16} />
          Logout
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1.5 shadow-soft">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 font-medium text-sm transition-colors duration-200 min-h-11 ${
                tab === id ? 'bg-lime text-ink' : 'text-neutral hover:bg-gray-50'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-soft p-5">
          {tab === 'verify' && <VerificationPanel />}
          {tab === 'registrants' && <RegistrantsPanel />}
          {tab === 'stats' && <StatsPanel />}
        </div>
      </div>
    </div>
  )
}
