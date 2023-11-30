import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../styles';
import Icon from '../../../component/Icon';
import Text from '../../../component/Text';
import ShareNFTModalButton from './ShareNFTModalButton';
import { useState } from 'react';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { NFTCollectionMeta } from '../../../hook/useSupportedNFT';
import { OwnedNFT } from '../../../hook/useOwnedNFT';
import { parseIPFSFile } from '../../../util/string';

const NFTScreenBanner = ({nftCollection, item, metadata}: {
  nftCollection: NFTCollectionMeta;
  item: OwnedNFT;
  metadata: Record<string, any>
}) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const navigation = useNavigation<any>();
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <View style={[styles.section, { paddingVertical: 16 }]}>
      <View style={[styles.row]}>
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Icon name="arrow-left" width={24} height={24}/>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            letterSpacing: 0.38,
            textAlign: 'center',
          }}>
          {nftCollection.name} #{item.id}
        </Text>

        <ShareNFTModalButton
          item={item}
          nftCollection={nftCollection}
          metadata={metadata}
        />
      </View>

      <Image
        source={{ uri: parseIPFSFile(metadata.image) }}
        style={{
          width: '100%',
          height: Dimensions.get('window').width - 32,
          objectFit: 'cover',
          borderRadius: 16,
          marginTop: 16,
        }}
      />

      <View style={[styles.row, { marginTop: 12 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
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
            style={{
              fontSize: 20,
              fontWeight: '700',
              letterSpacing: 0.38,
              textAlign: 'center',
            }}>
            {nftCollection.name}
          </Text>
        </View>

        <TouchableOpacity>
          <Icon name="favourite" width={28} height={28}/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
        <View style={[styles.row, { marginTop: 12 }]}>
          <Text
            style={{
              color: preferenceTheme.text.secondary,
              fontSize: 14,
              textAlign: 'justify',
            }}
            ellipsizeMode="tail"
            numberOfLines={showFullDesc ? undefined : 1}
          >
            {nftCollection.description}
          </Text>

          {!showFullDesc && (
            <FontAwesome6Icon
              name="chevron-down"
              solid
              style={{
                color: preferenceTheme.text.secondary,
                fontSize: 14,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NFTScreenBanner;
