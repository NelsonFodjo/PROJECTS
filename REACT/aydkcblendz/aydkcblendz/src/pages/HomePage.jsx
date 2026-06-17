import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ProductShowcase from '../components/ProductShowcase'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import RegistrationModal from '../components/RegistrationModal'

export default function HomePage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header onRegisterClick={() => setShowModal(true)} />
      <Hero onRegisterClick={() => setShowModal(true)} />
      <ProductShowcase />
      <CTASection onRegisterClick={() => setShowModal(true)} />
      <Footer />
      {showModal && <RegistrationModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
