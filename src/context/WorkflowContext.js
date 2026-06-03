import React, { createContext, useReducer, useCallback } from 'react';

export const WorkflowContext = createContext();

const initialState = {
  workflows: [],
  currentWorkflow: null,
  templates: [],
  loading: false,
  error: null,
};

const workflowReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_WORKFLOWS':
      return { ...state, workflows: action.payload, loading: false };
    case 'ADD_WORKFLOW':
      return { ...state, workflows: [...state.workflows, action.payload] };
    case 'UPDATE_WORKFLOW':
      return {
        ...state,
        workflows: state.workflows.map(w => w.id === action.payload.id ? action.payload : w),
      };
    case 'DELETE_WORKFLOW':
      return { ...state, workflows: state.workflows.filter(w => w.id !== action.payload) };
    case 'SET_CURRENT_WORKFLOW':
      return { ...state, currentWorkflow: action.payload };
    case 'SET_TEMPLATES':
      return { ...state, templates: action.payload };
    case 'ADD_TEMPLATE':
      return { ...state, templates: [...state.templates, action.payload] };
    default:
      return state;
  }
};

export const WorkflowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workflowReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setWorkflows = useCallback((workflows) => {
    dispatch({ type: 'SET_WORKFLOWS', payload: workflows });
  }, []);

  const addWorkflow = useCallback((workflow) => {
    dispatch({ type: 'ADD_WORKFLOW', payload: workflow });
  }, []);

  const updateWorkflow = useCallback((workflow) => {
    dispatch({ type: 'UPDATE_WORKFLOW', payload: workflow });
  }, []);

  const deleteWorkflow = useCallback((workflowId) => {
    dispatch({ type: 'DELETE_WORKFLOW', payload: workflowId });
  }, []);

  const setCurrentWorkflow = useCallback((workflow) => {
    dispatch({ type: 'SET_CURRENT_WORKFLOW', payload: workflow });
  }, []);

  const setTemplates = useCallback((templates) => {
    dispatch({ type: 'SET_TEMPLATES', payload: templates });
  }, []);

  const addTemplate = useCallback((template) => {
    dispatch({ type: 'ADD_TEMPLATE', payload: template });
  }, []);

  const value = {
    ...state,
    setLoading,
    setError,
    setWorkflows,
    addWorkflow,
    updateWorkflow,
    deleteWorkflow,
    setCurrentWorkflow,
    setTemplates,
    addTemplate,
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};
