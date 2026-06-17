import { useCountdown } from '../hooks/useCountdown'

function Box({ value, label }) {
  return (
    <div className="bg-gray-100 rounded-xl px-4 py-5 text-center min-w-20">
      <div className="text-3xl sm:text-4xl font-bold text-black tabular-nums transition-all duration-300">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1 uppercase tracking-wide">{label}</div>
    </div>
  )
}

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown()

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 text-center">
      <h2 className="text-sm sm:text-base font-bold uppercase tracking-wide text-gray-500 mb-6">
        Counting down to the day
      </h2>
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        <Box value={days} label="Days" />
        <Box value={hours} label="Hours" />
        <Box value={minutes} label="Mins" />
        <Box value={seconds} label="Secs" />
      </div>
    </section>
  )
}
