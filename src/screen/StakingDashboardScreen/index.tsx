import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import styles from './styles'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useGlobalStore } from '../../state/global'
import StakingDataCard from './StakingDataCard'
import { useTranslation } from 'react-i18next'
import Text from '../../component/Text'
import theme from '../../theme'
import { usePreferenceStore } from '../../state/preferences'
import { darkTheme, lightTheme } from '../../theme/color'
import Separator from '../../component/Separator'
import InvestmentTotalCard from './InvestmentTotalCard'
import ValidatorsList from './ValidatorsList'

const StakingDashboardScreen = () => {
  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  const {t} = useTranslation<string>()
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={styles.container}>
      <Text
        style={[
          theme.typography.title3.bold, 
          {
            color: preferenceTheme.text.primary,
            textAlign: 'center',
            paddingVertical: 10
          }]}
      >
        {t("myInvestment")}
      </Text>
      <InvestmentTotalCard />
      <Separator />
      <StakingDataCard />
      <ValidatorsList />
    </View>
  )
}

export default StakingDashboardScreen