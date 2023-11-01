import React from 'react'
import { FlatList, View } from 'react-native';
import { useFetchWithdrawRequest } from '../../../hook/useFetchWithdrawRequest';
import { useWallet } from '../../../hook/useWallet';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import WRItem from './WRItem';

const WithdrawalRequestList = () => {
  const {wallet} = useWallet()
  const {wr} = useFetchWithdrawRequest(wallet.address.toLowerCase())

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={{marginBottom: 400}}>
      <FlatList
        data={wr}
        contentContainerStyle={{
          paddingBottom: 400,
        }}
        renderItem={({item}) => {
          return (
            <WRItem item={item} />
          )
        }}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
      />
    </View>
  )
}

export default WithdrawalRequestList;
