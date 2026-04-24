import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { useWaitlist } from '../components/WaitlistContext'

const plans = [
  {
    name: 'Free',
    tagline: 'For indie devs & WebMCP experimenters',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '1,000 governed agent interactions/mo',
      'Basic identity detection',
      'Community support',
      'Single site',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    tagline: 'For teams taking agent traffic seriously',
    monthlyPrice: 149,
    yearlyPrice: 119,
    features: [
      '50K governed interactions/mo',
      'Full three-path detection (WebMCP · Web Bot Auth · Stealth)',
      'Policy engine & rate limits',
      'Observability dashboard',
      'Agent analytics — clean your data',
      'Email support',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    tagline: 'For teams at scale',
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      'Unlimited interactions',
      'SSO / SAML',
      'Audit trail exports · compliance-ready',
      'Custom SLA',
      'Dedicated onboarding',
      'Agent commerce features (early access)',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing() {
  const { openWaitlist } = useWaitlist()
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          prefix="PRICING"
          title="Start free. Govern at scale."
        />

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span className={`text-sm ${!yearly ? 'text-text-primary' : 'text-text-secondary'}`}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              yearly ? 'bg-accent' : 'bg-white/20'
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              yearly ? 'translate-x-6' : ''
            }`} />
          </button>
          <span className={`text-sm ${yearly ? 'text-text-primary' : 'text-text-secondary'}`}>
            Yearly
            <span className="ml-1.5 text-xs text-accent font-mono">20% off</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-xl p-8 flex flex-col ${
                plan.popular
                  ? 'bg-bg-card border-2 border-border-glow/50 shadow-lg shadow-border-glow/10'
                  : 'bg-bg-card border border-white/10'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-border-glow text-white text-xs font-bold rounded-full">
                  Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
              <p className="text-sm text-text-secondary mt-1 mb-6">{plan.tagline}</p>

              <div className="mb-6">
                {plan.monthlyPrice !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-text-primary">
                      ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-text-secondary text-sm">/mo</span>
                  </div>
                ) : (
                  <span className="text-4xl font-extrabold text-text-primary">Custom</span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check size={16} className={plan.popular ? 'text-border-glow mt-0.5' : 'text-accent mt-0.5'} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={openWaitlist}
                className={`group flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-accent to-accent-hover text-bg-primary hover:opacity-90'
                    : 'border border-white/15 text-text-primary hover:border-white/30 hover:bg-white/5'
                }`}
              >
                {plan.cta}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
