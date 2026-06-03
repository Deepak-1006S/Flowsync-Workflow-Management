import React, { useState, useEffect } from 'react';
import { useWorkflow } from '../hooks/useWorkflow';
import { useTask } from '../hooks/useTask';
import { useApproval } from '../hooks/useApproval';
import { taskAPI, approvalAPI, workflowAPI } from '../utils/api';

const DashboardPage = () => {
  const { workflows, setWorkflows } = useWorkflow();
  const { tasks, setTasks } = useTask();
  const { pendingApprovals, setPendingApprovals } = useApproval();
  const [stats, setStats] = useState({
    totalWorkflows: 0,
    activeWorkflows: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingApprovals: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const workflowsData = await workflowAPI.getAll();
      const tasksData = await taskAPI.getAll();
      const approvalsData = await approvalAPI.getPending();

      setWorkflows(workflowsData);
      setTasks(tasksData);
      setPendingApprovals(approvalsData);

      const completedCount = tasksData.filter(t => t.status === 'completed').length;
      const activeCount = workflowsData.filter(w => w.published && !w.archived).length;

      setStats({
        totalWorkflows: workflowsData.length,
        activeWorkflows: activeCount,
        totalTasks: tasksData.length,
        completedTasks: completedCount,
        pendingApprovals: approvalsData.length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`${color} rounded-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-4xl opacity-50">{icon}</span>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Total Workflows"
          value={stats.totalWorkflows}
          icon="📊"
          color="bg-blue-600"
        />
        <StatCard
          title="Active Workflows"
          value={stats.activeWorkflows}
          icon="✓"
          color="bg-green-600"
        />
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon="📋"
          color="bg-purple-600"
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          icon="✅"
          color="bg-emerald-600"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon="⏳"
          color="bg-orange-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Workflows */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Workflows</h2>
          <div className="space-y-3">
            {workflows.slice(0, 5).map(workflow => (
              <div key={workflow.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="font-medium text-sm">{workflow.name}</span>
                <span className={`px-2 py-1 text-xs rounded ${
                  workflow.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {workflow.published ? 'Active' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
          <div className="space-y-3">
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <div className="flex-1">
                  <span className="font-medium text-sm">{task.title}</span>
                  <p className="text-xs text-gray-500">{task.assignee}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
