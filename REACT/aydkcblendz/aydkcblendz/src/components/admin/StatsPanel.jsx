import { useAdminStats } from '../../hooks/useRegistrations'
import { toCsv, downloadCsv } from '../../utils/formatters'

export default function StatsPanel() {
  const { stats, loading } = useAdminStats()

  const conversionRate = stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0

  function handleExport() {
    const csv = toCsv(stats.rows || [])
    downloadCsv(csv, `kcblendz-registrations-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  if (loading) {
    return <p className="text-gray-500">Loading stats...</p>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-black">{stats.total}</div>
          <div className="text-xs text-gray-500 mt-1">Registrations</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-black">{stats.verified}</div>
          <div className="text-xs text-gray-500 mt-1">Purchases Verified</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-black">{conversionRate}%</div>
          <div className="text-xs text-gray-500 mt-1">Conversion Rate</div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-black mb-2">Top 5 Deaneries</h3>
        <table className="w-full text-left border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-sm font-medium text-gray-600">Deanery</th>
              <th className="px-3 py-2 text-sm font-medium text-gray-600">Count</th>
            </tr>
          </thead>
          <tbody>
            {stats.topDeaneries.map((row) => (
              <tr key={row.deanery} className="border-t border-gray-200">
                <td className="px-3 py-2 text-gray-700">{row.deanery}</td>
                <td className="px-3 py-2 text-gray-700">{row.count}</td>
              </tr>
            ))}
            {stats.topDeaneries.length === 0 && (
              <tr>
                <td colSpan={2} className="px-3 py-2 text-gray-400">
                  No data yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-semibold text-black mb-2">Product Interest Breakdown</h3>
        <ul className="space-y-1">
          {stats.productBreakdown.map((row) => (
            <li key={row.product} className="flex justify-between text-gray-700">
              <span>{row.product}</span>
              <span>{row.percentage}%</span>
            </li>
          ))}
          {stats.productBreakdown.length === 0 && <li className="text-gray-400">No data yet</li>}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleExport}
        className="w-full border border-gray-300 text-gray-700 rounded-md py-2.5 font-medium hover:bg-gray-50 transition-colors duration-200 min-h-11"
      >
        Export CSV
      </button>
    </div>
  )
}
