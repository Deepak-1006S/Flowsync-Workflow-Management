/**
 * Error Boundary Component
 * Catches React component errors and displays fallback UI
 */

import React from 'react';
import { getLogger } from '../../utils/Logger';

const logger = getLogger('ErrorBoundary');

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('React Error Boundary caught error', { error, errorInfo });
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-red-200 rounded-lg shadow-lg p-8 max-w-md">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Something went wrong</h1>
              <p className="text-gray-600 mb-4">
                We encountered an unexpected error. Please try refreshing the page.
              </p>

              {process.env.REACT_APP_ENV === 'development' && this.state.error && (
                <details className="text-left bg-gray-100 p-3 rounded mt-4 text-sm">
                  <summary className="cursor-pointer font-semibold text-gray-700">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-red-700">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Refresh Page
                </button>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
