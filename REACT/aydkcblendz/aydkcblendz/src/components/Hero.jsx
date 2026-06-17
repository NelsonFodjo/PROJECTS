import { motion } from 'framer-motion'
import { useRegistrationCount } from '../hooks/useRegistrations'
import AnimatedCounter from './AnimatedCounter'

const SMOOTHIE_IMG = 'https://res.cloudinary.com/dazv72mhz/image/upload/v1781722506/smoothie_ff99dn.jpg'
const AYD_LOGO = 'https://res.cloudinary.com/dazv72mhz/image/upload/v1781722506/ayd_logo_qiru5y.png'

export default function Hero({ onRegisterClick }) {
  const count = useRegistrationCount()

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${SMOOTHIE_IMG})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/20" />

      <div className="max-w-6xl mx-auto px-4 py-24 md:py-36 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <img src={AYD_LOGO} alt="AYD" className="h-10 w-auto" loading="lazy" />
            <span className="inline-block bg-lime text-ink font-display font-semibold text-sm px-4 py-1.5 rounded-full">
              August 9, 2026
            </span>
          </div>

          <h1 className="font-display font-bold text-white text-4xl sm:text-6xl mt-5 leading-tight">
            AYD with KcBlendz
          </h1>
          <p className="font-display font-semibold text-lime text-2xl sm:text-3xl mt-2">
            Experience Something Fresh
          </p>

          <p className="text-gray-200 text-lg mt-4 max-w-md leading-relaxed">
            Join the movement and taste the freshest natural blends in town. Register now, get
            your QR pass, and be part of something refreshing.
          </p>

          <motion.button
            type="button"
            onClick={onRegisterClick}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.35)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="font-display font-semibold mt-7 bg-lime text-ink rounded-lg px-6 h-11 inline-flex items-center shadow-soft"
          >
            Register Now &rarr;
          </motion.button>

          <p className="mt-5 text-gray-300 text-sm flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-lime" aria-hidden="true" />
            <span className="font-semibold text-white">
              <AnimatedCounter value={count} />
            </span>
            people registered so far
          </p>
        </motion.div>
      </div>
    </section>
  )
}
