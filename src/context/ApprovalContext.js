import React, { createContext, useReducer, useCallback } from 'react';

export const ApprovalContext = createContext();

const initialState = {
  approvals: [],
  pendingApprovals: [],
  approvalHistory: [],
  loading: false,
  error: null,
};

const approvalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_APPROVALS':
      return { ...state, approvals: action.payload, loading: false };
    case 'SET_PENDING_APPROVALS':
      return { ...state, pendingApprovals: action.payload };
    case 'ADD_APPROVAL':
      return {
        ...state,
        approvals: [...state.approvals, action.payload],
        pendingApprovals: [...state.pendingApprovals, action.payload],
      };
    case 'APPROVE':
      return {
        ...state,
        pendingApprovals: state.pendingApprovals.filter(a => a.id !== action.payload.id),
        approvals: state.approvals.map(a =>
          a.id === action.payload.id
            ? { ...a, status: 'approved', approvedAt: new Date().toISOString(), approvedBy: action.payload.approvedBy }
            : a
        ),
        approvalHistory: [...state.approvalHistory, { ...action.payload, action: 'approved' }],
      };
    case 'REJECT':
      return {
        ...state,
        pendingApprovals: state.pendingApprovals.filter(a => a.id !== action.payload.id),
        approvals: state.approvals.map(a =>
          a.id === action.payload.id
            ? { ...a, status: 'rejected', rejectedAt: new Date().toISOString(), rejectedBy: action.payload.rejectedBy, reason: action.payload.reason }
            : a
        ),
        approvalHistory: [...state.approvalHistory, { ...action.payload, action: 'rejected' }],
      };
    default:
      return state;
  }
};

export const ApprovalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(approvalReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setApprovals = useCallback((approvals) => {
    dispatch({ type: 'SET_APPROVALS', payload: approvals });
  }, []);

  const setPendingApprovals = useCallback((approvals) => {
    dispatch({ type: 'SET_PENDING_APPROVALS', payload: approvals });
  }, []);

  const addApproval = useCallback((approval) => {
    dispatch({ type: 'ADD_APPROVAL', payload: approval });
  }, []);

  const approve = useCallback((approvalData) => {
    dispatch({ type: 'APPROVE', payload: approvalData });
  }, []);

  const reject = useCallback((rejectionData) => {
    dispatch({ type: 'REJECT', payload: rejectionData });
  }, []);

  const value = {
    ...state,
    setLoading,
    setError,
    setApprovals,
    setPendingApprovals,
    addApproval,
    approve,
    reject,
  };

  return (
    <ApprovalContext.Provider value={value}>
      {children}
    </ApprovalContext.Provider>
  );
};
