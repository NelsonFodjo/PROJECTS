import { Users, CheckCircle2, TrendingUp, Download } from 'lucide-react'
import { useAdminStats } from '../../hooks/useRegistrations'
import { toCsv, downloadCsv } from '../../utils/formatters'

const STAT_CARDS_BORDER = ['border-lime', 'border-gold', 'border-coral']

export default function StatsPanel() {
  const { stats, loading } = useAdminStats()

  const conversionRate = stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0

  function handleExport() {
    const csv = toCsv(stats.rows || [])
    downloadCsv(csv, `kcblendz-registrations-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  if (loading) {
    return <p className="text-neutral">Loading stats...</p>
  }

  const cards = [
    { label: 'Registrations', value: stats.total, icon: Users },
    { label: 'Purchases Verified', value: stats.verified, icon: CheckCircle2 },
    { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card, i) => (
          <div
            key={card.label}
            className={`bg-white rounded-lg p-4 text-center border-l-4 ${STAT_CARDS_BORDER[i]} shadow-soft`}
          >
            <card.icon className="text-neutral mx-auto mb-1" size={18} />
            <div className="font-display font-bold text-2xl text-ink">{card.value}</div>
            <div className="text-xs text-neutral mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-display font-semibold text-ink mb-3">Top 5 Deaneries</h3>
        <div className="space-y-2">
          {stats.topDeaneries.map((row) => {
            const max = stats.topDeaneries[0]?.count || 1
            return (
              <div key={row.deanery} className="flex items-center gap-3">
                <span className="text-sm text-neutral w-28 truncate">{row.deanery}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-lime rounded-full transition-all duration-500"
                    style={{ width: `${(row.count / max) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-ink font-medium w-6 text-right">{row.count}</span>
              </div>
            )
          })}
          {stats.topDeaneries.length === 0 && <p className="text-neutral text-sm">No data yet</p>}
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-ink mb-3">Product Interest Breakdown</h3>
        <ul className="space-y-1.5">
          {stats.productBreakdown.map((row) => (
            <li key={row.product} className="flex justify-between text-neutral text-sm">
              <span>{row.product}</span>
              <span className="text-ink font-medium">{row.percentage}%</span>
            </li>
          ))}
          {stats.productBreakdown.length === 0 && (
            <li className="text-neutral text-sm">No data yet</li>
          )}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleExport}
        className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-ink rounded-lg py-2.5 font-medium hover:border-lime hover:bg-lime/5 transition-colors duration-200 min-h-11"
      >
        <Download size={16} />
        Export CSV
      </button>
    </div>
  )
}
