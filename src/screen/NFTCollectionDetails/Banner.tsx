import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { useState } from 'react';

const CollectionBanner = () => {
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
            <Icon name="arrow-left" width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="send" width={24} height={24} />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: 'https://fakeimg.pl/780x240/ff0000,128/000,255' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </View>

      <View style={[styles.section, styles.bannerContent]}>
        <View
          style={[
            styles.bannerAvatar,
            { borderColor: preferenceTheme.background.background },
          ]}>
          <Image
            source={{ uri: 'https://fakeimg.pl/100/' }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </View>

        <View>
          <Text
            style={[styles.bannerText, { color: preferenceTheme.text.title }]}>
            MECH Cyper - U2 Game
          </Text>

          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            {actions.map(action => {
              return (
                <TouchableOpacity key={action.name}>
                  <Icon name={action.icon} width={16} height={16} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
        <View
          style={[
            styles.section,
            {
              width: '100%',
              marginTop: 40,
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <Text
            style={{ color: preferenceTheme.text.secondary, fontSize: 14 }}
            ellipsizeMode="tail"
            numberOfLines={showFullDesc ? undefined : 1}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
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
