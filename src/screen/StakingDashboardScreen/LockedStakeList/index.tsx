import React, { useMemo } from 'react'
import { FlatList, View } from 'react-native';
import Text from '@/component/Text'
import { useWallet } from '@/hook/useWallet';
import { useFetchAllLockedStake } from '@/hook/useFetchAllLockedStake';
import LockedStakeItem from './LockedStakeItem';
import { TABBAR_HEIGHT } from '@/component/CustomBottomTab';
import { usePreference } from '@/hook/usePreference';
import { useTranslation } from 'react-i18next';
import theme from '@/theme';

const LockedStakeList = () => {
  const {wallet} = useWallet()
  const {t} = useTranslation()
  const {lockedStake} = useFetchAllLockedStake(wallet.address.toLowerCase())

  const {preferenceTheme} = usePreference()

  const filtered = lockedStake.filter((i) => i.isLockedUp && i.endTime > Date.now())

  return (
    <View style={{
      paddingBottom: TABBAR_HEIGHT,
      gap: 12
    }}>
      {filtered.length === 0 && (
        <Text style={{color: theme.color.neutral[500], fontStyle: 'italic'}}>{t('noLockedStake')}</Text>
      )}
      {filtered.map((item) => {
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
