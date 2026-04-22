import { useEffect } from 'react'
import { WaitlistProvider } from '../components/WaitlistContext'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import Problems from '../sections/Problems'
import Solution from '../sections/Solution'
import HowItWorks from '../sections/HowItWorks'
import Demo from '../sections/Demo'
import Landscape from '../sections/Landscape'
import Pricing from '../sections/Pricing'
import Builder from '../sections/Builder'
import Footer from '../sections/Footer'

export default function LandingPage() {
  // Fix: when arriving via anchor link (e.g. /#pricing), nudge scroll
  // so IntersectionObserver fires and reveals the whileInView content
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'instant' })
          window.scrollBy(0, 1)
          window.scrollBy(0, -1)
        })
      }
    }
  }, [])

  return (
    <WaitlistProvider>
      <div className="min-h-screen bg-bg-primary">
        <Navbar />
        <Hero />
        <Problems />
        <Solution />
        <HowItWorks />
        <Demo />
        <Landscape />
        <Pricing />
        <Builder />
        <Footer />
      </div>
    </WaitlistProvider>
  )
}
