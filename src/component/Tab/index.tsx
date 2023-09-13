import React from 'react'
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import styles from './styles';

interface TabTitle {
  label: string;
  value: string;
}
interface TabProps {
  selectedTab?: string;
  onChange?: (newTab: string) => void;
  tabs: TabTitle[];
  tabStyle?: ViewStyle,
  containerStyle?: ViewStyle
}

const Tab = ({selectedTab, onChange, tabs, tabStyle, containerStyle}: TabProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {tabs.map((tabItem) => {
        const isActive = selectedTab === tabItem.value
        return (
          <TouchableOpacity
            key={`tab-${tabItem.value}`}
            style={[
              styles.tabContainer,
              {borderColor: isActive ? '#2EBD85' : 'transparent'},
              tabStyle
            ]}
            onPress={() => onChange && onChange(tabItem.value)}
          >
            <Text style={[
              styles.tabTitle, 
              {color: isActive ? '#2EBD85' : '#FFF'},
              {fontWeight: isActive ? 'bold' : '500'}
            ]}>{tabItem.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
};

export default Tab;