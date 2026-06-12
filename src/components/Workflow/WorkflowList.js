import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../../hooks/useWorkflow';
import { workflowAPI } from '../../utils/api';
import { formatDate, getWorkflowStatus } from '../../utils/workflowUtils';

const WorkflowList = () => {
  const navigate = useNavigate();
  const { workflows, setWorkflows, setCurrentWorkflow, setLoading, setError, deleteWorkflow } = useWorkflow();
  const [filteredWorkflows, setFilteredWorkflows] = useState([]);
  const [filter, setFilter] = useState('all'); // all, active, draft, archived

  useEffect(() => {
    fetchWorkflows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      const data = await workflowAPI.getAll();
      setWorkflows(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    filterWorkflows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflows, filter]);

  const filterWorkflows = () => {
    let filtered = workflows;
    if (filter !== 'all') {
      filtered = workflows.filter(w => getWorkflowStatus(w) === filter);
    }
    setFilteredWorkflows(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      try {
        await workflowAPI.delete(id);
        deleteWorkflow(id);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handlePublish = async (id) => {
    try {
      const updated = await workflowAPI.publish(id);
      setWorkflows(workflows.map(w => w.id === id ? updated : w));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNewWorkflow = useCallback(() => {
    setCurrentWorkflow(null);
    navigate('/workflows?mode=builder');
  }, [navigate, setCurrentWorkflow]);

  const handleEditWorkflow = useCallback((workflow) => {
    setCurrentWorkflow(workflow);
    navigate('/workflows?mode=builder');
  }, [navigate, setCurrentWorkflow]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workflows</h1>
        <button
          onClick={handleNewWorkflow}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + New Workflow
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'active', 'draft', 'archived'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredWorkflows.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No workflows found
          </div>
        ) : (
          filteredWorkflows.map(workflow => (
            <div key={workflow.id} className="bg-white border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{workflow.name}</h3>
                  <p className="text-gray-600">{workflow.description}</p>
                  <div className="mt-2 flex gap-2 items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      getWorkflowStatus(workflow) === 'active' ? 'bg-green-100 text-green-800' :
                      getWorkflowStatus(workflow) === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getWorkflowStatus(workflow)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {workflow.steps?.length || 0} steps
                    </span>
                    <span className="text-sm text-gray-500">
                      Updated {formatDate(workflow.updatedAt)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditWorkflow(workflow)}
                    className="px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    Edit
                  </button>
                  {getWorkflowStatus(workflow) === 'draft' && (
                    <button
                      onClick={() => handlePublish(workflow.id)}
                      className="px-3 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100"
                    >
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(workflow.id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkflowList;
