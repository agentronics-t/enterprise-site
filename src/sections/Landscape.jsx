import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const categories = ['Auth', 'Authz', 'Memory', 'Observability', 'Context']
const players = [
  {
    name: 'Auth0 / Clerk',
    type: 'incumbent',
    coverage: [true, true, false, false, false],
  },
  {
    name: 'Datadog / Sentry',
    type: 'incumbent',
    coverage: [false, false, false, true, false],
  },
  {
    name: 'Mem0 / LangGraph',
    type: 'new',
    coverage: [false, false, true, false, false],
  },
  {
    name: 'Custom Code',
    type: 'diy',
    coverage: [true, true, true, true, true],
    note: '6+ months',
  },
  {
    name: 'Agentronics',
    type: 'agentronics',
    coverage: [true, true, true, true, true],
  },
]

export default function Landscape() {
  return (
    <section id="landscape" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          prefix="LANDSCAPE"
          title="They solve pieces. We govern the pipe."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-text-secondary font-mono text-xs uppercase tracking-wider">
                  Solution
                </th>
                {categories.map((cat) => (
                  <th key={cat} className="py-4 px-4 text-center text-text-secondary font-mono text-xs uppercase tracking-wider">
                    {cat}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {players.map((player, idx) => (
                <motion.tr
                  key={player.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`border-b border-white/5 ${
                    player.type === 'agentronics'
                      ? 'bg-border-glow/5'
                      : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${
                        player.type === 'agentronics'
                          ? 'text-accent'
                          : 'text-text-primary'
                      }`}>
                        {player.name}
                      </span>
                      {player.note && (
                        <span className="text-xs text-danger font-mono">({player.note})</span>
                      )}
                    </div>
                  </td>
                  {player.coverage.map((has, i) => (
                    <td key={i} className="py-4 px-4 text-center">
                      {has ? (
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          player.type === 'agentronics'
                            ? 'bg-accent/20 text-accent'
                            : player.type === 'diy'
                              ? 'bg-danger/20 text-danger'
                              : 'bg-success/20 text-success'
                        }`}>
                          <Check size={14} />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-text-secondary/30">
                          <Minus size={14} />
                        </span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
