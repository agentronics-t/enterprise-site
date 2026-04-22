import { createContext, useContext, useState } from 'react'
import WaitlistModal from './WaitlistModal'

const WaitlistContext = createContext()

export function useWaitlist() {
  return useContext(WaitlistContext)
}

export function WaitlistProvider({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <WaitlistContext.Provider value={{ openWaitlist: () => setOpen(true) }}>
      {children}
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </WaitlistContext.Provider>
  )
}
