import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import Text from '../../../component/Text';
import Icon from '../../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import ShareCollectionModalButton from './ShareCollectionModalButton';
import { NFTCollectionMeta } from '../../../hook/useSupportedNFT';
import DescriptionSection from './DescriptionSection';

const CollectionBanner = ({nftCollection}: {
  nftCollection: NFTCollectionMeta
}) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const navigation = useNavigation<any>();

  const actions = [
    { name: 'twitter', url: '', icon: 'twitter-circle' },
    { name: 'facebook', url: '', icon: 'facebook-circle' },
    { name: 'telegram', url: '', icon: 'telegram-circle' },
    { name: 'discord', url: '', icon: 'discord-circle' },
    { name: 'youtube', url: '', icon: 'youtube-circle' },
    { name: 'website', url: '', icon: 'website' },
  ];

  return (
    <View style={{ marginBottom: 20 }}>
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
            { 
              borderColor: preferenceTheme.background.background,
              backgroundColor: preferenceTheme.background.surface,
            },
          ]}>
          <Image
            source={{ uri: nftCollection.image }}
            style={styles.bannerImage}
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={[styles.bannerText, { color: preferenceTheme.text.title }]}>
            {nftCollection.name}
          </Text>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            {actions.map(action => {
              return (
                <TouchableOpacity key={action.name}>
                  <Icon name={action.icon} width={16} height={16} color={preferenceTheme.background.surfaceActive}/>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      <DescriptionSection description={nftCollection.description} style={[styles.section, {marginTop: 30}]}/>
    </View>
  );
};

export default CollectionBanner;
