import React from 'react'
import { FlatList, View } from 'react-native';
import { usePreferenceStore } from '../../../state/preferences';
import { useWallet } from '../../../hook/useWallet';
import { darkTheme, lightTheme } from '../../../theme/color';
import { useFetchAllLockedStake } from '../../../hook/useFetchAllLockedStake';
import LockedStakeItem from './LockedStakeItem';
import { TABBAR_HEIGHT } from '../../../component/CustomBottomTab';
import { usePreference } from '../../../hook/usePreference';

const LockedStakeList = () => {
  const {wallet} = useWallet()
  const {lockedStake} = useFetchAllLockedStake(wallet.address.toLowerCase())

  const {preferenceTheme} = usePreference()

  return (
    <View style={{
      paddingBottom: TABBAR_HEIGHT,
      gap: 12
    }}>
      {lockedStake.filter((i) => i.isLockedUp).map((item) => {
        return (
          <LockedStakeItem
            key={`locked-stake-${item.validatorId}-${item.delegator}`}
            item={item}
          />
        )
      })}
      {/* <FlatList
        bounces={false}
        data={lockedStake.filter((i) => i.isLockedUp)}
        contentContainerStyle={{
          paddingBottom: TABBAR_HEIGHT,
        }}
        renderItem={({item}) => {
          return (
            <LockedStakeItem item={item} />
          )
        }}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
      /> */}
    </View>
  )
}

export default LockedStakeList;
