import { useQuery } from "@tanstack/react-query"
import { fetchRemoteConfig } from "../service/remoteConfig"

interface RemoteAppConfig {
  versionInReview: string;
  allowClaimMembership: boolean,
  minLockupDuration: number, // in days
  withdrawPeriodTime: number,
  bannerConfig: {
    [key: string]: {
      type: string,
      title: string,
      content: string,
      buttonText: string,
      screen: string,
      screenParams: { [key: string]: string },
      image: string,
      network: number[]
    }[]
  }
}

const defaultConfig: RemoteAppConfig = {
  versionInReview: "",
  allowClaimMembership: true,
  minLockupDuration: 14,
  withdrawPeriodTime: 604800,
  bannerConfig: {
    en: [],
    vi: []
  }
}

export function useRemoteConfig() {

  const query = useQuery<RemoteAppConfig>({
    queryKey: ['remote-config'],
    queryFn: () => fetchRemoteConfig(),
    initialData: defaultConfig
  })
  
  return {
    loading: query.isLoading,
    remoteConfig: query.data || defaultConfig
  }
};