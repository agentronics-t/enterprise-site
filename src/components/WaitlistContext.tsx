import { createContext, useContext, useState, type ReactNode } from 'react'
import WaitlistModal from './WaitlistModal'

type Ctx = { openWaitlist: () => void }

const WaitlistContext = createContext<Ctx | null>(null)

export function useWaitlist(): Ctx {
  const ctx = useContext(WaitlistContext)
  if (!ctx) throw new Error('useWaitlist must be used within WaitlistProvider')
  return ctx
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <WaitlistContext.Provider value={{ openWaitlist: () => setOpen(true) }}>
      {children}
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </WaitlistContext.Provider>
  )
}
