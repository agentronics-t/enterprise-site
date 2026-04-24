import { motion } from 'framer-motion'
import { Package, Activity, SlidersHorizontal } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const steps = [
  {
    num: '01',
    icon: Package,
    title: 'Drop in the SDK',
    description:
      'One npm install, one init call. The SDK intercepts all three agent arrival paths — WebMCP tool calls, Web Bot Auth signatures, and behavioral signals — transparently.',
  },
  {
    num: '02',
    icon: Activity,
    title: 'See your real traffic',
    description:
      'Your dashboard lights up immediately. Agent vs. human traffic split. Which agents (ChatGPT, Gemini, Claude). What they\'re doing. Who sent them. In real time.',
  },
  {
    num: '03',
    icon: SlidersHorizontal,
    title: 'Set the rules',
    description:
      'Apply policy per agent class: read-only for price scrapers, full access for verified purchase agents, block for unauthorized bots. Every action logged for compliance.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          prefix="HOW IT WORKS"
          title="From install to governed in one afternoon."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="card-glow bg-bg-card rounded-xl p-8 relative overflow-hidden"
              >
                <span className="absolute top-4 right-6 text-6xl font-extrabold text-white/[0.03] select-none">
                  {step.num}
                </span>

                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                  <Icon size={24} className="text-accent" />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-accent font-bold">{step.num}</span>
                  <h3 className="text-xl font-bold text-text-primary">{step.title}</h3>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
