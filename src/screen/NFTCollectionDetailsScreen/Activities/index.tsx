import { Image, TouchableOpacity, View } from 'react-native';
import Text from '../../../component/Text';
import { usePreferenceStore } from '../../../state/preferences';
import { accentColor, color, darkTheme, lightTheme } from '../../../theme/color';
import Button from '../../../component/Button';
import Icon from '../../../component/Icon';
import U2ULogo from '../../../asset/icon/u2u_wallet_icon.png';
import Collapsible from '../../../component/Collapsible';
import { useState } from 'react';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { styles } from './styles';

const NFTCollectionActivities = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [expandedItem, setExpandedItem] = useState<number>();
  const handleExpandItem = (id: number) => {
    if (id === expandedItem) {
      setExpandedItem(undefined);
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <View style={{ gap: 8 }}>
      {Array.from(Array(10).keys()).map(num => {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }} key={num}>
            <TouchableOpacity style={{ marginTop: 6 }} onPress={() => handleExpandItem(num)}>
              <Image
                style={{ borderRadius: 4 }}
                source={{ uri: 'https://fakeimg.pl/300/ff0000,128/000,255' }}
                width={34}
                height={34}
              />
            </TouchableOpacity>

            <Collapsible
              style={{ flex: 1 }}
              open={expandedItem === num}
              handler={() => handleExpandItem(num)}
              hideIcon
              expandedSection={
                <View>
                  <View style={styles.row}>
                    <Text
                      style={[
                        { color: preferenceTheme.text.primary },
                        styles.text,
                      ]}>
                      Price
                    </Text>
                    <Text
                      style={[
                        { color: preferenceTheme.text.primary },
                        styles.text,
                      ]}>
                      $54.123
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text
                      style={[
                        { color: preferenceTheme.text.primary },
                        styles.text,
                      ]}>
                      From
                    </Text>
                    <Text
                      style={[
                        { color: preferenceTheme.text.primary },
                        styles.text,
                      ]}>
                      0xa13...4241
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={[
                        { color: preferenceTheme.text.primary },
                        styles.text,
                      ]}>
                      To
                    </Text>
                    <Text
                      style={[
                        { color: preferenceTheme.text.primary },
                        styles.text,
                      ]}>
                      0xa13...4241
                    </Text>
                  </View>
                </View>
              }>
              <View style={styles.row}>
                <View>
                  <Text
                    style={[
                      { color: preferenceTheme.text.primary },
                      styles.collectionText,
                    ]}>
                    MECH Cyper - U2 Game
                  </Text>
                  <Text style={{ fontWeight: '700', fontSize: 12 }}>
                    WARRIOR #1269
                  </Text>
                  <Text
                    style={[
                      { color: preferenceTheme.text.primary },
                      styles.text,
                    ]}>
                    10/11/2023, 14:27:47
                  </Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    <Button
                      style={{
                        borderRadius: 6,
                        height: 12,
                        paddingVertical: 2,
                        paddingHorizontal: 4,
                      }}
                      textStyle={{
                        color: accentColor.error.darker,
                        fontSize: 7,
                        letterSpacing: -0.205,
                        lineHeight: 8,
                      }}
                      type="fill"
                      color="error">
                      Send
                    </Button>
                    <Button type="text">
                      <Icon name="send" width={12} height={12}/>
                    </Button>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    <Image source={U2ULogo} style={{ width: 12, height: 12 }}/>
                    <Text style={{ fontSize: 12, fontWeight: '500' }}>
                      10.969
                    </Text>
                  </View>

                  <FontAwesome6Icon
                    name="chevron-down"
                    solid
                    style={{
                      fontSize: 8,
                      color: color.neutral[500],
                      transform: [
                        { rotate: expandedItem === num ? '180deg' : '0deg' },
                      ],
                    }}
                  />
                </View>
              </View>
            </Collapsible>
          </View>
        );
      })}
    </View>
  );
};

export default NFTCollectionActivities;
