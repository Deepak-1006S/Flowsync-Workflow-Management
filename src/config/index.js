/**
 * Configuration Management
 * Centralized environment and app configuration
 */

const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // App Configuration
  app: {
    name: 'FlowSync',
    version: '1.0.0',
    environment: process.env.REACT_APP_ENV || 'development',
    isDevelopment: process.env.REACT_APP_ENV === 'development',
    isProduction: process.env.REACT_APP_ENV === 'production',
  },

  // Feature Flags
  features: {
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    notifications: process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true',
    devTools: process.env.REACT_APP_ENV === 'development',
  },

  // Pagination
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },

  // Cache Configuration
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 minutes
  },

  // Retry Configuration
  retry: {
    enabled: true,
    maxAttempts: 3,
    backoffMultiplier: 2,
  },

  // Validation Rules
  validation: {
    minPasswordLength: 8,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
};

/**
 * Get configuration value with fallback
 */
export const getConfig = (path, defaultValue = null) => {
  const keys = path.split('.');
  let value = config;

  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      return defaultValue;
    }
  }

  return value;
};

export default config;
