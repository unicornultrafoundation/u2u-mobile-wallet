import { useQuery } from '@tanstack/react-query'

const fetchNFTMetadata = async (tokenURI: string) => {
  try {
    const rs = await fetch(tokenURI)
    return rs.json()
  } catch (error) {
    console.log('fetchNFTMetadata error')
    return {}
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