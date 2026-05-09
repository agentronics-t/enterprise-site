import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Line = { command: string; result: string }

const lines: Line[] = [
  { command: '> agent.detect()', result: '✓ ChatGPT Agent (Web Bot Auth)' },
  { command: '> agent.classify()', result: '✓ intent: price comparison' },
  { command: '> agent.govern()', result: '✓ read-only scope, audit logged' },
  { command: '> agent.measure()', result: "✓ attributed to @sarah's assistant" },
]

export default function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [typingIndex, setTypingIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [completedLines, setCompletedLines] = useState<Line[]>([])

  useEffect(() => {
    if (visibleLines >= lines.length) return

    const line = lines[visibleLines]
    if (!line) return
    const fullText = line.command

    if (typingIndex < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, typingIndex + 1))
        setTypingIndex(typingIndex + 1)
      }, 30 + Math.random() * 40)
      return () => clearTimeout(timer)
    }

    if (!showResult) {
      const timer = setTimeout(() => setShowResult(true), 300)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setCompletedLines(prev => [...prev, { command: fullText, result: line.result }])
      setVisibleLines(visibleLines + 1)
      setTypingIndex(0)
      setCurrentText('')
      setShowResult(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [visibleLines, typingIndex, showResult])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="bg-bg-code rounded-xl border border-border-glow-30 overflow-hidden shadow-2xl shadow-border-glow/10">
        <div className="flex items-center gap-2 px-4 py-3 bg-bg-card border-b border-border">
          <div className="w-3 h-3 rounded-full bg-danger/80" />
          <div className="w-3 h-3 rounded-full bg-accent/80" />
          <div className="w-3 h-3 rounded-full bg-success/80" />
          <span className="ml-3 text-xs text-text-secondary font-mono">agentronics-gateway</span>
        </div>

        <div className="p-5 font-mono text-sm leading-relaxed min-h-[180px]">
          {completedLines.map((line, i) => (
            <div key={i} className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-text-secondary">{line.command}</span>
              <span className="text-success ml-auto">{line.result}</span>
            </div>
          ))}
          {visibleLines < lines.length && (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-text-secondary">
                {currentText}
                <span className="cursor-blink text-accent">▌</span>
              </span>
              {showResult && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-success ml-auto"
                >
                  {lines[visibleLines]?.result}
                </motion.span>
              )}
            </div>
          )}
          {visibleLines >= lines.length && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-accent">
                {'>'} <span className="cursor-blink">▌</span>
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-border-glow/20 blur-3xl rounded-full" />
    </motion.div>
  )
}
