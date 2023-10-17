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

const NFTScreenBanner = () => {
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
          WARRIOR #6969
        </Text>

        <ShareNFTModalButton/>
      </View>

      <Image
        source={{ uri: 'https://fakeimg.pl/780x240/ff0000,128/000,255' }}
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
            source={{ uri: 'https://fakeimg.pl/100/ff0000,128/000,255' }}
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
            MECH Cyper - U2 Game
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

export default NFTScreenBanner;
