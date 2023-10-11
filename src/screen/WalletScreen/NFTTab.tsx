import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import Text from '../../component/Text';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {usePreferenceStore} from '../../state/preferences';
import {darkTheme, lightTheme} from '../../theme/color';

interface NFTCollection {
  id: number;
  image?: string;
  name: string;
  quantity: number;
}


const NFTTab = () => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const data: NFTCollection[] = [
    {
      id: 1,
      quantity: 5,
      name: 'Uni-Astro Eggs',
      image: 'https://fakeimg.pl/300/',
    },
    {id: 2, quantity: 10, name: 'MECH Cyper', image: 'https://fakeimg.pl/300/'},
    {id: 3, quantity: 6, name: 'THE MERGE', image: 'https://fakeimg.pl/300/'},
    {
      id: 4,
      quantity: 8,
      name: 'Unicorn Ultra',
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: 5,
      quantity: 5,
      name: 'Uni-Astro Eggs',
      image: 'https://fakeimg.pl/300/',
    },
    {id: 6, quantity: 10, name: 'MECH Cyper', image: 'https://fakeimg.pl/300/'},
    {id: 7, quantity: 6, name: 'THE MERGE', image: 'https://fakeimg.pl/300/'},
    {
      id: 8,
      quantity: 8,
      name: 'Unicorn Ultra',
      image: 'https://fakeimg.pl/300/',
    },
  ];
  return (
    <View style={{paddingHorizontal: 16}}>
      <TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8,
            marginBottom: 16,
          }}>
          <Text style={{color: preferenceTheme.text.title, fontSize: 14}}>
            All collectibles
          </Text>
          <FontAwesome6Icon
            style={{fontSize: 11, color: preferenceTheme.text.primary}}
            name="chevron-down"
            solid
          />
        </View>
      </TouchableOpacity>

      {data.map(({ name, quantity, id, image }) => (
        <View
          key={id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <Image
              source={{uri: image}}
              width={28}
              height={28}
              alt=""
              borderRadius={14}
            />
            <Text style={{fontSize: 16, fontWeight: '500', letterSpacing: 0.06}}>
              {name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Text style={{color: preferenceTheme.text.primary, fontSize: 14}}>
              {quantity.toString()}
            </Text>
            <FontAwesome6Icon
              style={{fontSize: 11, color: preferenceTheme.text.primary}}
              name="chevron-down"
              solid
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default NFTTab;
