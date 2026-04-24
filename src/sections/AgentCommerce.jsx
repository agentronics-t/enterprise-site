import { motion } from 'framer-motion'
import { BookOpen, Gauge, Gavel, MessageSquare } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const cards = [
  {
    icon: BookOpen,
    title: 'Agent-Facing Catalogs',
    desc: 'Structured, queryable product feeds that agents can reason over — not HTML pages designed for human eyes.',
  },
  {
    icon: Gauge,
    title: 'Agent Trust Scoring',
    desc: 'Which agents convert, which are price-sensitive, which are researching vs. buying. Real-time signal for your merchandising.',
  },
  {
    icon: Gavel,
    title: 'Agent-Side Bidding',
    desc: "When Sarah's agent searches 'noise-cancelling headphones under $300' — how does your brand compete for that slot?",
  },
  {
    icon: MessageSquare,
    title: 'Agent Negotiation',
    desc: 'Returns policy, discount eligibility, loyalty programs — all exposed as tools the agent can query in real time.',
  },
]

export default function AgentCommerce() {
  return (
    <section id="future" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          prefix="THE FUTURE"
          title="Measurement gets you in the door. Selling to agents is the real game."
          subtitle="Today's commerce stack assumes human visitors. When agents become the dominant buyer, product discovery, personalization, pricing and advertising all change. Agentronics is building the commerce layer for agent-mediated transactions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card-glow bg-bg-card rounded-xl p-7 flex gap-5 items-start"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-text-primary">{card.title}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border-glow/30 text-border-glow">
                      2027
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
