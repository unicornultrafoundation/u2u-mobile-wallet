import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Text from '../../component/Text';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {usePreferenceStore} from '../../state/preferences';
import {darkTheme, lightTheme} from '../../theme/color';
import Collapsible from '../../component/Collapsible';
import nftCollections from '../../mock/nft-collections.json';
import {useNavigation} from '@react-navigation/native';
import Dropdown from "../../component/Dropdown";

interface NFTCollection {
  id: number;
  image: string;
  name: string;
  quantity: number;
  category: string;
  items: {id: number; name: string; image: string}[];
}

const NFTTab = () => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const navigation = useNavigation<any>();
  const data: NFTCollection[] = nftCollections as NFTCollection[];

  const [expandedItem, setExpandedItem] = useState<number>();
  const handleExpandItem = (id: number) => {
    if (id === expandedItem) {
      setExpandedItem(undefined);
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <View style={{paddingHorizontal: 16}}>
      <Dropdown
        containerStyle={{ marginBottom: 16 }}
        renderList={
          <Text style={{ color: 'white' }}>List</Text>
        }
      >
        <Text style={{color: preferenceTheme.text.title, fontSize: 14}}>
          All collectibles
        </Text>
      </Dropdown>

      {data.map(({name, quantity, id, image, items}) => (
        <Collapsible
          key={id}
          open={expandedItem === id}
          handler={() => handleExpandItem(id)}
          expandedSection={
            <ScrollView
              horizontal
              snapToInterval={Dimensions.get('window').width}
              decelerationRate="fast"
              alwaysBounceVertical
              contentContainerStyle={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 12,
                flexWrap: 'nowrap',
                marginBottom: 12,
              }}>
              {items.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={{width: 111, height: 111}}
                  onPress={() => navigation.navigate('NFTCollection')}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          }>
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
              <Text
                style={{fontSize: 16, fontWeight: '500', letterSpacing: 0.06}}>
                {name}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Text style={{color: preferenceTheme.text.primary, fontSize: 14}}>
                {quantity.toString()}
              </Text>
            </View>
          </View>
        </Collapsible>
      ))}
    </View>
  );
};

export default NFTTab;
