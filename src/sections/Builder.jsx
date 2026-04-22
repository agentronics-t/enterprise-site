import { motion } from 'framer-motion'

export default function Builder() {
  return (
    <section id="builder" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-sm tracking-widest text-accent mb-12">
            ///THE BUILDER
          </p>

          <div className="card-glow bg-bg-card rounded-2xl p-10 md:p-14">
            {/* Photo placeholder */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-border-glow/30 to-accent/30 mx-auto mb-6 flex items-center justify-center border-2 border-border-glow/20">
              <span className="text-3xl font-bold text-text-primary">N</span>
            </div>

            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Neelakandan NC
            </h3>

            {/* Quote */}
            <blockquote className="mt-6 mb-8 max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed italic">
                "WebMCP is to AI agents what TCP/IP was to the internet — the plumbing.
                But TCP/IP needed DNS, TLS, firewalls, and load balancers before it was
                production-ready. Agentronics is that operational layer for the agentic web."
              </p>
            </blockquote>

            {/* Credentials */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Zera', 'NSCIF 2026 Finalist', 'context-hub contributor'].map((cred) => (
                <span
                  key={cred}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-text-secondary"
                >
                  {cred}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
