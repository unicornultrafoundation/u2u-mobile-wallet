import React, { useEffect, useState } from 'react';
import { useWalletAssets } from '../../../hook/useWalletAssets';
import TokenRow from './TokenRow';
import { useLocalStore } from '../../../state/local';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useGlobalStore } from '../../../state/global';
import { ScrollView } from 'react-native-gesture-handler';
import {
  View,
  Image,
  Text,
} from 'react-native';
import { styles } from '../styles';
import { useTranslation } from 'react-i18next';

const CryptoTab = ({ collapsed, onResetParentView }: { collapsed: boolean, onResetParentView: () => void; }) => {
  const { assets, assetsToShow } = useWalletAssets()
  const [firstTouch, setFirstTouch] = useState(0);
  const { searchKeyword } = useGlobalStore()
  const { t } = useTranslation()

  const { selectedToken, tokenListInitted, saveSelectedToken, setTokenListInitted } = useLocalStore()

  // Handle Swipe event
  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y <= 0 && firstTouch == 0 && collapsed) {
      if (!Boolean(searchKeyword)) {
        onResetParentView();
      }
    }
  };

  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setFirstTouch(e.nativeEvent.contentOffset.y);
  };


  useEffect(() => {
    if (tokenListInitted) return

    if (selectedToken.length === 0) {
      const addressList = assets.map((i) => i.address)
      if (addressList.length === 0) return
      saveSelectedToken(addressList)
      setTokenListInitted(true)
    }

  }, [tokenListInitted, selectedToken, assets])

  if (collapsed) {
    // Filter the array and check if it is empty
    const filteredTokens = assetsToShow.filter((i) => {
      return (
        (i.address as string).toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (i.symbol as string).toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (i.name as string).toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });

    return <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
        minHeight: 500
      }}
      onScrollBeginDrag={e => onScrollBeginDrag(e)}
      onScrollEndDrag={e => onScrollEndDrag(e)}
    >
      {filteredTokens.length === 0 ? (
        <View style={styles.containerNoNFT}>
          <Image source={require('../../../asset/images/ic_no_nft.png')} style={styles.imageNoNFT} resizeMode="contain" />
          <Text style={styles.textNoNFT}>{t(Boolean(searchKeyword) ? 'No cryptos found' : 'No cryptocurrency yet')}</Text>
        </View>
      ) : (
        // If array is not empty, display list
        (filteredTokens).map((item: any) => (
          <TokenRow tokenObj={item} key={`token-asset-${item.symbol}-${item.name}`} />
        ))
      )}
    </ScrollView>
  } else {
    return (
      assetsToShow.map((item) => {
        return <TokenRow tokenObj={item} key={`token-asset-${item.symbol}-${item.name}`} />
      })
    )
    // return (
    //   <FlatList
    //     nestedScrollEnabled={true}
    //     style={{ minHeight: 500, flexGrow: 0, }}
    //     onScrollBeginDrag={e => onScrollBeginDrag(e)}
    //     onScrollEndDrag={e => onScrollEndDrag(e)}
    //     data={assetsToShow}
    //     renderItem={({ item }) => <TokenRow tokenObj={item} key={`token-asset-${item}`} />}
    //     keyExtractor={item => `token-asset-${item.symbol}-${item.name}`}
    //   />
    // )
  }
}

export default CryptoTab;
