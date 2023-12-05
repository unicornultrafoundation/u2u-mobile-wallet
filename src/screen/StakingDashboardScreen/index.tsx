import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
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
import Tab from '../../component/Tab'
import DelegationList from './DelegationList'
import WithdrawalRequestList from './WithdrawalRequestList'
import { ScrollView } from 'react-native'
import LockedStakeList from './LockedStakeList'
import { useFetchAllValidator } from '../../hook/useFetchAllValidator'
import { useNetwork } from '../../hook/useNetwork'
import { SafeAreaView } from 'react-native-safe-area-context'

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

  const { fetch: fetchAllValidators } = useFetchAllValidator()
  const {networkConfig} = useNetwork()

  useEffect(() => {
    fetchAllValidators()
  }, [networkConfig])

  const [tab, setTab] = useState('validators');
  const tabs = [
    { label: t('validators'), value: 'validators' },
    { label: t('delegation'), value: 'delegation' },
    { label: t('withdrawalRequest'), value: 'wr' },
    { label: t('lockedStake'), value: 'locked' },
  ];

  const handleChangeTab = (t: string) => {
    setTab(t);
  };

  return (
    <View style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}>
      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={24}
        style={{flex: 1}}
      >
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
        <ScrollView 
          stickyHeaderIndices={[3]}
          bounces={false}
        >
          <InvestmentTotalCard />
          <Separator/>
          <StakingDataCard />
          <View style={{paddingHorizontal: 16, backgroundColor: preferenceTheme.background.background}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Tab
                tabs={tabs}
                selectedTab={tab}
                onChange={handleChangeTab}
                tabStyle={{
                  borderColor: 'transparent',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  paddingLeft: 0,
                  paddingRight: 12,
                }}
                containerStyle={{
                  borderColor: 'transparent',
                  // marginTop: 8,
                }}
              />
            </ScrollView>
          </View>
          <View style={{marginHorizontal: 16}}>
            {tab === 'validators' && (<ValidatorsList />)}
            {tab === 'delegation' && (<DelegationList />)}
            {tab === 'wr' && (<WithdrawalRequestList />)}
            {tab === 'locked' && <LockedStakeList />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default StakingDashboardScreen