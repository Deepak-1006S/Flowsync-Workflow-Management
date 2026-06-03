import { useContext } from 'react';
import { WorkflowContext } from '../context/WorkflowContext';

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within WorkflowProvider');
  }
  return context;
};
