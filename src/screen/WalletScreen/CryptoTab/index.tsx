import React, { useEffect, useState } from 'react';
import { useWalletAssets } from '../../../hook/useWalletAssets';
import TokenRow from './TokenRow';
import { useLocalStore } from '../../../state/local';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useGlobalStore } from '../../../state/global';
import { ScrollView } from 'react-native-gesture-handler';

const CryptoTab = ({ collapsed, onResetParentView }: { collapsed: boolean, onResetParentView: () => void; }) => {
  const { assets, assetsToShow } = useWalletAssets()
  const [firstTouch, setFirstTouch] = useState(0);
  const { searchKeyword } = useGlobalStore()

  const { selectedToken, tokenListInitted, saveSelectedToken, setTokenListInitted } = useLocalStore()

  // Handle Swipe event
  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(`CryptoTab onScrollEndDrag ${e.nativeEvent.contentOffset.y}`)
    if (e.nativeEvent.contentOffset.y <= 0 && firstTouch == 0 && collapsed) {
      onResetParentView();
    }
  };

  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(`CryptoTab onScrollBeginDrag ${e.nativeEvent.contentOffset.y}`)
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
    return <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
        minHeight: 500
      }}
      onScrollBeginDrag={e => onScrollBeginDrag(e)}
      onScrollEndDrag={e => onScrollEndDrag(e)}
    >
      {assetsToShow.filter((i) => {
        return (i.address as string).toLowerCase().includes(searchKeyword.toLowerCase()) ||
          (i.symbol as string).toLowerCase().includes(searchKeyword.toLowerCase()) ||
          (i.name as string).toLowerCase().includes(searchKeyword.toLowerCase())
      }).map((item: any) => {
        return (
          <TokenRow tokenObj={item} key={`token-asset-${item.symbol}-${item.name}`} />
        )
      })}
    </ScrollView>
  } else {
    return (
      <FlatList
        nestedScrollEnabled={true}
        style={{ minHeight: 500, flexGrow: 0, }}
        onScrollBeginDrag={e => onScrollBeginDrag(e)}
        onScrollEndDrag={e => onScrollEndDrag(e)}
        data={assetsToShow.filter((i) => {
          return (i.address as string).toLowerCase().includes(searchKeyword.toLowerCase()) ||
            (i.symbol as string).toLowerCase().includes(searchKeyword.toLowerCase()) ||
            (i.name as string).toLowerCase().includes(searchKeyword.toLowerCase())
        })}
        renderItem={({ item }) => <TokenRow tokenObj={item} key={`token-asset-${item}`} />}
        keyExtractor={item => `token-asset-${item.symbol}-${item.name}`}
      />
    )
  }
}

export default CryptoTab;
