import { motion } from 'framer-motion'
import { EyeOff, ShieldOff, Store } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const problems = [
  {
    icon: EyeOff,
    title: 'Blind Measurement',
    description:
      'Agent visits look like human visits. Your conversion rates, bounce rates, ad attribution — all contaminated with non-human traffic. You\'re making business decisions on numbers that are lying to you.',
    label: 'Contaminated Data',
  },
  {
    icon: ShieldOff,
    title: 'Zero Governance',
    description:
      'No identity layer, no permission model, no audit trail. Any agent can invoke any action on your site, at any rate, anonymously. An agent shopping for socks could trigger your admin tools.',
    label: 'Compliance Blocker',
  },
  {
    icon: Store,
    title: 'No Agent Commerce Strategy',
    description:
      'Agents are the new buyers. But your site is built to sell to humans — product pages, ad impressions, personalization. None of that works when the "customer" is an LLM. You need a new interface.',
    label: 'Revenue Leak',
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
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          prefix="THE PROBLEM"
          title="30% of your site traffic might not be human. You can't see it."
          subtitle="Your analytics are lying. Your admin tools are exposed. And the next wave of buyers doesn't look like your current ones."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="card-glow bg-bg-card rounded-xl p-8 flex flex-col"
              >
                <div className="w-11 h-11 rounded-lg bg-border-glow/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-border-glow" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  {problem.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  {problem.description}
                </p>
                <span className="mt-5 inline-block text-xs font-mono font-semibold text-accent tracking-wide">
                  {problem.label}
                </span>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center text-base md:text-lg text-text-secondary max-w-3xl mx-auto"
        >
          Detection tools tell you <span className="text-text-primary font-semibold">who</span> showed up.
          They don't tell you <span className="text-accent font-semibold">what to do about it</span>.
        </motion.p>
      </div>
    </section>
  )
}
