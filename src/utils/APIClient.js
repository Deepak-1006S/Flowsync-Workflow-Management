/**
 * API Interceptor - Centralized request/response handling
 * Handles authentication, error handling, and retry logic
 */

import { getLogger } from './Logger';

const logger = getLogger('APIInterceptor');

class APIClient {
  constructor(baseURL = process.env.REACT_APP_API_URL) {
    this.baseURL = baseURL;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  /**
   * Add request interceptor
   */
  useRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Add response interceptor
   */
  useResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Perform HTTP request with interceptors
   */
  async request(method, endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    let config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      config = await interceptor(config);
    }

    logger.info(`${method} ${endpoint}`);

    try {
      let response = await fetch(url, config);

      // Apply response interceptors
      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      logger.info(`Success: ${method} ${endpoint}`, { status: response.status });
      return data;
    } catch (error) {
      logger.error(`Failed: ${method} ${endpoint}`, error);
      throw this.handleError(error);
    }
  }

  /**
   * GET request
   */
  get(endpoint, options = {}) {
    return this.request('GET', endpoint, options);
  }

  /**
   * POST request
   */
  post(endpoint, body, options = {}) {
    return this.request('POST', endpoint, {
      ...options,
      body: JSON.stringify(body),
    });
  }

  /**
   * PUT request
   */
  put(endpoint, body, options = {}) {
    return this.request('PUT', endpoint, {
      ...options,
      body: JSON.stringify(body),
    });
  }

  /**
   * DELETE request
   */
  delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, options);
  }

  /**
   * PATCH request
   */
  patch(endpoint, body, options = {}) {
    return this.request('PATCH', endpoint, {
      ...options,
      body: JSON.stringify(body),
    });
  }

  /**
   * Handle API errors
   */
  handleError(error) {
    const apiError = {
      message: error.message,
      timestamp: new Date().toISOString(),
      details: null,
    };

    if (error instanceof TypeError) {
      apiError.message = 'Network error - please check your connection';
      apiError.code = 'NETWORK_ERROR';
    } else if (error.message.includes('HTTP')) {
      const match = error.message.match(/HTTP (\d+)/);
      if (match) {
        apiError.statusCode = parseInt(match[1], 10);
        apiError.code = `HTTP_${apiError.statusCode}`;
      }
    }

    return apiError;
  }
}

// Create singleton instance
const apiClient = new APIClient();

// Add auth interceptor
apiClient.useRequestInterceptor(async (config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add error handling interceptor
apiClient.useResponseInterceptor(async (response) => {
  if (response.status === 401) {
    // Handle unauthorized - clear auth and redirect
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  }
  return response;
});

export default apiClient;
