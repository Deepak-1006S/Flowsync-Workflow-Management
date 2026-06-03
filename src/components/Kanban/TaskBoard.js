import React, { useState, useEffect } from 'react';
import { useTask } from '../../hooks/useTask';
import { taskAPI } from '../../utils/api';
import { formatDate, isTaskOverdue, getPriorityColor } from '../../utils/workflowUtils';

const TaskBoard = () => {
  const { tasks, setTasks, updateTask, setLoading, setError } = useTask();
  const [columns, setColumns] = useState({
    pending: [],
    'in-progress': [],
    completed: [],
  });

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskAPI.getAll();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    organizeTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const organizeTasks = () => {
    const organized = {
      pending: tasks.filter(t => t.status === 'pending'),
      'in-progress': tasks.filter(t => t.status === 'in-progress'),
      completed: tasks.filter(t => t.status === 'completed'),
    };
    setColumns(organized);
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const updated = await taskAPI.update(taskId, { status: newStatus });
      updateTask(updated);
    } catch (error) {
      setError(error.message);
    }
  };

  const TaskCard = ({ task }) => (
    <div className={`p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition ${
      isTaskOverdue(task) ? 'border-red-300' : ''
    }`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-sm flex-1">{task.title}</h4>
        <select
          value={task.status}
          onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
          className="text-xs border rounded px-2 py-1"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <p className="text-xs text-gray-600 mb-2">{task.description}</p>

      <div className="flex gap-2 mb-2">
        <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        {isTaskOverdue(task) && (
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">Overdue</span>
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{task.assignee}</span>
        <span>{formatDate(task.dueDate)}</span>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Task Board</h1>

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(columns).map(([status, statusTasks]) => (
          <div key={status} className="bg-gray-50 rounded-lg p-4">
            <h2 className="font-semibold capitalize mb-4 pb-2 border-b">
              {status} ({statusTasks.length})
            </h2>
            <div className="space-y-3">
              {statusTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No tasks</div>
              ) : (
                statusTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
