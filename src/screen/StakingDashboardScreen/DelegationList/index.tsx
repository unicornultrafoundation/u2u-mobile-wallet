import React, { useEffect } from 'react'
import { FlatList, RefreshControl, View } from 'react-native';
import { useFetchDelegator } from '../../../hook/useFetchDelegator';
import { useWallet } from '../../../hook/useWallet';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import DelegationItem from './DelegationItem';

const DelegationList = () => {
  const {wallet} = useWallet()
  const {delegator} = useFetchDelegator(wallet.address)
  const { validations, address: delegatorAddr } = delegator

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={{marginBottom: 400}}>
      <FlatList
        // refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchDelegator} />}
        contentContainerStyle={{
          paddingBottom: 400,
        }}
        data={validations}
        renderItem={({item}) => {
          return (
            <DelegationItem
              key={`delegation-${item.id}`}
              item={item}
            />
          )
        }}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
      />
    </View>
  )
};

export default DelegationList;
