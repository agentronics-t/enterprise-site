import { useWaitlist } from '../components/WaitlistContext'

const footerLinks = [
  { label: 'Home', href: '#' },
  { label: 'Why Agentronics', href: '#problems' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Early Access', href: '#early-access' },
]

export default function Footer() {
  const { openWaitlist } = useWaitlist()
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* CTA banner */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Know every agent. Govern what they do.
          </h2>
          <p className="text-text-secondary mb-8">
            Get a free agent traffic audit — see your real numbers in one afternoon.
          </p>
          <button
            onClick={openWaitlist}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg font-semibold hover:opacity-90 transition-all cursor-pointer"
          >
            Get Early Access
          </button>
        </div>

        <div className="border-t border-border pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <img src="/favicon.svg" alt="Agentronics" className="w-8 h-8" />
            <div>
              <span className="text-xl font-bold text-text-primary">Agentronics</span>
              <p className="text-sm text-text-secondary mt-1">Built for the agentic web.</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center">
          <p className="text-xs text-text-secondary/50 font-mono">
            &copy; 2026 Agentronics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
