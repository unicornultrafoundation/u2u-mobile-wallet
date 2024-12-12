import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import Text from '../../component/Text'
import { useTranslation } from 'react-i18next'
import theme from '../../theme'
import { useNativeBalance } from '../../hook/useNativeBalance'
import { useWallet } from '../../hook/useWallet'
import { formatNumberString } from '../../util/string'
import { SvgUri } from 'react-native-svg'
import { useStaking } from '../../hook/useStaking'
import { usePreference } from '../../hook/usePreference'
import { useAllPendingRewards } from '@/hook/useAllPendingRewards'
import { useTotalStakedAmount } from '@/hook/useTotalStakedAmount'

const InvestmentTotalCard = () => {
  const {t} = useTranslation<string>()

  const {preferenceTheme} = usePreference()

  const {wallet} = useWallet()
  const {balance} = useNativeBalance(wallet.address)

  const {data: totalStakedAmount} = useTotalStakedAmount()
  const {data: allPendingRewards} = useAllPendingRewards()

  const renderItem = ({label, value} : {
    label: string,
    value: string
  }) => {
    return (
      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',  
        marginBottom: 12,
      }}>
        <Text
          style={[
            theme.typography.caption1.regular, 
            {
              color: preferenceTheme.text.disabled,
              textAlign: 'center'
            }
          ]}
        >
          {t(label)}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
          <Text>{value}</Text>
          <View style={{width: 22, height: 22, paddingLeft: 6}}>
            <SvgUri
              uri="https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/public_assets/token_logos/u2u.svg"
              width="100%"
              height="100%"
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.balanceCardContainer}>
      <View style={{paddingVertical: 20}}>
        <Text 
          style={[
            theme.typography.caption1.medium,
            {
              color: preferenceTheme.text.disabled,
              textAlign: 'center'
            }
          ]}
        >
          {t('investedBalance')}
        </Text>
        <Text
          style={[
            theme.typography.largeTitle.medium,
            {
              color: preferenceTheme.text.title,
              textAlign: 'center'
            }
          ]}
        >
          $0
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        {renderItem({label: 'available', value: formatNumberString(balance, 3)})}
        <View style={{width: 5}}/>
        {renderItem({label: 'staked', value: formatNumberString(totalStakedAmount, 3)})}
        <View style={{width: 5}}/>
        {renderItem({label: 'pendingRewards', value: formatNumberString(allPendingRewards, 3)})}
      </View>
    </View>
  )
}

export default InvestmentTotalCard