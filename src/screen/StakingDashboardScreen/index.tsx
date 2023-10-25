import React, { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import Tab from '../../component/Tab'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useGlobalStore } from '../../state/global'
import StakingTab from './StakingTab'

const StakingDashboardScreen = () => {
  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  const [selectedTab, setSelectedTab] = useState('staking')
  return (
    <View style={styles.container}>
      <Tab
        tabs={[
          {
            label: 'Staking',
            value: 'staking'
          },
          {
            label: 'Liquid Swap',
            value: 'liquid-swap'
          },
          {
            label: 'Launchpad',
            value: 'launchpad'
          }
        ]}
        selectedTab={selectedTab}
        onChange={(v) => setSelectedTab(v)}
        tabStyle={{
          paddingHorizontal: 0,
          paddingRight: 48
        }}
      />
      {selectedTab === 'staking' && <StakingTab />}
    </View>
  )
}

export default StakingDashboardScreen