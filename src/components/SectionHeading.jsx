import { motion } from 'framer-motion'

export default function SectionHeading({ prefix, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="mb-16 text-center"
    >
      <p className="font-mono text-sm tracking-widest text-accent mb-4">
        ///{prefix}
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight max-w-4xl mx-auto">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
