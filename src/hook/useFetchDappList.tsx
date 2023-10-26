import {useQuery} from '@tanstack/react-query';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error?: Error | null;
}

function useFetchDappList<T>(
  url: string,
  options: RequestInit = {},
): FetchResult<T> {
  const fetchData = async (url: string, options: RequestInit): Promise<T> => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['dapp-list'],
    queryFn: () => fetchData(url, options),
  });
  if (error) {
    throw new Error(`Failed: ${error}`);
  }
  return {data: data || null, loading};
}

export default useFetchDappList;
