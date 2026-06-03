import React, { useState, useEffect } from 'react';
import { useWorkflow } from '../../hooks/useWorkflow';
import { createWorkflowStep, validateWorkflow } from '../../utils/workflowUtils';
import { workflowAPI } from '../../utils/api';

const WorkflowBuilder = () => {
  const { currentWorkflow, addWorkflow, updateWorkflow, setError } = useWorkflow();
  const [workflow, setWorkflow] = useState({
    id: '',
    name: '',
    description: '',
    trigger: null,
    steps: [],
    published: false,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [selectedStep, setSelectedStep] = useState(null);
  const [stepType, setStepType] = useState('task');

  useEffect(() => {
    if (currentWorkflow) {
      setWorkflow(currentWorkflow);
    }
  }, [currentWorkflow]);

  const handleAddStep = () => {
    const newStep = createWorkflowStep(stepType, `New ${stepType} step`);
    setWorkflow({
      ...workflow,
      steps: [...workflow.steps, newStep],
    });
    setSelectedStep(newStep.id);
  };

  const handleUpdateStep = (stepId, updates) => {
    setWorkflow({
      ...workflow,
      steps: workflow.steps.map(s => s.id === stepId ? { ...s, ...updates } : s),
    });
  };

  const handleDeleteStep = (stepId) => {
    setWorkflow({
      ...workflow,
      steps: workflow.steps.filter(s => s.id !== stepId),
    });
    setSelectedStep(null);
  };

  const handleSave = async () => {
    const validation = validateWorkflow(workflow);
    if (!validation.valid) {
      setError(validation.errors.join(', '));
      return;
    }

    try {
      if (workflow.id) {
        const updated = await workflowAPI.update(workflow.id, workflow);
        updateWorkflow(updated);
      } else {
        const created = await workflowAPI.create(workflow);
        addWorkflow(created);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Workflow Builder</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Panel - Workflow Configuration */}
        <div className="col-span-1 bg-white border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Workflow Name</label>
              <input
                type="text"
                value={workflow.name}
                onChange={(e) => setWorkflow({ ...workflow, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Enter workflow name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={workflow.description}
                onChange={(e) => setWorkflow({ ...workflow, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 h-20"
                placeholder="Enter workflow description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trigger</label>
              <select
                value={workflow.trigger || ''}
                onChange={(e) => setWorkflow({ ...workflow, trigger: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select trigger</option>
                <option value="manual">Manual</option>
                <option value="scheduled">Scheduled</option>
                <option value="event">Event-based</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save Workflow
          </button>
        </div>

        {/* Center Panel - Step Builder */}
        <div className="col-span-2">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Workflow Steps</h2>
              <div className="flex gap-2">
                <select
                  value={stepType}
                  onChange={(e) => setStepType(e.target.value)}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="task">Task</option>
                  <option value="approval">Approval</option>
                  <option value="condition">Condition</option>
                  <option value="action">Action</option>
                </select>
                <button
                  onClick={handleAddStep}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  + Add Step
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {workflow.steps.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No steps added yet. Click "Add Step" to begin.
                </div>
              ) : (
                workflow.steps.map((step, index) => (
                  <div
                    key={step.id}
                    onClick={() => setSelectedStep(step.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition ${
                      selectedStep === step.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{step.title}</p>
                        <p className="text-sm text-gray-500">{step.type}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Step Details */}
          {selectedStep && (
            <div className="bg-white border rounded-lg p-4 mt-4">
              {(() => {
                const step = workflow.steps.find(s => s.id === selectedStep);
                return (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Step Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => handleUpdateStep(step.id, { title: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={step.description}
                          onChange={(e) => handleUpdateStep(step.id, { description: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2 h-20"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteStep(step.id)}
                        className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        Delete Step
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
