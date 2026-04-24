import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

export default function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, business }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <section id="early-access" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          prefix="EARLY ACCESS"
          title="Be the first to see your real traffic."
          subtitle="We're onboarding the first 50 sites. Drop your details and we'll set up a free agent traffic audit."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-glow bg-bg-card rounded-2xl border border-border-glow-30 p-8 md:p-10"
        >
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-success/20 border border-success/40 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={28} className="text-success" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">You're on the list.</h3>
              <p className="text-text-secondary">
                We'll be in touch to schedule your free agent traffic audit.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-code-bg border border-white/10 focus:border-border-glow/60 focus:outline-none text-text-primary placeholder:text-text-secondary/50 font-mono text-sm"
                />
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-code-bg border border-white/10 focus:border-border-glow/60 focus:outline-none text-text-primary placeholder:text-text-secondary/50 font-mono text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Company / site URL (optional)"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-code-bg border border-white/10 focus:border-border-glow/60 focus:outline-none text-text-primary placeholder:text-text-secondary/50 font-mono text-sm"
              />

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg-primary font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'submitting' ? 'Submitting...' : 'Get Early Access'}
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              {status === 'error' && (
                <p className="text-sm text-danger text-center">{errorMsg}</p>
              )}

              <p className="text-center text-xs font-mono text-text-secondary/70 pt-2">
                No credit card · 5-minute setup · See your agent traffic in real time
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
