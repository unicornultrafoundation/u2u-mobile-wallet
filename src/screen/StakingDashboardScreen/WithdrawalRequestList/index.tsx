import React from 'react'
import { FlatList, View } from 'react-native';
import { useFetchWithdrawRequest } from '../../../hook/useFetchWithdrawRequest';
import { useWallet } from '../../../hook/useWallet';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import WRItem from './WRItem';
import { TABBAR_HEIGHT } from '../../../component/CustomBottomTab';

const WithdrawalRequestList = () => {
  const {wallet} = useWallet()
  const {wr} = useFetchWithdrawRequest(wallet.address.toLowerCase())

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={{
      paddingBottom: TABBAR_HEIGHT,
      gap: 12
    }}>
      {wr.filter((i) => !i.withdrawal).map((item) => {
        return (
          <WRItem
            key={`wr-item-${item.wrId}`}
            item={item}
          />
        )
      })}
      {/* <FlatList
        bounces={false}
        data={wr.filter((i) => !i.withdrawal)}
        contentContainerStyle={{
          paddingBottom: TABBAR_HEIGHT,
        }}
        renderItem={({item}) => {
          return (
            <WRItem item={item} />
          )
        }}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
      /> */}
    </View>
  )
}

export default WithdrawalRequestList;
