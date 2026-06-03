// Workflow Engine - Processes workflow execution
class WorkflowEngine {
  constructor() {
    this.activeWorkflows = new Map();
    this.executionHistory = [];
  }

  /**
   * Execute a workflow instance
   * @param {Object} workflowDefinition - The workflow to execute
   * @param {Object} context - Initial context data for the workflow
   */
  async executeWorkflow(workflowDefinition, context = {}) {
    const executionId = this.generateExecutionId();
    const execution = {
      id: executionId,
      workflowId: workflowDefinition.id,
      status: 'running',
      context,
      steps: [],
      startedAt: new Date(),
      completedAt: null,
    };

    this.activeWorkflows.set(executionId, execution);

    try {
      // Execute each step in sequence
      for (const step of workflowDefinition.steps) {
        const stepExecution = await this.executeStep(step, execution.context);
        execution.steps.push(stepExecution);

        // Update context with step output
        execution.context = { ...execution.context, ...stepExecution.output };

        // Check if we should continue
        if (stepExecution.status === 'failed' && step.config.stopOnError) {
          execution.status = 'failed';
          break;
        }
      }

      execution.status = 'completed';
      execution.completedAt = new Date();
    } catch (error) {
      execution.status = 'failed';
      execution.error = error.message;
      execution.completedAt = new Date();
    }

    this.executionHistory.push(execution);
    this.activeWorkflows.delete(executionId);

    return execution;
  }

  /**
   * Execute a single workflow step
   * @param {Object} step - The step to execute
   * @param {Object} context - Current execution context
   */
  async executeStep(step, context) {
    const stepExecution = {
      id: step.id,
      type: step.type,
      status: 'running',
      output: {},
      startedAt: new Date(),
      completedAt: null,
    };

    try {
      switch (step.type) {
        case 'task':
          stepExecution.output = await this.executeTaskStep(step, context);
          break;
        case 'approval':
          stepExecution.output = await this.executeApprovalStep(step, context);
          break;
        case 'condition':
          stepExecution.output = await this.executeConditionStep(step, context);
          break;
        case 'action':
          stepExecution.output = await this.executeActionStep(step, context);
          break;
        default:
          throw new Error(`Unknown step type: ${step.type}`);
      }
      stepExecution.status = 'completed';
    } catch (error) {
      stepExecution.status = 'failed';
      stepExecution.error = error.message;
    }

    stepExecution.completedAt = new Date();
    return stepExecution;
  }

  /**
   * Execute a task step
   */
  async executeTaskStep(step, context) {
    // Create a task from the step configuration
    return {
      taskCreated: true,
      taskData: step.config,
    };
  }

  /**
   * Execute an approval step
   */
  async executeApprovalStep(step, context) {
    // Create an approval request
    return {
      approvalCreated: true,
      approvalData: step.config,
    };
  }

  /**
   * Execute a condition step
   */
  async executeConditionStep(step, context) {
    // Evaluate condition against context
    const condition = step.config.condition;
    const result = this.evaluateExpression(condition, context);

    return {
      conditionMet: result,
      nextStepId: result ? step.config.trueNextStep : step.config.falseNextStep,
    };
  }

  /**
   * Execute an action step
   */
  async executeActionStep(step, context) {
    // Execute configured action
    return {
      actionExecuted: true,
      actionType: step.config.actionType,
    };
  }

  /**
   * Evaluate a simple expression against context
   */
  evaluateExpression(expression, context) {
    try {
      // Simple evaluation - in production, use a proper expression parser
      const func = new Function(...Object.keys(context), `return ${expression}`);
      return func(...Object.values(context));
    } catch (error) {
      console.error('Expression evaluation error:', error);
      return false;
    }
  }

  generateExecutionId() {
    return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get execution history
   */
  getExecutionHistory(workflowId = null, limit = 100) {
    let history = this.executionHistory;
    if (workflowId) {
      history = history.filter(e => e.workflowId === workflowId);
    }
    return history.slice(-limit);
  }

  /**
   * Cancel a running workflow
   */
  cancelWorkflow(executionId) {
    const execution = this.activeWorkflows.get(executionId);
    if (execution) {
      execution.status = 'cancelled';
      execution.completedAt = new Date();
      this.activeWorkflows.delete(executionId);
      return true;
    }
    return false;
  }
}

export default WorkflowEngine;
