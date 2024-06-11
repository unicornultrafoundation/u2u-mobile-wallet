import React from 'react'
import Collapsible from '../../../component/Collapsible';
import { NFTCollectionMeta } from '../../../hook/useSupportedNFT';
import { ActivityIndicator, Dimensions, ScrollView, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Image } from 'react-native';
import Text from '../../../component/Text';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { formatNumberString } from '../../../util/string';
import { useOwnedNFT } from '../../../hook/useOwnedNFT';
import { useNavigation } from '@react-navigation/native';
import NFTItem from './NFTItem';
import { useTokenBalance } from '../../../hook/useTokenBalance';

const NFTRow = ({nftCollection, open, handleExpandItem, style}: {
  nftCollection: NFTCollectionMeta
  open: boolean
  handleExpandItem: (itemID: string) => void;
  style?: StyleProp<ViewStyle>
}) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const {items, isLoading, owned} = useOwnedNFT(nftCollection, 1)

  const navigation = useNavigation<any>();

  return (
    <Collapsible
      // open={expandedItem === id}
      open={open}
      handler={() => handleExpandItem(nftCollection.id)}
      style={[{
        backgroundColor: open ? preferenceTheme.background.surfaceHover : 'transparent',
      }, style]}
      expandedSection={
        isLoading ? (
          <ActivityIndicator />
        ) : (
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
            }}
          >
            {items?.pages.flat().map(item => {
              return (
                <NFTItem
                  key={`${nftCollection.id}-item-${item.id}`}
                  item={item}
                  onClick={() => navigation.navigate('NFTCollection', {nftCollection})}
                />
              )
            })}
          </ScrollView>
        )
      }>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 8,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image
            source={{ uri: nftCollection.image }}
            width={28}
            height={28}
            alt=""
            borderRadius={14}
          />
          <Text
            style={{ fontSize: 14, fontWeight: '500', letterSpacing: 0.06 }}>
            {nftCollection.name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ color: preferenceTheme.text.primary, fontSize: 14 }}>
            {owned ? formatNumberString(owned) : 0}
          </Text>
        </View>
      </View>
    </Collapsible>
  )
};

export default NFTRow;
