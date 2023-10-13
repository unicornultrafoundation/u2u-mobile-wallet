import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { color, darkTheme, lightTheme } from '../../theme/color';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import { useNavigation } from "@react-navigation/native";

const CollectionBanner = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const navigation = useNavigation<any>()

  const actions = [
    { name: 'twitter', url: '', icon: 'twitter-circle' },
    { name: 'facebook', url: '', icon: 'facebook-circle' },
    { name: 'telegram', url: '', icon: 'telegram-circle' },
    { name: 'discord', url: '', icon: 'discord-circle' },
    { name: 'youtube', url: '', icon: 'youtube-circle' },
    { name: 'website', url: '', icon: 'website' },
  ];

  return (
    <View>
      <View style={styles.banner}>
        <View style={[styles.section, styles.bannerActions]}>
          <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
            <Icon name="arrow-left" width={24} height={24}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="send" width={24} height={24}/>
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: 'https://fakeimg.pl/780x240/ff0000,128/000,255' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </View>

      <View style={[styles.section, styles.bannerContent]}>
        <View style={[styles.bannerAvatar, { borderColor: preferenceTheme.background.background }]}>
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
          <Text style={[styles.bannerText, { color: preferenceTheme.text.title }]}>
            MECH Cyper - U2 Game
          </Text>

          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            {actions.map(action => {
              return (
                <TouchableOpacity>
                  <Icon name={action.icon} width={16} height={16} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CollectionBanner;
