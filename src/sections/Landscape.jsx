import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const rows = [
  {
    category: 'Bot Detection',
    detection: ['HUMAN Security', 'Cloudflare', 'Fingerprint', 'CHEQ', 'Akamai'],
    governance: '—',
  },
  {
    category: 'Auth Layer',
    detection: ['Castle.io', 'Nango'],
    governance: 'Agentronics — policy, scoping, rate limits',
  },
  {
    category: 'Observability',
    detection: ['Snowplow', 'LangSmith', 'Braintrust'],
    governance: 'Agentronics — agent-specific audit trails',
  },
  {
    category: 'Memory / Context',
    detection: ['Mem0', 'Letta'],
    governance: 'Agentronics — cross-session, cross-page',
  },
  {
    category: 'Agent Commerce',
    detection: ['—'],
    governance: 'Agentronics — catalogs, trust scores, bidding',
  },
]

export default function Landscape() {
  return (
    <section id="landscape" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          prefix="LANDSCAPE"
          title="They detect. We govern."
          subtitle="Detection tells you who showed up. Governance tells you what to do about it."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-xl border border-white/10"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-card border-b border-white/10">
                <th className="text-left py-5 px-5 text-text-secondary font-mono text-xs uppercase tracking-wider w-1/5">
                  Category
                </th>
                <th className="text-left py-5 px-5 text-text-secondary font-mono text-xs uppercase tracking-wider w-2/5">
                  Detection · <span className="text-text-primary">WHO</span>
                </th>
                <th className="text-left py-5 px-5 text-accent font-mono text-xs uppercase tracking-wider w-2/5">
                  Governance · <span className="text-accent">WHAT TO DO</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.category}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="border-b border-white/5 last:border-b-0 bg-bg-card/40"
                >
                  <td className="py-5 px-5 align-top">
                    <span className="font-semibold text-text-primary">{row.category}</span>
                  </td>
                  <td className="py-5 px-5 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {row.detection.map((d) => (
                        <span
                          key={d}
                          className={`text-xs font-mono px-2 py-1 rounded ${
                            d === '—'
                              ? 'text-text-secondary/40'
                              : 'bg-white/5 border border-white/10 text-text-secondary'
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-5 px-5 align-top">
                    <span
                      className={`text-xs font-mono ${
                        row.governance === '—'
                          ? 'text-text-secondary/40'
                          : 'inline-block px-2 py-1 rounded bg-accent/10 border border-accent/30 text-accent'
                      }`}
                    >
                      {row.governance}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="mt-10 text-center text-text-secondary">
          They solve pieces. <span className="text-text-primary font-semibold">We govern the pipe.</span>
        </p>
      </div>
    </section>
  )
}
