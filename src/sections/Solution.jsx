import { motion } from 'framer-motion'
import { KeyRound, Shield, Brain, Eye, BarChart3 } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const lanes = [
  {
    title: 'WebMCP Agent',
    provider: 'Gemini, native',
    signal: 'Tool call via modelContext',
    color: 'var(--color-border-glow)',
  },
  {
    title: 'Web Bot Auth',
    provider: 'ChatGPT, AWS AgentCore',
    signal: 'Signed HTTP · Ed25519',
    color: 'var(--color-success)',
  },
  {
    title: 'Stealth Agent',
    provider: 'Comet, Operator, Atlas',
    signal: 'Behavioral fingerprint',
    color: 'var(--color-accent)',
  },
]

const pills = [
  { icon: KeyRound, title: 'Agent Identity', desc: 'Know which agent, on whose behalf, from which provider' },
  { icon: Shield, title: 'Policy Engine', desc: 'Scope permissions per agent class, rate limit, restrict tools' },
  { icon: Brain, title: 'Cross-Session Memory', desc: 'Agents maintain context across page navigation' },
  { icon: Eye, title: 'Audit & Observability', desc: 'Full trace of every action, exportable, compliance-ready' },
  { icon: BarChart3, title: 'Agent Analytics', desc: 'Separate agent metrics from human metrics — clean your data' },
]

export default function Solution() {
  return (
    <section id="solution" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          prefix="THE SOLUTION"
          title="One SDK. Three agent classes. Full governance."
          subtitle='"They detect. We govern." Detection tools tell you who. Agentronics tells you what to do.'
        />

        {/* Three-lane architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 bg-bg-card rounded-xl border border-border-glow-30 p-6 md:p-10"
        >
          {/* Lanes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {lanes.map((lane, i) => (
              <motion.div
                key={lane.title}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative rounded-lg bg-code-bg border border-white/10 p-5 text-center"
              >
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full"
                  style={{ background: lane.color, opacity: 0.6 }}
                />
                <span className="text-xs font-mono text-text-secondary block mb-1">
                  {lane.provider}
                </span>
                <h4 className="text-base font-bold text-text-primary mb-2">{lane.title}</h4>
                <span className="text-[11px] font-mono text-text-secondary/70 block">
                  {lane.signal}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Convergence lines (SVG) */}
          <div className="relative h-16 md:h-20 hidden md:block">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 80">
              <motion.path
                d="M 50 0 L 150 80"
                stroke="var(--color-border-glow)"
                strokeWidth="1"
                strokeDasharray="4 4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.path
                d="M 150 0 L 150 80"
                stroke="var(--color-success)"
                strokeWidth="1"
                strokeDasharray="4 4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45 }}
              />
              <motion.path
                d="M 250 0 L 150 80"
                stroke="var(--color-accent)"
                strokeWidth="1"
                strokeDasharray="4 4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </svg>
          </div>
          <div className="md:hidden flex justify-center py-3 text-text-secondary/40">↓</div>

          {/* Gateway */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative mx-auto max-w-md px-6 py-5 rounded-xl border-2 border-border-glow/50 bg-gradient-to-b from-border-glow/10 to-transparent"
          >
            <span className="text-xs font-mono text-accent block mb-1 text-center">
              ///AGENTRONICS GATEWAY
            </span>
            <span className="text-xl font-bold text-text-primary block text-center mb-3">
              Identity · Policy · Memory · Audit · Intent
            </span>
            <div className="absolute -inset-1 bg-border-glow/10 rounded-xl blur-xl -z-10" />
          </motion.div>

          <div className="flex justify-center py-3 text-text-secondary/40">↓</div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mx-auto max-w-md px-6 py-4 bg-code-bg rounded-lg border border-white/10 text-center"
          >
            <span className="text-xs font-mono text-text-secondary block mb-1">Your site / app</span>
            <span className="text-base font-bold text-text-primary">Governed · Measured</span>
          </motion.div>
        </motion.div>

        {/* Code snippet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-14"
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
                <span className="text-text-secondary/50">
                  {'// Every agent — WebMCP, signed, or stealth — is now governed.'}
                </span>
              </code>
            </pre>
          </div>
        </motion.div>

        {/* Capability pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pills.map((pill, i) => {
            const Icon = pill.icon
            return (
              <motion.div
                key={pill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-glow bg-bg-card rounded-xl p-5"
              >
                <Icon size={18} className="text-accent mb-3" />
                <h4 className="text-sm font-bold text-text-primary mb-2">{pill.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{pill.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
