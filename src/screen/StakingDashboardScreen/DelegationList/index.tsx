import React from 'react'
import { styles } from './styles'
import { FlatList, View } from 'react-native';
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
    <View>
      <FlatList
        contentContainerStyle={{
          paddingBottom: 400
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