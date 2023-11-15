import React from 'react'
import { OwnedNFT } from '../../../hook/useOwnedNFT';
import { TouchableOpacity, Image } from 'react-native';
import { useNFTMetadata } from '../../../hook/useNFTMetadata';
import { parseIPFSFile } from '../../../util/string';

const NFTItem = ({item, onClick}: {
  item: OwnedNFT;
  onClick: () => void
}) => {
  const {data} = useNFTMetadata(item.tokenURI)

  if (!data || !data.image) return null

  return (
    <TouchableOpacity
      style={{ width: 111, height: 111 }}
      onPress={onClick}
    >
      <Image
        source={{ uri: parseIPFSFile(data.image) }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 8,
        }}
      />
    </TouchableOpacity>
  )
};

export default NFTItem;
