import { useState } from 'react'
import { CONVICTION_SOURCES, PRODUCT_INTERESTS } from '../../utils/deaneries'
import { validateStepThree } from '../../utils/validation'

export default function StepThree({ initialData, onSubmit, onRegisterAnother }) {
  const [parish, setParish] = useState(initialData.parish)
  const [convictionSource, setConvictionSource] = useState(initialData.convictionSource)
  const [productInterest, setProductInterest] = useState(initialData.productInterest)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const data = { parish: parish.trim(), convictionSource, productInterest }
    const newErrors = validateStepThree(data)
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="parish" className="block text-sm font-medium text-gray-700 mb-1">
          Parish
        </label>
        <input
          id="parish"
          type="text"
          value={parish}
          onChange={(e) => setParish(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime"
        />
        {errors.parish && <p className="text-red-600 text-sm mt-1">{errors.parish}</p>}
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">
          What convinced you to experience AYD with KcBlendz?
        </legend>
        <div className="space-y-2">
          {CONVICTION_SOURCES.map((option) => (
            <label key={option} className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="convictionSource"
                value={option}
                checked={convictionSource === option}
                onChange={(e) => setConvictionSource(e.target.value)}
                className="accent-lime"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.convictionSource && (
          <p className="text-red-600 text-sm mt-1">{errors.convictionSource}</p>
        )}
      </fieldset>

      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">
          Which KcBlendz product are you most interested in experiencing?
        </legend>
        <div className="space-y-2">
          {PRODUCT_INTERESTS.map((option) => (
            <label key={option} className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="productInterest"
                value={option}
                checked={productInterest === option}
                onChange={(e) => setProductInterest(e.target.value)}
                className="accent-lime"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.productInterest && (
          <p className="text-red-600 text-sm mt-1">{errors.productInterest}</p>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-lime text-ink rounded-md py-3 font-display font-semibold hover:bg-gold transition-colors duration-200 disabled:opacity-60 min-h-11"
      >
        {submitting ? 'Submitting...' : 'DONE'}
      </button>

      <button
        type="button"
        onClick={onRegisterAnother}
        className="w-full text-gray-500 text-sm hover:text-ink transition-colors duration-200 min-h-11"
      >
        Register Someone Else on This Phone
      </button>
    </form>
  )
}
