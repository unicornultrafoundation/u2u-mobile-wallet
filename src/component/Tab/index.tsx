import React from 'react'
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import styles from './styles';
import { color } from '../../theme/color';
import { usePreferenceStore } from '../../state/preferences';

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
  const {darkMode} = usePreferenceStore();

  return (
    <View style={[styles.container, containerStyle]}>
      {tabs.map((tabItem) => {
        const isActive = selectedTab === tabItem.value
        return (
          <TouchableOpacity
            key={`tab-${tabItem.value}`}
            style={[
              styles.tabContainer,
              {borderColor: isActive ? color.primary[500] : 'transparent'},
              tabStyle
            ]}
            onPress={() => onChange && onChange(tabItem.value)}
          >
            <Text style={[
              styles.tabTitle, 
              {color: isActive ? color.primary[500] : (darkMode ? color.neutral[100] : color.neutral[800])},
              {fontWeight: isActive ? 'bold' : '500'}
            ]}>{tabItem.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
};

export default Tab;