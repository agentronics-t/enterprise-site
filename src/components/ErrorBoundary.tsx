import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode; fallback?: ReactNode }
type State = { hasError: boolean; error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  override render(): ReactNode {
    if (!this.state.hasError) return this.props.children
    if (this.props.fallback) return this.props.fallback
    return (
      <div
        role="alert"
        className="min-h-screen flex items-center justify-center px-6 bg-bg text-text-primary"
      >
        <div className="max-w-lg w-full text-center space-y-5">
          <p className="text-xs uppercase tracking-widest text-text-secondary">Error</p>
          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="text-text-secondary">
            We hit an unexpected error rendering this page.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-accent-hover text-bg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-full border border-border-strong text-text-primary hover:bg-bg-card-hover transition-colors cursor-pointer"
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    )
  }
}
