import { useState } from 'react'
import { DEANERIES } from '../../utils/deaneries'
import { validateStepOne } from '../../utils/validation'

export default function StepOne({ initialData, onSubmit }) {
  const [name, setName] = useState(initialData.name)
  const [whatsapp, setWhatsapp] = useState(initialData.whatsapp)
  const [email, setEmail] = useState(initialData.email)
  const [deanery, setDeanery] = useState(initialData.deanery)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const data = { name: name.trim(), whatsapp: whatsapp.trim(), email: email.trim(), deanery }
    const newErrors = validateStepOne(data)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-red-600 text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
          WhatsApp Number
        </label>
        <input
          id="whatsapp"
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="+2348012345678"
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime"
          aria-invalid={Boolean(errors.whatsapp)}
          aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
        />
        {errors.whatsapp && (
          <p id="whatsapp-error" className="text-red-600 text-sm mt-1">
            {errors.whatsapp}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email (optional)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-600 text-sm mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="deanery" className="block text-sm font-medium text-gray-700 mb-1">
          Deanery
        </label>
        <select
          id="deanery"
          value={deanery}
          onChange={(e) => setDeanery(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime"
          aria-invalid={Boolean(errors.deanery)}
          aria-describedby={errors.deanery ? 'deanery-error' : undefined}
        >
          <option value="">Select your deanery</option>
          {DEANERIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errors.deanery && (
          <p id="deanery-error" className="text-red-600 text-sm mt-1">
            {errors.deanery}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-lime text-ink rounded-md py-3 font-display font-semibold hover:bg-gold transition-colors duration-200 disabled:opacity-60 min-h-11"
      >
        {submitting ? 'Submitting...' : 'INTERESTED →'}
      </button>
    </form>
  )
}
