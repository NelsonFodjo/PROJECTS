export default function CTASection({ onRegisterClick }) {
  return (
    <section className="bg-lime py-16 px-4 text-center">
      <h2 className="text-3xl font-display font-bold text-ink">So, are you done?</h2>
      <p className="text-ink/70 mt-3 max-w-md mx-auto">
        Spots are filling up fast. Register now to lock in your QR pass for AYD with KcBlendz.
      </p>
      <button
        type="button"
        onClick={onRegisterClick}
        className="mt-6 bg-ink text-white rounded-md px-6 py-3 font-display font-semibold hover:bg-ink/90 transition-colors duration-200 min-h-11"
      >
        Register Now
      </button>
    </section>
  )
}
