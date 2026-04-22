import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const layers = ['Auth', 'Authz', 'Memory', 'Observability', 'Context Mgmt']

export default function Solution() {
  return (
    <section id="solution" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          prefix="THE SOLUTION"
          title="One SDK. Five problems solved."
        />

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="bg-bg-card rounded-xl border border-border-glow-30 p-8 md:p-12 overflow-hidden">
            {/* Flow diagram */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
              {/* WebMCP Site */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="px-6 py-4 bg-code-bg rounded-lg border border-white/10 text-center"
              >
                <span className="text-xs font-mono text-text-secondary block mb-1">Your Site</span>
                <span className="text-lg font-bold text-text-primary">WebMCP Site</span>
              </motion.div>

              {/* Arrow */}
              <div className="hidden md:block text-text-secondary/30 text-2xl px-3">←→</div>
              <div className="md:hidden text-text-secondary/30 text-xl py-1">↕</div>

              {/* Agentronics Gateway - center piece */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative px-8 py-6 rounded-xl border-2 border-border-glow/40 bg-gradient-to-b from-border-glow/8 to-transparent"
              >
                <span className="text-xs font-mono text-accent block mb-2 text-center">SDK + Gateway</span>
                <span className="text-xl font-bold text-text-primary block text-center mb-4">Agentronics</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {layers.map((layer, i) => (
                    <motion.span
                      key={layer}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                      className="px-3 py-1 rounded-full bg-border-glow/10 text-xs font-mono text-border-glow border border-border-glow/20"
                    >
                      {layer}
                    </motion.span>
                  ))}
                </div>
                {/* Glow */}
                <div className="absolute -inset-1 bg-border-glow/5 rounded-xl blur-xl -z-10" />
              </motion.div>

              {/* Arrow */}
              <div className="hidden md:block text-text-secondary/30 text-2xl px-3">←→</div>
              <div className="md:hidden text-text-secondary/30 text-xl py-1">↕</div>

              {/* AI Agent */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="px-6 py-4 bg-code-bg rounded-lg border border-white/10 text-center"
              >
                <span className="text-xs font-mono text-text-secondary block mb-1">External</span>
                <span className="text-lg font-bold text-text-primary">AI Agent</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Code snippet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-code-bg rounded-xl border border-border-glow-30 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-card border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-danger/80" />
              <div className="w-3 h-3 rounded-full bg-accent/80" />
              <div className="w-3 h-3 rounded-full bg-success/80" />
              <span className="ml-3 text-xs text-text-secondary font-mono">setup.js</span>
            </div>
            <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
              <code>
                <span className="text-border-glow">import</span>{' '}
                <span className="text-text-primary">{'{ agentronics }'}</span>{' '}
                <span className="text-border-glow">from</span>{' '}
                <span className="text-success">'@agentronics/sdk'</span>;{'\n'}
                {'\n'}
                <span className="text-text-primary">agentronics</span>
                <span className="text-text-secondary">.</span>
                <span className="text-accent">init</span>
                <span className="text-text-secondary">{'({ '}</span>
                <span className="text-text-primary">siteId</span>
                <span className="text-text-secondary">: </span>
                <span className="text-success">'your-site-id'</span>
                <span className="text-text-secondary">{' })'}</span>;{'\n'}
                <span className="text-text-secondary/50">{'// That\'s it. Every tool call is now governed.'}</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
