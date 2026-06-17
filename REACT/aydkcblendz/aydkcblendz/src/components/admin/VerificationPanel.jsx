import { useState } from 'react'
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
        <h2 className="font-semibold text-black mb-3">QR Scanner</h2>
        <AdminQRScanner onScan={(code) => lookup(code)} />
      </div>

      <div>
        <h2 className="font-semibold text-black mb-3">Manual Code Entry</h2>
        <form onSubmit={handleManualSearch} className="flex gap-2">
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="Registration ID"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="bg-black text-white rounded-md px-4 py-2 font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Search
          </button>
        </form>
      </div>

      {status === 'valid' && result && (
        <div className="border border-green-200 bg-green-50 rounded-lg p-4 space-y-2">
          <p className="font-semibold text-green-700">✅ Valid Registration</p>
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> {result.name}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">WhatsApp:</span> {result.whatsapp}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Registered:</span> {formatTimestamp(result.created_at)}
          </p>
          {result.verified_at ? (
            <p className="text-green-700 font-medium">
              Purchase verified at {formatTimestamp(confirmedAt || result.verified_at)}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleMarkPurchased}
              className="w-full bg-green-600 text-white rounded-md py-2.5 font-medium hover:bg-green-700 transition-colors duration-200 min-h-11"
            >
              MARK AS PURCHASED
            </button>
          )}
        </div>
      )}

      {status === 'invalid' && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4">
          <p className="font-semibold text-red-700">❌ Invalid Code</p>
        </div>
      )}

      {status === 'error' && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4">
          <p className="font-semibold text-red-700">Something went wrong. Please try again.</p>
        </div>
      )}
    </div>
  )
}
