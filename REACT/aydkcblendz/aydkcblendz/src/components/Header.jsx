import { motion } from 'framer-motion'

const KCBLENDZ_LOGO =
  'https://res.cloudinary.com/dazv72mhz/image/upload/v1781722507/kcblendz_logo_ghcd0p.png'

export default function Header({ onRegisterClick }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-offwhite/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <img src={KCBLENDZ_LOGO} alt="KcBlendz" className="h-9 w-auto" loading="lazy" />

        <span className="font-display text-ink text-lg hidden md:inline">AYD with KcBlendz</span>

        <nav className="flex items-center gap-6">
          <a
            href="#blends"
            className="relative text-neutral hover:text-ink font-medium hidden sm:inline group"
          >
            The Blends
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-lime transition-all duration-200 group-hover:w-full" />
          </a>
          <motion.button
            type="button"
            onClick={onRegisterClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="font-display bg-lime text-ink rounded-lg px-4 py-2"
          >
            Register
          </motion.button>
        </nav>
      </div>
    </header>
  )
}
