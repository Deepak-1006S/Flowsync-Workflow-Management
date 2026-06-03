/**
 * Custom Hook: useFetch
 * Simplify data fetching with caching and error handling
 */

import { useEffect, useState, useRef } from 'react';
import apiClient from '../utils/APIClient';
import { getLogger } from '../utils/Logger';

const logger = getLogger('useFetch');

// Simple in-memory cache
const cache = new Map();

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache
      const cacheKey = `${url}_${JSON.stringify(options)}`;
      if (cache.has(cacheKey)) {
        setData(cache.get(cacheKey));
        setLoading(false);
        return;
      }

      // Fetch data
      const result = await apiClient.get(url, options);

      if (isMountedRef.current) {
        setData(result);
        cache.set(cacheKey, result);
        setLoading(false);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err);
        setLoading(false);
        logger.error(`Failed to fetch ${url}`, err);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]); // Only refetch if URL changes

  const refetch = () => {
    cache.delete(`${url}_${JSON.stringify(options)}`);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
