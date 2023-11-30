import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import Text from '../../../component/Text';
import Icon from '../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { useState } from 'react';
import ShareCollectionModalButton from './ShareCollectionModalButton';
import { NFTCollectionMeta } from '../../../hook/useSupportedNFT';

const CollectionBanner = ({nftCollection}: {
  nftCollection: NFTCollectionMeta
}) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const navigation = useNavigation<any>();
  const [showFullDesc, setShowFullDesc] = useState(false);

  const actions = [
    { name: 'twitter', url: '', icon: 'twitter-circle' },
    { name: 'facebook', url: '', icon: 'facebook-circle' },
    { name: 'telegram', url: '', icon: 'telegram-circle' },
    { name: 'discord', url: '', icon: 'discord-circle' },
    { name: 'youtube', url: '', icon: 'youtube-circle' },
    { name: 'website', url: '', icon: 'website' },
  ];

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={styles.banner}>
        <View style={[styles.section, styles.bannerActions]}>
          <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
            <Icon name="arrow-left" width={24} height={24}/>
          </TouchableOpacity>
          <ShareCollectionModalButton nftCollection={nftCollection} />
        </View>

        <Image
          source={{ uri: nftCollection.banner }}
          style={styles.bannerImage}
        />
      </View>

      <View style={[styles.section, styles.bannerContent]}>
        <View
          style={[
            styles.bannerAvatarWrapper,
            { borderColor: preferenceTheme.background.background },
          ]}>
          <Image
            source={{ uri: nftCollection.image }}
            style={styles.bannerImage}
          />
        </View>

        <View>
          <Text
            style={[styles.bannerText, { color: preferenceTheme.text.title }]}>
            {nftCollection.name}
          </Text>

          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            {actions.map(action => {
              return (
                <TouchableOpacity key={action.name}>
                  <Icon name={action.icon} width={16} height={16}/>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
        <View style={[styles.section, styles.descriptionSection]}>
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

export default CollectionBanner;
