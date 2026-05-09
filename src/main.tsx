import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ThemeProvider } from './components/ui/ThemeProvider'

;(function applyInitialTheme() {
  try {
    const stored = localStorage.getItem('agentronics:theme')
    const mode = stored || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    document.documentElement.classList.toggle('light', mode === 'light')
  } catch {}
})()

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element #root not found')

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
