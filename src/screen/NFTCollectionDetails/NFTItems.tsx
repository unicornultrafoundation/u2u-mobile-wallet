import React, { useState } from 'react';
import { Image, View } from 'react-native';
import TextInput from "../../component/TextInput";
import { styles } from './styles';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import Dropdown from '../../component/Dropdown';
import U2ULogo from '../../asset/icon/u2u_wallet_icon.png';

const NFTItems = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [searchString, setSearchString] = useState('');

  const data = [
    {
      id: 1,
      name: 'WARRIOR  #1',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 2,
      name: 'WARRIOR #2',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 3,
      name: 'WARRIOR #3',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 4,
      name: 'WARRIOR #3',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 5,
      name: 'WARRIOR #3',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 6,
      name: 'WARRIOR #3',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 7,
      name: 'WARRIOR  #1',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 8,
      name: 'WARRIOR #2',
      image: 'https://fakeimg.pl/300/',
    },
  ];

  return (
    // Todo: Fix scroll (on android?)
    <View>
      <TextInput
        style={{ height: 20 }}
        value={searchString}
        onChangeText={val => setSearchString(val)}
      />
      <Dropdown containerStyle={{ marginBottom: 16 }} renderList={<></>}>
        <Text
          style={{
            color: preferenceTheme.text.title,
            fontSize: 14,
            fontWeight: '500',
            letterSpacing: 0.07,
          }}>
          Listing price: High to low
        </Text>
      </Dropdown>

      <View
        style={{
          rowGap: 12,
          columnGap: 24,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {data.map(item => (
          <View key={item.id} style={{ width: '45%' }}>
            <View
              style={{
                width: '100%',
                borderRadius: 12,
                overflow: 'hidden',
                marginBottom: 4,
              }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: '100%', height: 171 }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: preferenceTheme.text.title,
                  fontSize: 14,
                  fontWeight: '700',
                  letterSpacing: 0.07,
                }}>
                {item.name}
              </Text>
              <Image style={{ width: 12, height: 12, objectFit: 'contain' }} source={U2ULogo} />
            </View>

            <Text
              style={{
                color: preferenceTheme.text.primary,
                fontSize: 12,
                fontWeight: '500',
                letterSpacing: 0.07,
              }}>
              MECH Cyper - U2 Game
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default NFTItems;
