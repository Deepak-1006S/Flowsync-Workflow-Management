import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WorkflowProvider } from './context/WorkflowContext';
import { TaskProvider } from './context/TaskContext';
import { ApprovalProvider } from './context/ApprovalContext';
import { AutomationProvider } from './context/AutomationContext';
import ErrorBoundary from './components/Common/ErrorBoundary';
import Layout from './components/Layout/Layout';
import DashboardPage from './pages/DashboardPage';
import WorkflowsPage from './pages/WorkflowsPage';
import TasksPage from './pages/TasksPage';
import ApprovalsPage from './pages/ApprovalsPage';
import AutomationPage from './pages/AutomationPage';

/**
 * Main App Component
 * Entry point for the FlowSync application
 */
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <WorkflowProvider>
          <TaskProvider>
            <ApprovalProvider>
              <AutomationProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/workflows" element={<WorkflowsPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/approvals" element={<ApprovalsPage />} />
                    <Route path="/automation" element={<AutomationPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </Layout>
              </AutomationProvider>
            </ApprovalProvider>
          </TaskProvider>
        </WorkflowProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
