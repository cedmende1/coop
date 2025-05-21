import React, { Component } from 'react';
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }
  render(): ReactNode {
    if (this.state.hasError) {
      return <div className="min-h-screen bg-[rgb(var(--bg-page))] flex items-center justify-center p-4">
          <div className="bg-[rgb(var(--bg-card))] rounded-lg shadow-xl p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-neon-red">
              Something went wrong
            </h2>
            <p className="mb-6 text-[rgb(var(--text-secondary))]">
              The application encountered an unexpected error. Please try
              refreshing the page.
            </p>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-neon-red text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              Refresh Page
            </button>
          </div>
        </div>;
    }
    return this.props.children;
  }
}