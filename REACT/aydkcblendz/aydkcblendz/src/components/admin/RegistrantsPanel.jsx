import { useMemo, useState } from 'react'
import { Search, CheckCircle2 } from 'lucide-react'
import { useAdminStats } from '../../hooks/useRegistrations'
import { formatTimestamp } from '../../utils/formatters'

export default function RegistrantsPanel() {
  const { stats, loading } = useAdminStats()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const rows = stats.rows || []
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter(
      (row) => row.name?.toLowerCase().includes(q) || row.whatsapp?.toLowerCase().includes(q),
    )
  }, [stats.rows, query])

  if (loading) {
    return <p className="text-neutral">Loading registrants...</p>
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral" size={16} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or WhatsApp number"
          className="w-full border-2 border-gray-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-colors duration-150"
        />
      </div>

      <p className="text-sm text-neutral">
        {filtered.length} of {stats.rows?.length || 0} registrants
      </p>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-sm font-medium text-neutral">Name</th>
              <th className="px-3 py-2 text-sm font-medium text-neutral">WhatsApp</th>
              <th className="px-3 py-2 text-sm font-medium text-neutral">Deanery</th>
              <th className="px-3 py-2 text-sm font-medium text-neutral">Registered</th>
              <th className="px-3 py-2 text-sm font-medium text-neutral">Verified</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-gray-100">
                <td className="px-3 py-2 text-ink">{row.name}</td>
                <td className="px-3 py-2 text-ink">{row.whatsapp}</td>
                <td className="px-3 py-2 text-neutral">{row.deanery}</td>
                <td className="px-3 py-2 text-neutral text-sm">
                  {formatTimestamp(row.created_at)}
                </td>
                <td className="px-3 py-2">
                  {row.verified_at ? (
                    <CheckCircle2 className="text-lime" size={18} />
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-neutral text-center">
                  No registrants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
