import { useQuery } from "@tanstack/react-query"
import { fetchRemoteConfig } from "../service/remoteConfig"

interface RemoteAppConfig {
  versionInReview: string;
  allowClaimMembership: boolean,
  minLockupDuration: number, // in days
  withdrawPeriodTime: number,
}

const defaultConfig: RemoteAppConfig = {
  versionInReview: "",
  allowClaimMembership: true,
  minLockupDuration: 14,
  withdrawPeriodTime: 604800
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