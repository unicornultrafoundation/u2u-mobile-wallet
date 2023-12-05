import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, View, Image } from 'react-native';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { NFTCollectionMeta } from '../../hook/useSupportedNFT';
import { OwnedNFT } from '../../hook/useOwnedNFT';
import { useNFTMetadata } from '../../hook/useNFTMetadata';
import { parseIPFSFile } from '../../util/string';

const NFTCard = ({nftCollection, item}: {
  nftCollection: NFTCollectionMeta;
  item: OwnedNFT
}) => {
  const navigation = useNavigation<any>()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const {data} = useNFTMetadata(item.tokenURI)

  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() => navigation.navigate('NFTDetails', {nftCollection, item, metadata: data})}
    >
      {data.image && (
        <View
          style={{
            width: '100%',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 4,
          }}>
          <Image
            source={{ uri: parseIPFSFile(data.image) }}
            style={{ width: '100%', height: 171 }}
          />
        </View>
      )}
      
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Text
          style={{
            flex: 1,
            color: preferenceTheme.text.title,
            fontSize: 14,
            fontWeight: '700',
            letterSpacing: 0.07,
          }}>
          {nftCollection.name} - {item.tokenID}
        </Text>
        {/* <Image style={{ width: 12, height: 12, objectFit: 'contain' }} source={U2ULogo} /> */}
      </View>

      <Text
        style={{
          color: preferenceTheme.text.primary,
          fontSize: 12,
          fontWeight: '500',
          letterSpacing: 0.07,
        }}
      >
        {nftCollection.name}
      </Text>
    </TouchableOpacity>
  )
}

export default NFTCard;
