/**
 * Constants - Centralized constants and enumerations
 */

export const WORKFLOW_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
};

export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const STEP_TYPES = {
  TASK: 'task',
  APPROVAL: 'approval',
  CONDITION: 'condition',
  ACTION: 'action',
};

export const TRIGGER_TYPES = {
  MANUAL: 'manual',
  SCHEDULED: 'scheduled',
  EVENT: 'event',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error - please check your connection',
  INVALID_INPUT: 'Invalid input provided',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  SERVER_ERROR: 'An unexpected server error occurred',
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Created successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  PUBLISHED: 'Published successfully',
};

export default {
  WORKFLOW_STATUS,
  TASK_STATUS,
  TASK_PRIORITY,
  APPROVAL_STATUS,
  STEP_TYPES,
  TRIGGER_TYPES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
