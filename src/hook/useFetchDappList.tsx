import {useQuery} from '@tanstack/react-query';
import fetchData from '../service/fetchData';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error?: Error | null;
}

function useFetchDappList<T>(
  url: string,
  options: RequestInit = {},
): FetchResult<T> {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['dapp-list'],
    queryFn: () => fetchData<T>(url, options),
  });
  if (error) {
    throw new Error(`Failed: ${error}`);
  }
  return {data: data || null, loading};
}

export default useFetchDappList;
