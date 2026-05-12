import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ui/ThemeToggle'

const DASHBOARD_SIGN_IN = 'https://app.agentronics.dev/sign-in'
const DASHBOARD_SIGN_UP = 'https://app.agentronics.dev/sign-up'

const navLinks = [
  { label: 'Why Agentronics', href: '#problems' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Agentronics" className="w-8 h-8" />
          <span className="text-xl font-bold text-text-primary">
            Agentronics
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a
            href={DASHBOARD_SIGN_IN}
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Sign in
          </a>
          <a
            href={DASHBOARD_SIGN_UP}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg hover:opacity-90 transition-opacity"
          >
            Get started
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-text-primary"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-bg-card/95 backdrop-blur-xl border-b border-border px-6 pb-6"
        >
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={DASHBOARD_SIGN_IN}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 text-center text-sm font-medium rounded-lg border border-border-strong text-text-primary"
            >
              Sign in
            </a>
            <a
              href={DASHBOARD_SIGN_UP}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 text-center text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg"
            >
              Get started
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
