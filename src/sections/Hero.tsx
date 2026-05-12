import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import TerminalAnimation from '../components/TerminalAnimation'

const DASHBOARD_SIGN_UP = 'https://app.agentronics.dev/sign-up'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-glow-30 bg-border-glow/5 text-sm font-mono text-border-glow">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            The agent governance plane
          </span>
        </motion.div>

        <TerminalAnimation />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary text-center leading-[1.1] tracking-tight"
        >
          Know every agent on your site.
          <br />
          <span className="bg-gradient-to-r from-border-glow via-accent to-accent bg-clip-text text-transparent">
            Govern what they do.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 text-lg md:text-xl text-text-secondary text-center max-w-2xl leading-relaxed"
        >
          AI agents are already browsing your site — via WebMCP, signed requests,
          or stealth automation. Your analytics can't tell the difference.
          Agentronics can.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={DASHBOARD_SIGN_UP}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg font-semibold text-base hover:opacity-90 transition-all"
          >
            Get started
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border-strong text-text-primary font-semibold text-base hover:border-border-strong hover:bg-bg-elevated transition-all"
          >
            See the Dashboard
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 text-xs font-mono text-text-secondary/70 text-center max-w-xl"
        >
          HUMAN Security measured a{' '}
          <span className="text-accent">6,900% increase</span> in AI-agent traffic since mid-2025.
        </motion.p>
      </div>
    </section>
  )
}
