import { useQuery } from '@tanstack/react-query'
import { parseIPFSFile } from '../util/string'
import { logErrorForMonitoring } from './useCrashlytics'

const fetchNFTMetadata = async (tokenURI: string) => {
  try {
    if (!tokenURI) return {}
    const rs = await fetch(parseIPFSFile(tokenURI))
    
    return rs.json()
  } catch (error) {

      try {
        const rs = await fetch(parseIPFSFile(tokenURI))
      
        return JSON.parse((await rs.text()).replace(/[\u{0080}-\u{FFFF}]/gu, ""))
      } catch (error) {
        logErrorForMonitoring(error as any, "fetchNFTMetadata error")
        return {}
      }
  }
}

export const useNFTMetadata = (tokenURI: string) => {
  const {data} = useQuery({
    queryKey: ['fetchNFTMetadata', tokenURI],
    queryFn: () => fetchNFTMetadata(tokenURI),
    placeholderData: {} as Record<string, any>
  })

  return {
    data
  }
}