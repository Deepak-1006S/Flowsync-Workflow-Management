import { useContext } from 'react';
import { ApprovalContext } from '../context/ApprovalContext';

export const useApproval = () => {
  const context = useContext(ApprovalContext);
  if (!context) {
    throw new Error('useApproval must be used within ApprovalProvider');
  }
  return context;
};
