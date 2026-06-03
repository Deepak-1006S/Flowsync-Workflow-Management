import { useContext } from 'react';
import { AutomationContext } from '../context/AutomationContext';

export const useAutomation = () => {
  const context = useContext(AutomationContext);
  if (!context) {
    throw new Error('useAutomation must be used within AutomationProvider');
  }
  return context;
};
