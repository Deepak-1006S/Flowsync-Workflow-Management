/**
 * Logger Utility - Professional logging system
 * Provides different log levels and environment-based filtering
 */
class Logger {
  constructor(module = '') {
    this.module = module;
    this.isDevelopment = process.env.REACT_APP_ENV === 'development';
  }

  /**
   * Format log message with timestamp and module
   */
  formatMessage(level, message, data) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}] ${this.module ? `[${this.module}]` : ''}`;
    return { prefix, message, data };
  }

  /**
   * Log info level messages
   */
  info(message, data = {}) {
    if (this.isDevelopment) {
      const { prefix } = this.formatMessage('INFO', message, data);
      // eslint-disable-next-line no-console
      console.log(`${prefix} ${message}`, data);
    }
  }

  /**
   * Log warning level messages
   */
  warn(message, data = {}) {
    const { prefix } = this.formatMessage('WARN', message, data);
    // eslint-disable-next-line no-console
    console.warn(`${prefix} ${message}`, data);
  }

  /**
   * Log error level messages
   */
  error(message, error = null) {
    const { prefix } = this.formatMessage('ERROR', message, error);
    // eslint-disable-next-line no-console
    console.error(`${prefix} ${message}`, error);

    // In production, send to error tracking service
    if (!this.isDevelopment && error) {
      this.sendToErrorTracking(message, error);
    }
  }

  /**
   * Log debug messages (development only)
   */
  debug(message, data = {}) {
    if (this.isDevelopment) {
      const { prefix } = this.formatMessage('DEBUG', message, data);
      // eslint-disable-next-line no-console
      console.debug(`${prefix} ${message}`, data);
    }
  }

  /**
   * Send error to external tracking service
   */
  // eslint-disable-next-line no-unused-vars
  sendToErrorTracking(_message, _error) {
    // TODO: Integrate with Sentry, Rollbar, or similar
    // Example: Sentry.captureException(error);
  }
}

/**
 * Get or create logger instance
 */
export const getLogger = (module) => new Logger(module);

export default Logger;
