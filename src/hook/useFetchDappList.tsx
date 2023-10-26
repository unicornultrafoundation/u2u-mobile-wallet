import {useEffect, useState} from 'react';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetchDappList<T>(
  url: string,
  options: RequestInit = {},
): FetchResult<T> {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const jsonData = await response.json();

        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return {data, loading, error};
}

export default useFetchDappList;
