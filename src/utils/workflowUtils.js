// Workflow utilities
export const generateWorkflowId = () => `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const createWorkflowStep = (type, title, config = {}) => {
  return {
    id: `step_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type, // 'task', 'approval', 'condition', 'action'
    title,
    description: '',
    config,
    nextSteps: [],
    createdAt: new Date().toISOString(),
  };
};

export const validateWorkflow = (workflow) => {
  const errors = [];

  if (!workflow.name || workflow.name.trim() === '') {
    errors.push('Workflow name is required');
  }

  if (!workflow.steps || workflow.steps.length === 0) {
    errors.push('Workflow must have at least one step');
  }

  if (!workflow.trigger) {
    errors.push('Workflow trigger is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const getWorkflowStatus = (workflow) => {
  if (workflow.published && !workflow.archived) return 'active';
  if (workflow.archived) return 'archived';
  return 'draft';
};

// Task utilities
export const generateTaskId = () => `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const createTask = (title, description, assignee, dueDate, workflowId) => {
  return {
    id: generateTaskId(),
    title,
    description,
    status: 'pending', // pending, in-progress, completed
    assignee,
    dueDate,
    workflowId,
    priority: 'medium', // low, medium, high
    tags: [],
    attachments: [],
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const isTaskOverdue = (task) => {
  if (task.status === 'completed') return false;
  if (!task.dueDate) return false;
  return new Date(task.dueDate) < new Date();
};

export const getTaskStatusColor = (status) => {
  const colors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getPriorityColor = (priority) => {
  const colors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };
  return colors[priority] || 'bg-gray-100 text-gray-800';
};

// Approval utilities
export const generateApprovalId = () => `appr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const createApproval = (title, description, approverId, itemId, itemType) => {
  return {
    id: generateApprovalId(),
    title,
    description,
    status: 'pending', // pending, approved, rejected
    approverId,
    itemId,
    itemType, // 'task', 'workflow', 'document'
    requestedBy: '',
    requestedAt: new Date().toISOString(),
    approvedAt: null,
    rejectedAt: null,
    reason: '',
    comments: [],
  };
};

export const getApprovalStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Automation utilities
export const generateRuleId = () => `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const createAutomationRule = (name, trigger, actions, conditions = []) => {
  return {
    id: generateRuleId(),
    name,
    description: '',
    enabled: true,
    trigger, // event that triggers the rule
    conditions, // array of conditions that must be met
    actions, // array of actions to perform
    executedCount: 0,
    lastExecutedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const executionLogEntry = (ruleId, status, details) => {
  return {
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ruleId,
    status, // success, failed, skipped
    details,
    executedAt: new Date().toISOString(),
  };
};

// Date utilities
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(dateString);
};
