export default function CTASection({ onRegisterClick }) {
  return (
    <section className="bg-black py-16 px-4 text-center">
      <h2 className="text-3xl font-bold text-white">So, are you done?</h2>
      <p className="text-gray-300 mt-3 max-w-md mx-auto">
        Spots are filling up fast. Register now to lock in your QR pass for AYD with KcBlendz.
      </p>
      <button
        type="button"
        onClick={onRegisterClick}
        className="mt-6 bg-white text-black rounded-md px-6 py-3 font-medium hover:bg-gray-200 transition-colors duration-200 min-h-11"
      >
        Register Now
      </button>
    </section>
  )
}
