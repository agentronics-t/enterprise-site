import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import TerminalAnimation from '../components/TerminalAnimation'
import { useWaitlist } from '../components/WaitlistContext'

export default function Hero() {
  const { openWaitlist } = useWaitlist()
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Animated dot grid background */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-glow-30 bg-border-glow/5 text-sm font-mono text-border-glow">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            WebMCP-compatible
          </span>
        </motion.div>

        {/* Terminal animation */}
        <TerminalAnimation />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary text-center leading-[1.1] tracking-tight"
        >
          The infrastructure layer for
          <br />
          <span className="bg-gradient-to-r from-border-glow via-accent to-accent bg-clip-text text-transparent">
            the agentic web.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 text-lg md:text-xl text-text-secondary text-center max-w-2xl leading-relaxed"
        >
          WebMCP ships the protocol. Agentronics ships auth, memory, observability,
          and context management — in one SDK line.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={openWaitlist}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg-primary font-semibold text-base hover:opacity-90 transition-all cursor-pointer"
          >
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 text-text-primary font-semibold text-base hover:border-white/30 hover:bg-white/5 transition-all"
          >
            See How It Works
          </a>
        </motion.div>
      </div>
    </section>
  )
}
