// Automation Engine - Executes automation rules based on triggers
class AutomationEngine {
  constructor() {
    this.rules = [];
    this.triggers = new Map();
    this.executionLogs = [];
  }

  /**
   * Register an automation rule
   */
  registerRule(rule) {
    if (!rule.enabled) return;
    this.rules.push(rule);
  }

  /**
   * Unregister a rule
   */
  unregisterRule(ruleId) {
    const index = this.rules.findIndex(r => r.id === ruleId);
    if (index !== -1) {
      this.rules.splice(index, 1);
    }
  }

  /**
   * Register a trigger handler
   */
  registerTrigger(triggerType, handler) {
    this.triggers.set(triggerType, handler);
  }

  /**
   * Fire a trigger and execute matching rules
   */
  async fireTrigger(triggerType, data) {
    const matchingRules = this.rules.filter(r => r.trigger === triggerType && r.enabled);

    const results = [];
    for (const rule of matchingRules) {
      try {
        const result = await this.executeRule(rule, data);
        results.push(result);
      } catch (error) {
        this.logExecution(rule.id, 'failed', error.message);
      }
    }

    return results;
  }

  /**
   * Execute a single rule
   */
  async executeRule(rule, data) {
    const execution = {
      ruleId: rule.id,
      ruleName: rule.name,
      triggeredAt: new Date(),
      status: 'running',
      conditions: [],
      actions: [],
    };

    try {
      // Evaluate all conditions
      let allConditionsMet = true;
      for (const condition of rule.conditions || []) {
        const conditionMet = this.evaluateCondition(condition, data);
        execution.conditions.push({
          condition,
          result: conditionMet,
        });
        if (!conditionMet) {
          allConditionsMet = false;
        }
      }

      // Execute actions if all conditions met
      if (allConditionsMet) {
        for (const action of rule.actions || []) {
          const actionResult = await this.executeAction(action, data);
          execution.actions.push({
            action,
            result: actionResult,
          });
        }
        execution.status = 'success';
      } else {
        execution.status = 'skipped';
      }
    } catch (error) {
      execution.status = 'failed';
      execution.error = error.message;
    }

    execution.completedAt = new Date();
    this.logExecution(rule.id, execution.status, JSON.stringify(execution));

    return execution;
  }

  /**
   * Evaluate a condition
   */
  evaluateCondition(condition, data) {
    try {
      // Simple condition evaluation
      const { field, operator, value } = condition;
      const fieldValue = this.getNestedValue(data, field);

      switch (operator) {
        case 'equals':
          return fieldValue === value;
        case 'not_equals':
          return fieldValue !== value;
        case 'greater_than':
          return fieldValue > value;
        case 'less_than':
          return fieldValue < value;
        case 'contains':
          return String(fieldValue).includes(value);
        case 'in':
          return Array.isArray(value) && value.includes(fieldValue);
        default:
          return false;
      }
    } catch (error) {
      console.error('Condition evaluation error:', error);
      return false;
    }
  }

  /**
   * Execute an action
   */
  async executeAction(action, data) {
    try {
      const { type, config } = action;

      switch (type) {
        case 'send_notification':
          return this.sendNotification(config);
        case 'create_task':
          return this.createTask(config, data);
        case 'send_email':
          return this.sendEmail(config, data);
        case 'update_field':
          return this.updateField(config, data);
        case 'call_webhook':
          return this.callWebhook(config, data);
        default:
          throw new Error(`Unknown action type: ${type}`);
      }
    } catch (error) {
      console.error('Action execution error:', error);
      throw error;
    }
  }

  /**
   * Send notification action
   */
  async sendNotification(config) {
    // Implement notification logic
    console.log('Sending notification:', config);
    return { success: true };
  }

  /**
   * Create task action
   */
  async createTask(config, data) {
    // Implement task creation logic
    console.log('Creating task:', config);
    return { success: true, taskId: 'task_' + Date.now() };
  }

  /**
   * Send email action
   */
  async sendEmail(config, data) {
    // Implement email sending logic
    console.log('Sending email:', config);
    return { success: true };
  }

  /**
   * Update field action
   */
  async updateField(config, data) {
    // Implement field update logic
    console.log('Updating field:', config);
    return { success: true };
  }

  /**
   * Call webhook action
   */
  async callWebhook(config, data) {
    try {
      const response = await fetch(config.url, {
        method: config.method || 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return { success: response.ok, status: response.status };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get nested value from object
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  /**
   * Log rule execution
   */
  logExecution(ruleId, status, details) {
    const log = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ruleId,
      status,
      details,
      timestamp: new Date(),
    };
    this.executionLogs.push(log);

    // Keep only last 1000 logs
    if (this.executionLogs.length > 1000) {
      this.executionLogs.shift();
    }
  }

  /**
   * Get execution logs
   */
  getExecutionLogs(ruleId = null, limit = 100) {
    let logs = this.executionLogs;
    if (ruleId) {
      logs = logs.filter(l => l.ruleId === ruleId);
    }
    return logs.slice(-limit);
  }
}

export default AutomationEngine;
