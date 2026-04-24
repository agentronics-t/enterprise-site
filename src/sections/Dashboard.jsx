import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldAlert, Activity } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { useWaitlist } from '../components/WaitlistContext'

const trafficMix = [
  { label: 'Human', pct: 62, color: '#94a3b8' },
  { label: 'ChatGPT Agent', pct: 18, color: '#10a37f' },
  { label: 'Gemini', pct: 12, color: '#4285f4' },
  { label: 'Claude', pct: 5, color: '#d97706' },
  { label: 'Unknown', pct: 3, color: '#ef4444' },
]

const activityFeed = [
  { agent: 'ChatGPT', action: 'product.search("noise-cancel headphones")', status: 'allowed', time: '2s ago' },
  { agent: 'Gemini', action: 'cart.add(id=E001)', status: 'allowed', time: '4s ago' },
  { agent: 'Stealth', action: 'admin.exportUsers()', status: 'blocked', time: '7s ago' },
  { agent: 'Claude', action: 'policy.returns()', status: 'allowed', time: '12s ago' },
  { agent: 'ChatGPT', action: 'checkout.begin()', status: 'allowed', time: '18s ago' },
]

const statusColor = {
  allowed: 'text-success',
  blocked: 'text-danger',
}

function DonutChart() {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  let offset = 0
  return (
    <svg viewBox="0 0 160 160" className="w-40 h-40 -rotate-90">
      <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18" />
      {trafficMix.map((slice) => {
        const length = (slice.pct / 100) * circumference
        const seg = (
          <motion.circle
            key={slice.label}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={slice.color}
            strokeWidth="18"
            strokeDasharray={`${length} ${circumference}`}
            strokeDashoffset={-offset}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            whileInView={{ strokeDasharray: `${length} ${circumference}` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        )
        offset += length
        return seg
      })}
    </svg>
  )
}

export default function Dashboard() {
  const { openWaitlist } = useWaitlist()
  return (
    <section id="dashboard" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          prefix="DASHBOARD"
          title="See your real traffic. Split human from agent."
          subtitle="A command center for every agent that touches your site — with policy, audit, and measurement in one pane."
        />

        {/* Mock dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="card-glow bg-bg-card rounded-2xl border border-border-glow-30 p-6 md:p-8"
        >
          {/* Header strip */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono text-text-secondary">LIVE</span>
              <span className="ml-3 text-sm text-text-primary font-semibold">agent-traffic › yoursite.com</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs font-mono text-text-secondary">
              <span>last 24h</span>
              <span className="text-success">▲ 6,900%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Donut */}
            <div className="lg:col-span-1 bg-code-bg rounded-xl border border-white/5 p-6">
              <p className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-4">
                Traffic Mix
              </p>
              <div className="flex justify-center mb-5">
                <DonutChart />
              </div>
              <div className="space-y-2">
                {trafficMix.map((slice) => (
                  <div key={slice.label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-sm"
                        style={{ background: slice.color }}
                      />
                      <span className="text-text-secondary">{slice.label}</span>
                    </div>
                    <span className="font-mono text-text-primary font-semibold">{slice.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div className="lg:col-span-2 bg-code-bg rounded-xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                  Agent Activity
                </p>
                <Activity size={14} className="text-accent" />
              </div>
              <div className="space-y-2">
                {activityFeed.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-bg-primary/50 border border-white/5 font-mono text-xs"
                  >
                    <span className="text-accent w-20 truncate">{row.agent}</span>
                    <span className="text-text-secondary flex-1 truncate">{row.action}</span>
                    <span className={`${statusColor[row.status]} uppercase tracking-wider w-20 text-right`}>
                      {row.status === 'allowed' ? (
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 size={12} /> allowed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          <ShieldAlert size={12} /> blocked
                        </span>
                      )}
                    </span>
                    <span className="text-text-secondary/60 w-12 text-right">{row.time}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stat strip */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/5">
                <div>
                  <p className="text-xs font-mono text-text-secondary">Governed Calls</p>
                  <p className="text-2xl font-extrabold text-text-primary mt-1">214,809</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-text-secondary">Policy Blocks</p>
                  <p className="text-2xl font-extrabold text-danger mt-1">1,284</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-text-secondary">Avg Trust Score</p>
                  <p className="text-2xl font-extrabold text-success mt-1">0.87</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-bg-card rounded-xl border border-white/10 p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-danger/50" />
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle size={18} className="text-danger" />
              <span className="text-xs font-mono text-danger uppercase tracking-wider">
                Without Agentronics
              </span>
            </div>
            <h4 className="text-lg font-bold text-text-primary mb-4">Your analytics dashboard</h4>
            <ul className="space-y-2 text-sm text-text-secondary/80">
              {[
                'All traffic looks the same',
                'Conversion rate distorted by agents',
                'Admin tools exposed to any caller',
                'Decisions made on contaminated data',
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="text-danger mt-0.5">✗</span>
                  {x}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glow bg-bg-card rounded-xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success to-border-glow" />
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 size={18} className="text-success" />
              <span className="text-xs font-mono text-success uppercase tracking-wider">
                With Agentronics
              </span>
            </div>
            <h4 className="text-lg font-bold text-text-primary mb-4">Your agent governance plane</h4>
            <ul className="space-y-2 text-sm text-text-primary/80">
              {[
                'Clean human / agent split',
                'Per-agent metrics and trust scores',
                'Policy enforced at the gateway',
                'Every action logged for compliance',
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="text-success mt-0.5">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <button
            onClick={openWaitlist}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg-primary font-semibold hover:opacity-90 transition-all cursor-pointer"
          >
            Get a free agent-traffic audit
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
