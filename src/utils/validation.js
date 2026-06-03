/**
 * Validation Utilities
 * Input validation and sanitization functions
 */

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate workflow name
 */
export const isValidWorkflowName = (name) => {
  return name && name.trim().length > 0 && name.trim().length <= 255;
};

/**
 * Validate task title
 */
export const isValidTaskTitle = (title) => {
  return title && title.trim().length > 0 && title.trim().length <= 200;
};

/**
 * Validate date
 */
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

/**
 * Sanitize HTML input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Validate URL
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Validate required fields
 */
export const validateRequired = (fields) => {
  const errors = {};
  Object.entries(fields).forEach(([key, value]) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      errors[key] = `${key} is required`;
    }
  });
  return errors;
};

export default {
  isValidEmail,
  isValidWorkflowName,
  isValidTaskTitle,
  isValidDate,
  sanitizeInput,
  isValidURL,
  validateRequired,
};
