import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import Collapsible from '../../component/Collapsible';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../../component/Dropdown';
import { useSupportedNFT } from '../../hook/useSupportedNFT';
import NFTRow from './NFTRow';
import theme from '../../theme';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

const NFTTab = ({ collapsed, onResetParentView }: { collapsed: boolean, onResetParentView: () => void; }) => {
  const { t } = useTranslation()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const navigation = useNavigation<any>();
  const [firstTouch, setFirstTouch] = useState(0);

  const { supportedNFT: data } = useSupportedNFT()

  const [expandedItem, setExpandedItem] = useState("");
  const handleExpandItem = (id: string) => {
    if (id === expandedItem) {
      setExpandedItem("");
    } else {
      setExpandedItem(id);
    }
  };

  // Handle Swipe event
  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(`onScrollEndDrag ${e.nativeEvent.contentOffset.y}`)
    if (e.nativeEvent.contentOffset.y <= 0 && firstTouch == 0 && collapsed) {
      onResetParentView();
    }
  };

  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(`onScrollBeginDrag ${e.nativeEvent.contentOffset.y}`)
    setFirstTouch(e.nativeEvent.contentOffset.y);
  };

  if (collapsed) {
    return <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
        minHeight: 500,
        paddingHorizontal: 16
      }}
      onScrollBeginDrag={e => onScrollBeginDrag(e)}
      onScrollEndDrag={e => onScrollEndDrag(e)}
    >
      {data.map(
        (item) => (
          <NFTRow key={`nft-${item.id}`} nftCollection={item} open={expandedItem === item.id} handleExpandItem={handleExpandItem} />
        )
      )}
    </ScrollView>

  } else {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        {/* <Dropdown
          containerStyle={{ marginBottom: 16 }}
          renderList={<Text style={{ color: 'white' }}>List</Text>}>
          <Text style={{ color: preferenceTheme.text.title, fontSize: 14 }}>
            All collectibles
          </Text>
        </Dropdown> */}

        {(data ?? []).length == 0 && (
          <View style={styles.containerNoNFT}>
            <Image source={require('../../asset/images/ic_no_nft.png')} style={styles.imageNoNFT} resizeMode="contain" />
            <Text style={styles.textNoNFT}> {t('There is no NFTs yet')}</Text>
          </View>
        )}


        <FlatList
          nestedScrollEnabled={true}
          style={{ minHeight: 500 }}
          onScrollBeginDrag={e => onScrollBeginDrag(e)}
          onScrollEndDrag={e => onScrollEndDrag(e)}
          data={data}
          renderItem={({ item }) => <NFTRow key={`nft-${item.id}`} nftCollection={item} open={expandedItem === item.id} handleExpandItem={handleExpandItem} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }

};

export default NFTTab;
