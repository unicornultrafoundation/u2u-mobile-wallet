import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import Text from '../../component/Text'
import { useTranslation } from 'react-i18next'
import theme from '../../theme'
import { usePreferenceStore } from '../../state/preferences'
import { darkTheme, lightTheme } from '../../theme/color'
import { useNativeBalance } from '../../hook/useNativeBalance'
import { useWallet } from '../../hook/useWallet'
import { formatNumberString } from '../../util/string'
import { SvgUri } from 'react-native-svg'
import { useStaking } from '../../hook/useStaking'

const InvestmentTotalCard = () => {
  const {t} = useTranslation<string>()

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {wallet} = useWallet()
  const {balance} = useNativeBalance(wallet.address)
  const {allPendingRewards, totalStakedAmount} = useStaking()

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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={[
              theme.typography.caption1.regular, 
              {
                color: preferenceTheme.text.disabled,
                textAlign: 'center'
              }
            ]}
          >
            {t('available')}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{formatNumberString(balance, 3)}</Text>
            <View style={{width: 28, height: 28, paddingLeft: 6}}>
              <SvgUri
                uri="https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"
                width="100%"
                height="100%"
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={[
              theme.typography.caption1.regular, 
              {
                color: preferenceTheme.text.disabled,
                textAlign: 'center'
              }
            ]}
          >
            {t('staked')}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{formatNumberString(totalStakedAmount, 3)}</Text>
            <View style={{width: 28, height: 28, paddingLeft: 6}}>
              <SvgUri
                uri="https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"
                width="100%"
                height="100%"
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={[
              theme.typography.caption1.regular, 
              {
                color: preferenceTheme.text.disabled,
                textAlign: 'center'
              }
            ]}
          >
            {t('pendingRewards')}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{formatNumberString(allPendingRewards, 3)}</Text>
            <View style={{width: 28, height: 28, paddingLeft: 6}}>
              <SvgUri
                uri="https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"
                width="100%"
                height="100%"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default InvestmentTotalCard