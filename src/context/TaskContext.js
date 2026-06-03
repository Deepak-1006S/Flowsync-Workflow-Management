import React, { createContext, useReducer, useCallback } from 'react';

export const TaskContext = createContext();

const initialState = {
  tasks: [],
  currentTask: null,
  taskFilter: 'all', // all, pending, completed, overdue, assigned-to-me
  loading: false,
  error: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t),
        currentTask: state.currentTask?.id === action.payload.id ? action.payload : state.currentTask,
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'SET_CURRENT_TASK':
      return { ...state, currentTask: action.payload };
    case 'SET_TASK_FILTER':
      return { ...state, taskFilter: action.payload };
    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload ? { ...t, status: 'completed', completedAt: new Date().toISOString() } : t
        ),
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setTasks = useCallback((tasks) => {
    dispatch({ type: 'SET_TASKS', payload: tasks });
  }, []);

  const addTask = useCallback((task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  }, []);

  const updateTask = useCallback((task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
  }, []);

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  }, []);

  const setCurrentTask = useCallback((task) => {
    dispatch({ type: 'SET_CURRENT_TASK', payload: task });
  }, []);

  const setTaskFilter = useCallback((filter) => {
    dispatch({ type: 'SET_TASK_FILTER', payload: filter });
  }, []);

  const completeTask = useCallback((taskId) => {
    dispatch({ type: 'COMPLETE_TASK', payload: taskId });
  }, []);

  const value = {
    ...state,
    setLoading,
    setError,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    setCurrentTask,
    setTaskFilter,
    completeTask,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
