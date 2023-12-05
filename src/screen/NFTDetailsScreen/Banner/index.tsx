import { Image, TouchableOpacity, View } from 'react-native';
import Icon from '../../../component/Icon';
import Text from '../../../component/Text';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { NFTCollectionMeta } from '../../../hook/useSupportedNFT';
import { OwnedNFT } from '../../../hook/useOwnedNFT';
import { parseIPFSFile } from '../../../util/string';
import theme from '../../../theme';
import DescriptionSection from '../../NFTCollectionDetailsScreen/Banner/DescriptionSection';

const NFTScreenBanner = ({nftCollection, item, metadata}: {
  nftCollection: NFTCollectionMeta;
  item: OwnedNFT;
  metadata: Record<string, any>
}) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  return (
    <View style={{paddingBottom: 16}}>
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, 
        marginTop: 12,
      }}>
        <Image
          source={{ uri: parseIPFSFile(metadata.image) }}
          style={{
            width: 24,
            height: 24,
            objectFit: 'cover',
            borderRadius: 12,
          }}
        />
        <Text
          style={[
            theme.typography.headline.bold, 
            {flex: 1, color: preferenceTheme.text.title}
          ]}>
          {nftCollection.name}
        </Text>
        <TouchableOpacity>
          <Icon name="favourite" width={26} height={26}/>
        </TouchableOpacity>
      </View>
      <DescriptionSection description={nftCollection.description} style={{marginTop: 16}}/>
    </View>
  );
};

export default NFTScreenBanner;
