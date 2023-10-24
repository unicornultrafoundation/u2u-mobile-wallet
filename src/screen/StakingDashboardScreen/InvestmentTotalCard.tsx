import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import Text from '../../component/Text'
import { useTranslation } from 'react-i18next'
import theme from '../../theme'
import { usePreferenceStore } from '../../state/preferences'
import { darkTheme, lightTheme } from '../../theme/color'

const InvestmentTotalCard = () => {
  const {t} = useTranslation<string>()

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

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
        <View style={{flex: 1}}>
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
        </View>
        <View style={{flex: 1}}>
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
        </View>
        <View style={{flex: 1}}>
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
        </View>
      </View>
    </View>
  )
}

export default InvestmentTotalCard