import { useQuery } from "@tanstack/react-query"
import { fetchRemoteConfig } from "../service/remoteConfig"

interface RemoteAppConfig {
  versionInReview: string;
  allowClaimMembership: boolean
}

const defaultConfig:RemoteAppConfig = {
  versionInReview: "",
  allowClaimMembership: true
}

export function useRemoteConfig() {

  const query = useQuery<RemoteAppConfig>({
    queryKey: ['remote-config'],
    queryFn: () => fetchRemoteConfig(),
  })
  
  return {
    loading: query.isLoading,
    remoteConfig: query.data || defaultConfig
  }
};