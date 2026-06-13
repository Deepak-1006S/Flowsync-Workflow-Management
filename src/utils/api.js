const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const contentType = response.headers.get('Content-Type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const errorMessage = data?.message || data?.error || `HTTP ${response.status} ${response.statusText}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return data;
};

// Workflow APIs
export const workflowAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching workflows:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching workflow:', error);
      throw error;
    }
  },

  create: async (workflowData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflowData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating workflow:', error);
      throw error;
    }
  },

  update: async (id, workflowData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflowData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error updating workflow:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error deleting workflow:', error);
      throw error;
    }
  },

  publish: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/${id}/publish`, {
        method: 'POST',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error publishing workflow:', error);
      throw error;
    }
  },

  getTemplates: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/templates`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  },
};

// Task APIs
export const taskAPI = {
  getAll: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_BASE_URL}/tasks?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  create: async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  update: async (id, taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  complete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
        method: 'POST',
      });
      return await response.json();
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  assign: async (id, assigneeId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assigneeId }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error assigning task:', error);
      throw error;
    }
  },
};

// Approval APIs
export const approvalAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/approvals`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching approvals:', error);
      throw error;
    }
  },

  getPending: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/approvals?status=pending`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
      throw error;
    }
  },

  create: async (approvalData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/approvals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(approvalData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating approval:', error);
      throw error;
    }
  },

  approve: async (id, approverData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/approvals/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(approverData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error approving:', error);
      throw error;
    }
  },

  reject: async (id, rejectionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/approvals/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rejectionData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error rejecting:', error);
      throw error;
    }
  },
};

// Automation APIs
export const automationAPI = {
  getRules: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/rules`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching rules:', error);
      throw error;
    }
  },

  createRule: async (ruleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruleData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating rule:', error);
      throw error;
    }
  },

  updateRule: async (id, ruleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/rules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruleData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating rule:', error);
      throw error;
    }
  },

  deleteRule: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/rules/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting rule:', error);
      throw error;
    }
  },

  toggleRule: async (id, enabled) => {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/rules/${id}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error toggling rule:', error);
      throw error;
    }
  },

  getTriggers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/triggers`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching triggers:', error);
      throw error;
    }
  },

  getActions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/actions`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching actions:', error);
      throw error;
    }
  },

  getExecutionLogs: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/logs`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw error;
    }
  },
};
