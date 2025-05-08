import React, { useState } from 'react';
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import TextInput from '../../component/TextInput';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useNavigation } from '@react-navigation/native';
import { NFTCollectionMeta } from '../../hook/useSupportedNFT';
import NFTCard from './NFTCard';
import { useAllNFT } from '../../hook/useAllNFT';
import { useTranslation } from 'react-i18next';

const NFTItems = ({nftCollection}: {
  nftCollection: NFTCollectionMeta
}) => {
  const { darkMode } = usePreferenceStore();
  const { t } = useTranslation();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [searchString, setSearchString] = useState('');
  const navigation = useNavigation<any>()
  
  const {items: data, fetchNextPage, isFetching} = useAllNFT(nftCollection)

  const handleLoadMore = () => {
    if (isFetching) return;
    fetchNextPage()
  }

  return (
    // Todo: Fix scroll (on android?)
    <View>
      <TextInput
        containerStyle={{ marginBottom: 16 }}
        value={searchString}
        onChangeText={val => setSearchString(val)}
        placeholder={t('searchNFT')}
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
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 450
        }}
        columnWrapperStyle={{
          gap: 12
        }}
        data={data?.pages.flat()}
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={.3}
      />
    </View>
  );
};

export default NFTItems;
