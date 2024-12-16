import React from 'react'
import { View } from 'react-native';
import { useFetchWithdrawRequest } from '../../../hook/useFetchWithdrawRequest';
import { useWallet } from '../../../hook/useWallet';
import WRItem from './WRItem';
import { TABBAR_HEIGHT } from '../../../component/CustomBottomTab';
import { usePreference } from '../../../hook/usePreference';
import Text from '@/component/Text';
import { useTranslation } from 'react-i18next';
import theme from '@/theme';

const WithdrawalRequestList = () => {
  const {t} = useTranslation()
  const {wallet} = useWallet()
  const {wr} = useFetchWithdrawRequest(wallet.address.toLowerCase())

  const {preferenceTheme} = usePreference()

  const requestList = wr.filter((i) => !i.withdrawal)

  return (
    <View style={{
      paddingBottom: TABBAR_HEIGHT,
      gap: 12
    }}>
      {requestList.length === 0 && (
        <Text style={{color: theme.color.neutral[500], fontStyle: 'italic'}}>{t('noWR')}</Text>
      )}
      {requestList.map((item) => {
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
