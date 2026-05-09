import { useEffect } from 'react'
import { WaitlistProvider } from '../components/WaitlistContext'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import Problems from '../sections/Problems'
import Solution from '../sections/Solution'
import HowItWorks from '../sections/HowItWorks'
import Dashboard from '../sections/Dashboard'
import AgentCommerce from '../sections/AgentCommerce'
import Landscape from '../sections/Landscape'
import Pricing from '../sections/Pricing'
import EarlyAccess from '../sections/EarlyAccess'
import Builder from '../sections/Builder'
import Footer from '../sections/Footer'

export default function LandingPage() {
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
      <div className="min-h-screen bg-bg">
        <Navbar />
        <Hero />
        <Problems />
        <Solution />
        <HowItWorks />
        <Dashboard />
        <AgentCommerce />
        <Landscape />
        <Pricing />
        <EarlyAccess />
        <Builder />
        <Footer />
      </div>
    </WaitlistProvider>
  )
}
