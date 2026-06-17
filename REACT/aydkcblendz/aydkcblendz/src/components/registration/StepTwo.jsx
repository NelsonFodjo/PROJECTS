import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export default function StepTwo({ qrCodeId, onContinue, onRegisterAnother }) {
  const canvasWrapperRef = useRef(null)

  function handleDownload() {
    const canvas = canvasWrapperRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = `${qrCodeId}.png`
    link.click()
  }

  return (
    <div className="text-center space-y-4">
      <h2 className="font-display font-bold text-2xl text-ink">🎉 You're In!</h2>

      <div ref={canvasWrapperRef} className="flex justify-center">
        <QRCodeCanvas value={qrCodeId} size={280} includeMargin />
      </div>

      <p className="text-gray-700 font-medium">
        📌 Show this at AYD on Aug 9 to be eligible for the raffle
      </p>

      <button
        type="button"
        onClick={handleDownload}
        className="w-full border border-gray-300 text-gray-700 rounded-md py-2.5 font-medium hover:bg-gray-50 transition-colors duration-200 min-h-11"
      >
        Download QR Code
      </button>

      <button
        type="button"
        onClick={onContinue}
        className="w-full bg-lime text-ink rounded-md py-3 font-display font-semibold hover:bg-gold transition-colors duration-200 min-h-11"
      >
        CONTINUE →
      </button>

      <button
        type="button"
        onClick={onRegisterAnother}
        className="w-full text-gray-500 text-sm hover:text-ink transition-colors duration-200 min-h-11"
      >
        Register Someone Else on This Phone
      </button>
    </div>
  )
}
