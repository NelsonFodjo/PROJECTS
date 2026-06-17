import { useState } from 'react'
import { validatePin } from '../../utils/validation'

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN

export default function AdminPinGate({ onAuthenticated }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!validatePin(pin)) {
      setError('Invalid PIN. Try again.')
      return
    }
    if (pin !== ADMIN_PIN) {
      setError('Invalid PIN. Try again.')
      return
    }
    sessionStorage.setItem('kcblendz-admin-authed', 'true')
    onAuthenticated()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow border border-gray-200 p-6 text-center"
      >
        <h1 className="text-lg font-bold text-black mb-2">Admin Access</h1>
        <p className="text-gray-500 text-sm mb-4">
          Enter Admin PIN to access verification dashboard
        </p>
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={(e) => {
            setError('')
            setPin(e.target.value.replace(/\D/g, ''))
          }}
          className="w-full text-center text-2xl tracking-widest border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Admin PIN"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="w-full mt-4 bg-black text-white rounded-md py-2.5 font-medium hover:bg-gray-800 transition-colors duration-200 min-h-11"
        >
          Unlock
        </button>
      </form>
    </div>
  )
}
