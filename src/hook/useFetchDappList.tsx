import {useQuery} from '@tanstack/react-query';
import { useNetwork } from './useNetwork';

interface DAppMeta {
  description: string;
  title: string;
  logoImg: string;
  backgroundImg: string;
  gradientColor: string[];
  url: string;
  category: string[];
  featured: boolean;
  upcoming: boolean;
}

function useFetchDappList() {
  const {networkConfig} = useNetwork()

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<DAppMeta[]>({
    queryKey: ['dapp-list', networkConfig?.chainID],
    queryFn: async () => {
      if (!networkConfig) return []
      const response = await fetch(networkConfig?.dappURL);

      return response.json();
    }
  });

  return {data: data || [] as DAppMeta[], loading, error};
}

export default useFetchDappList;
