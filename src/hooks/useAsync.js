/**
 * Custom Hook: useAsync
 * Handle async operations with loading, error, and data states
 */

import { useEffect, useState, useCallback } from 'react';
import { getLogger } from '../utils/Logger';

const logger = getLogger('useAsync');

export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Define execute function
  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err);
      setStatus('error');
      logger.error('useAsync error', err);
      throw err;
    }
  }, [asyncFunction]);

  // Execute on mount if immediate
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
};

export default useAsync;
