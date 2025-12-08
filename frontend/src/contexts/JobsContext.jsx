import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { fetchJobsAndInternships } from '../services/api';

// Initial state
const initialState = {
  opportunities: [],
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    location: 'all',
    type: 'all',
    field: 'all'
  },
  showMobileFilters: false
};

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_OPPORTUNITIES: 'SET_OPPORTUNITIES',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_FILTER: 'SET_FILTER',
  RESET_FILTERS: 'RESET_FILTERS',
  TOGGLE_MOBILE_FILTERS: 'TOGGLE_MOBILE_FILTERS',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
const jobsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.SET_OPPORTUNITIES:
      return { ...state, opportunities: action.payload, loading: false, error: null };
    
    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    
    case ACTIONS.SET_FILTER:
      return { 
        ...state, 
        filters: { ...state.filters, [action.payload.filterType]: action.payload.value }
      };
    
    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        searchTerm: '',
        filters: {
          location: 'all',
          type: 'all',
          field: 'all'
        }
      };
    
    case ACTIONS.TOGGLE_MOBILE_FILTERS:
      return { ...state, showMobileFilters: !state.showMobileFilters };
    
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Create context
const JobsContext = createContext();

// Provider component
export const JobsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobsReducer, initialState);

  // Action creators
  const setLoading = useCallback((loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  }, []);

  const setOpportunities = useCallback((opportunities) => {
    dispatch({ type: ACTIONS.SET_OPPORTUNITIES, payload: opportunities });
  }, []);

  const setSearchTerm = useCallback((searchTerm) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: searchTerm });
  }, []);

  const setFilter = useCallback((filterType, value) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: { filterType, value } });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  }, []);

  const toggleMobileFilters = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_MOBILE_FILTERS });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  // Load opportunities function
  const loadOpportunities = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      const data = await fetchJobsAndInternships({
        ...state.filters,
        search: state.searchTerm
      });
      setOpportunities(data);
    } catch (err) {
      setError('Failed to load opportunities. Please try again later.');
      console.error('Error fetching opportunities:', err);
    }
  }, [state.filters, state.searchTerm, setLoading, clearError, setOpportunities, setError]);

  // Computed values
  const activeFiltersCount = Object.values(state.filters).filter(v => v !== 'all').length + (state.searchTerm ? 1 : 0);

  const value = {
    // State
    ...state,
    activeFiltersCount,
    
    // Actions
    setSearchTerm,
    setFilter,
    resetFilters,
    toggleMobileFilters,
    loadOpportunities,
    clearError
  };

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
};

// Custom hook to use the context
export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
