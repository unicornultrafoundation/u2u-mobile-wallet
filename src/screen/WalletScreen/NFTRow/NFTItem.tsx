import React from 'react'
import { OwnedNFT } from '../../../hook/useOwnedNFT';
import { TouchableOpacity, Image } from 'react-native';
import { CachedImage } from '@georstat/react-native-image-cache';
import { useNFTMetadata } from '../../../hook/useNFTMetadata';
import { parseIPFSFile } from '../../../util/string';

const NFTItem = ({item, onClick}: {
  item: OwnedNFT;
  onClick: () => void
}) => {
  
  const {data} = useNFTMetadata(item.tokenURI)
  console.log('item.tokenURI', item.tokenURI)
  console.log(data)
  if (!data || !data.image) return null

  return (
    <TouchableOpacity
      style={{ width: 111, height: 111 }}
      onPress={onClick}
    >
      {/* <Image
        source={{ uri: parseIPFSFile(data.image) }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 8,
        }}
      /> */}
      <CachedImage
        source={parseIPFSFile(data.image)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 8,
        }}
        thumbnailSource="https://via.placeholder.com/111x111"
      />
    </TouchableOpacity>
  )
};

export default NFTItem;
