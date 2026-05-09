import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, CheckCircle } from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type Props = {
  open: boolean
  onClose: () => void
}

export default function WaitlistModal({ open, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', business: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as { error?: string }

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  function handleClose() {
    onClose()
    // Reset after close animation
    setTimeout(() => {
      setForm({ name: '', email: '', business: '' })
      setStatus('idle')
      setErrorMsg('')
    }, 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md bg-bg-card border border-border-glow/20 rounded-2xl p-8 shadow-2xl shadow-border-glow/10"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={20} />
            </button>

            {status === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  You're on the list!
                </h3>
                <p className="text-text-secondary">
                  We'll reach out when early access opens.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-text-primary mb-1">
                  Get Early Access
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  Join the waitlist for governed agent infrastructure.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-lg bg-bg border border-border text-text-primary placeholder:text-text-secondary/40 text-sm focus:outline-none focus:border-border-glow/50 focus:ring-1 focus:ring-border-glow/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-bg border border-border text-text-primary placeholder:text-text-secondary/40 text-sm focus:outline-none focus:border-border-glow/50 focus:ring-1 focus:ring-border-glow/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="business" className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                      Tell us about your business
                    </label>
                    <textarea
                      id="business"
                      name="business"
                      rows={3}
                      value={form.business}
                      onChange={handleChange}
                      placeholder="What does your company do? How would you use Agentronics?"
                      className="w-full px-4 py-2.5 rounded-lg bg-bg border border-border text-text-primary placeholder:text-text-secondary/40 text-sm focus:outline-none focus:border-border-glow/50 focus:ring-1 focus:ring-border-glow/30 transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-danger">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Join the Waitlist'}
                    {status !== 'submitting' && (
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
