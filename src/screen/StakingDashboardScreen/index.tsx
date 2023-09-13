import React, { useState } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import Tab from '../../component/Tab'

const InvestmentDashboardScreen = () => {
  const [selectedTab, setSelectedTab] = useState('staking')
  return (
    <View style={styles.container}>
      <Text>Investment dashboard screen</Text>
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
    </View>
  )
}

export default InvestmentDashboardScreen