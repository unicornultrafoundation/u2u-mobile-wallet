import React, { useState } from 'react';
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import TextInput from '../../component/TextInput';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import Dropdown from '../../component/Dropdown';
import U2ULogo from '../../asset/icon/u2u_wallet_icon.png';
import { useNavigation } from '@react-navigation/native';
import { NFTCollectionMeta } from '../../hook/useSupportedNFT';
import NFTCard from './NFTCard';
import { useAllNFT } from '../../hook/useAllNFT';

const NFTItems = ({nftCollection}: {
  nftCollection: NFTCollectionMeta
}) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [searchString, setSearchString] = useState('');
  const navigation = useNavigation<any>()
  
  const {items: data} = useAllNFT(nftCollection)

  return (
    // Todo: Fix scroll (on android?)
    <View>
      <TextInput
        containerStyle={{ marginBottom: 16 }}
        value={searchString}
        onChangeText={val => setSearchString(val)}
        placeholder='Search NFT...'
      />
      {/* <Dropdown containerStyle={{ marginBottom: 16 }} renderList={<></>}>
        <Text
          style={{
            color: preferenceTheme.text.title,
            fontSize: 14,
            fontWeight: '500',
            letterSpacing: 0.07,
          }}>
          Listing price: High to low
        </Text>
      </Dropdown> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{
          rowGap: 12,
          columnGap: 24,
          paddingBottom: 450
        }}
        data={data}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <NFTCard
              key={`nft-item-${index}`}
              nftCollection={nftCollection}
              item={item}
            />
          )
        }}
      />
    </View>
  );
};

export default NFTItems;
