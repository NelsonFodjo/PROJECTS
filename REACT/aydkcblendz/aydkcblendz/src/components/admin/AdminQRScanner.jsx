import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

const SCANNER_ELEMENT_ID = 'qr-scanner-region'

export default function AdminQRScanner({ onScan }) {
  const scannerRef = useRef(null)
  const [scanning, setScanning] = useState(false)
  const [cameraError, setCameraError] = useState('')

  useEffect(() => {
    const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID)
    scannerRef.current = scanner

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onScan(decodedText)
        },
        () => {},
      )
      .then(() => setScanning(true))
      .catch(() => setCameraError('Unable to access camera. Use manual entry below.'))

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div id={SCANNER_ELEMENT_ID} className="w-full max-w-sm mx-auto rounded-lg overflow-hidden" />
      {!scanning && !cameraError && (
        <p className="text-gray-500 text-sm text-center mt-2">Starting camera...</p>
      )}
      {cameraError && <p className="text-red-600 text-sm text-center mt-2">{cameraError}</p>}
    </div>
  )
}
