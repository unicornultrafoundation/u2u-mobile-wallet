import React from 'react'
import { FlatList, View } from 'react-native';
import { usePreferenceStore } from '../../../state/preferences';
import { useWallet } from '../../../hook/useWallet';
import { darkTheme, lightTheme } from '../../../theme/color';
import { useFetchAllLockedStake } from '../../../hook/useFetchAllLockedStake';
import LockedStakeItem from './LockedStakeItem';

const LockedStakeList = () => {
  const {wallet} = useWallet()
  const {lockedStake} = useFetchAllLockedStake(wallet.address.toLowerCase())

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={{marginBottom: 400}}>
      <FlatList
        data={lockedStake.filter((i) => i.isLockedUp)}
        contentContainerStyle={{
          paddingBottom: 400,
        }}
        renderItem={({item}) => {
          return (
            <LockedStakeItem item={item} />
          )
        }}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
      />
    </View>
  )
}

export default LockedStakeList;
