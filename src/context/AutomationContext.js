import React, { createContext, useReducer, useCallback } from 'react';

export const AutomationContext = createContext();

const initialState = {
  rules: [],
  triggers: [],
  actions: [],
  currentRule: null,
  executionLogs: [],
  loading: false,
  error: null,
};

const automationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_RULES':
      return { ...state, rules: action.payload, loading: false };
    case 'ADD_RULE':
      return { ...state, rules: [...state.rules, action.payload] };
    case 'UPDATE_RULE':
      return {
        ...state,
        rules: state.rules.map(r => r.id === action.payload.id ? action.payload : r),
      };
    case 'DELETE_RULE':
      return { ...state, rules: state.rules.filter(r => r.id !== action.payload) };
    case 'SET_TRIGGERS':
      return { ...state, triggers: action.payload };
    case 'SET_ACTIONS':
      return { ...state, actions: action.payload };
    case 'SET_CURRENT_RULE':
      return { ...state, currentRule: action.payload };
    case 'ADD_EXECUTION_LOG':
      return {
        ...state,
        executionLogs: [action.payload, ...state.executionLogs].slice(0, 1000),
      };
    case 'TOGGLE_RULE':
      return {
        ...state,
        rules: state.rules.map(r =>
          r.id === action.payload ? { ...r, enabled: !r.enabled } : r
        ),
      };
    default:
      return state;
  }
};

export const AutomationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(automationReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setRules = useCallback((rules) => {
    dispatch({ type: 'SET_RULES', payload: rules });
  }, []);

  const addRule = useCallback((rule) => {
    dispatch({ type: 'ADD_RULE', payload: rule });
  }, []);

  const updateRule = useCallback((rule) => {
    dispatch({ type: 'UPDATE_RULE', payload: rule });
  }, []);

  const deleteRule = useCallback((ruleId) => {
    dispatch({ type: 'DELETE_RULE', payload: ruleId });
  }, []);

  const setTriggers = useCallback((triggers) => {
    dispatch({ type: 'SET_TRIGGERS', payload: triggers });
  }, []);

  const setActions = useCallback((actions) => {
    dispatch({ type: 'SET_ACTIONS', payload: actions });
  }, []);

  const setCurrentRule = useCallback((rule) => {
    dispatch({ type: 'SET_CURRENT_RULE', payload: rule });
  }, []);

  const addExecutionLog = useCallback((log) => {
    dispatch({ type: 'ADD_EXECUTION_LOG', payload: log });
  }, []);

  const toggleRule = useCallback((ruleId) => {
    dispatch({ type: 'TOGGLE_RULE', payload: ruleId });
  }, []);

  const value = {
    ...state,
    setLoading,
    setError,
    setRules,
    addRule,
    updateRule,
    deleteRule,
    setTriggers,
    setActions,
    setCurrentRule,
    addExecutionLog,
    toggleRule,
  };

  return (
    <AutomationContext.Provider value={value}>
      {children}
    </AutomationContext.Provider>
  );
};
