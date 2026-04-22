import { motion } from 'framer-motion'
import { Lock, Shield, Brain, Eye, Minimize2 } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const problems = [
  {
    icon: Lock,
    title: 'No Authentication',
    description: 'Any agent can call any tool on any site. No identity verification, no trust layer.',
    label: 'Security Risk',
  },
  {
    icon: Shield,
    title: 'No Authorization',
    description: 'There\'s no way to scope what an agent can do. Read-only or admin — it\'s all the same.',
    label: 'Compliance Blocker',
  },
  {
    icon: Brain,
    title: 'No Memory',
    description: 'Agents forget everything between pages. No sessions, no preferences, no continuity.',
    label: 'Broken Experience',
  },
  {
    icon: Eye,
    title: 'No Observability',
    description: 'Zero visibility into what agents are doing on your site. No logs, no traces, no alerts.',
    label: 'Ops Blindspot',
  },
  {
    icon: Minimize2,
    title: 'Context Bloat',
    description: '50+ tools sent per call. Most are irrelevant. Token costs explode, quality collapses.',
    label: 'Cost × Quality',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function Problems() {
  return (
    <section id="problems" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          prefix="THE PROBLEM"
          title="WebMCP is shipping. The operational chaos is already beginning."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {problems.map((problem, i) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={problem.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={cardVariants}
                className="card-glow bg-bg-card rounded-xl p-6 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-border-glow/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-border-glow" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  {problem.description}
                </p>
                <span className="mt-4 inline-block text-xs font-mono font-semibold text-accent tracking-wide">
                  {problem.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
