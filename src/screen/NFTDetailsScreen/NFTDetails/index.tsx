import { View } from 'react-native';
import NFTBasicInfo from './BasicInfo';
import NFTTraits from './Traits';
import { OwnedNFT } from '../../../hook/useOwnedNFT';
import { NFTCollectionMeta } from '../../../hook/useSupportedNFT';

const NFTDetails = ({item, nftCollection, metadata}: {
  item: OwnedNFT;
  nftCollection: NFTCollectionMeta;
  metadata: Record<string, any>
}) => {
  return (
    <View style={{ gap: 24 }}>
      <NFTBasicInfo
        item={item}
        nftCollection={nftCollection}
      />
      <NFTTraits
        metadata={metadata}
      />
    </View>
  );
};

export default NFTDetails;
