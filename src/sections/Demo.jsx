import { motion } from 'framer-motion'
import { ArrowRight, Clock, Zap, AlertTriangle, ShieldCheck } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { useWaitlist } from '../components/WaitlistContext'

export default function Demo() {
  const { openWaitlist } = useWaitlist()
  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          prefix="DEMO"
          title="See it in action."
          subtitle="Browser automation is fragile. WebMCP + Agentronics is governed."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: DOM scraping (old way) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-bg-card rounded-xl border border-white/10 p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-danger/50" />
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle size={18} className="text-danger" />
              <span className="text-xs font-mono text-danger uppercase tracking-wider">Browser Automation (DOM)</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-text-secondary" />
                <span className="text-text-secondary text-sm">~45 seconds per task</span>
              </div>
              <div className="bg-code-bg rounded-lg p-4 font-mono text-xs text-text-secondary">
                <div className="text-danger/70">// Fragile CSS selectors</div>
                <div>await page.click('.btn-add-to-cart');</div>
                <div>await page.waitForSelector('.cart-count');</div>
                <div className="text-danger/70">// ↑ breaks on any UI change</div>
              </div>
            </div>

            <div className="space-y-2">
              {['Breaks on UI changes', 'No authentication', 'No audit trail', 'Token cost: high'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-text-secondary/70">
                  <span className="text-danger">✗</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: WebMCP + Agentronics (new way) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glow bg-bg-card rounded-xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success to-border-glow" />
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck size={18} className="text-success" />
              <span className="text-xs font-mono text-success uppercase tracking-wider">WebMCP + Agentronics</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Zap size={16} className="text-accent" />
                <span className="text-text-primary text-sm font-medium">~20 seconds per task</span>
              </div>
              <div className="bg-code-bg rounded-lg p-4 font-mono text-xs text-text-secondary">
                <div className="text-success/70">// Structured tool calls</div>
                <div><span className="text-accent">agent</span>.callTool(<span className="text-success">"addToCart"</span>, {'{ id: "E001" }'});</div>
                <div className="text-success/70">// ↑ never breaks, always governed</div>
              </div>
            </div>

            <div className="space-y-2">
              {['Structured & stable', 'Authenticated agents', 'Full observability', 'Token cost: -71%'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-text-primary/80">
                  <span className="text-success">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <button
            onClick={openWaitlist}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg-primary font-semibold hover:opacity-90 transition-all cursor-pointer"
          >
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
