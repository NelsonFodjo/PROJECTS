import { useState } from 'react'
import { Search, CheckCircle2, XCircle } from 'lucide-react'
import AdminQRScanner from './AdminQRScanner'
import { findRegistrationByQrCode, markAsPurchased } from '../../hooks/useRegistrations'
import { formatTimestamp } from '../../utils/formatters'

export default function VerificationPanel() {
  const [manualCode, setManualCode] = useState('')
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState('')
  const [confirmedAt, setConfirmedAt] = useState(null)

  async function lookup(code) {
    setStatus('')
    setConfirmedAt(null)
    if (!code.trim()) return
    try {
      const registration = await findRegistrationByQrCode(code.trim())
      if (registration) {
        setResult(registration)
        setStatus('valid')
      } else {
        setResult(null)
        setStatus('invalid')
      }
    } catch {
      setResult(null)
      setStatus('error')
    }
  }

  async function handleMarkPurchased() {
    if (!result) return
    try {
      const updated = await markAsPurchased(result.id)
      setResult(updated)
      setConfirmedAt(updated.verified_at)
    } catch {
      setStatus('error')
    }
  }

  function handleManualSearch(e) {
    e.preventDefault()
    lookup(manualCode)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-semibold text-ink mb-3">QR Scanner</h2>
        <AdminQRScanner onScan={(code) => lookup(code)} />
      </div>

      <div>
        <h2 className="font-display font-semibold text-ink mb-3">Manual Code Entry</h2>
        <form onSubmit={handleManualSearch} className="flex gap-2">
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="Registration ID"
            className="flex-1 border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-colors duration-150"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-lime text-ink rounded-lg px-4 py-2 font-medium hover:bg-gold transition-colors duration-200"
          >
            <Search size={16} />
            Search
          </button>
        </form>
      </div>

      {status === 'valid' && result && (
        <div className="border border-lime/40 bg-lime/10 rounded-xl p-4 space-y-2">
          <p className="flex items-center gap-1.5 font-display font-semibold text-ink">
            <CheckCircle2 className="text-lime" size={18} />
            Valid Registration
          </p>
          <p className="text-neutral">
            <span className="font-medium text-ink">Name:</span> {result.name}
          </p>
          <p className="text-neutral">
            <span className="font-medium text-ink">WhatsApp:</span> {result.whatsapp}
          </p>
          <p className="text-neutral">
            <span className="font-medium text-ink">Registered:</span>{' '}
            {formatTimestamp(result.created_at)}
          </p>
          {result.verified_at ? (
            <p className="text-ink font-medium pt-1">
              ✅ Purchase verified at {formatTimestamp(confirmedAt || result.verified_at)}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleMarkPurchased}
              className="w-full bg-lime text-ink rounded-lg py-2.5 font-display font-semibold hover:bg-gold transition-colors duration-200 min-h-11"
            >
              MARK AS PURCHASED
            </button>
          )}
        </div>
      )}

      {status === 'invalid' && (
        <div className="flex items-center gap-1.5 border border-coral/30 bg-coral/10 rounded-xl p-4">
          <XCircle className="text-coral" size={18} />
          <p className="font-display font-semibold text-coral">Invalid Code</p>
        </div>
      )}

      {status === 'error' && (
        <div className="border border-coral/30 bg-coral/10 rounded-xl p-4">
          <p className="font-medium text-coral">Something went wrong. Please try again.</p>
        </div>
      )}
    </div>
  )
}
