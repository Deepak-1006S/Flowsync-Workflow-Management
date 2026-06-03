/**
 * Performance Utilities
 * Tools for performance monitoring and optimization
 */

/**
 * Debounce function - limit function calls
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function - limit function calls with minimum interval
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Memoize function - cache function results
 */
export const memoize = (func) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Measure function execution time
 */
export const measurePerformance = (label, func) => {
  const start = performance.now();
  const result = func();
  const end = performance.now();
  console.log(`${label} took ${(end - start).toFixed(2)}ms`);
  return result;
};

export default {
  debounce,
  throttle,
  memoize,
  measurePerformance,
};
