import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import Collapsible from '../../component/Collapsible';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../../component/Dropdown';
import { useSupportedNFT } from '../../hook/useSupportedNFT';
import NFTRow from './NFTRow';

const NFTTab = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const navigation = useNavigation<any>();
  // const data: NFTCollection[] = nftCollections as NFTCollection[];

  const {supportedNFT: data} = useSupportedNFT()

  const [expandedItem, setExpandedItem] = useState("");
  const handleExpandItem = (id: string) => {
    if (id === expandedItem) {
      setExpandedItem("");
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
      {/* <Dropdown
        containerStyle={{ marginBottom: 16 }}
        renderList={<Text style={{ color: 'white' }}>List</Text>}>
        <Text style={{ color: preferenceTheme.text.title, fontSize: 14 }}>
          All collectibles
        </Text>
      </Dropdown> */}

      {data.map((item) => (
        <NFTRow nftCollection={item} open={expandedItem === item.id} handleExpandItem={handleExpandItem} />
      ))}
    </View>
  );
};

export default NFTTab;
