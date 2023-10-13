import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { color, darkTheme, lightTheme } from '../../theme/color';
import Text from '../../component/Text';
import Icon from '../../component/Icon';

const CollectionBanner = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const actions = [
    { name: 'twitter', url: '' },
    { name: 'facebook', url: '' },
    { name: 'telegram', url: '' },
    { name: 'discord', url: '' },
    { name: 'youtube', url: '' },
    { name: 'website', url: '' },
  ];

  return (
    <View style={styles.banner}>
      <Image
        source={{ uri: 'https://fakeimg.pl/780x240/ff0000,128/000,255' }}
        style={{ width: '100%', height: 120, objectFit: 'cover' }}
      />

      <View
        style={[
          styles.section,
          { flexDirection: 'row', alignItems: 'center', gap: 12, height: 42, overflow: 'visible', marginTop: 8 },
        ]}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            overflow: 'hidden',
            borderWidth: 4,
            borderColor: preferenceTheme.background.background,
          }}>
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
            style={{
              fontSize: 16,
              fontWeight: '700',
              letterSpacing: 0.06,
              textTransform: 'uppercase',
              color: color.neutral[0],
              marginBottom: 8
            }}>
            MECH Cyper - U2 Game
          </Text>

          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            {actions.map(action => {
              return (
                <TouchableOpacity>
                  <Icon name={action.name} width={16} height={16} />
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
