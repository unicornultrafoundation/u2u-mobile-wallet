import React from 'react'
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import styles from './styles';
import { darkTheme, lightTheme } from '../../theme/color';
import { usePreferenceStore } from '../../state/preferences';
import theme from '../../theme';

interface TabTitle {
  label: string;
  value: string;
}
interface TabProps {
  selectedTab?: string;
  onChange?: (newTab: string) => void;
  tabs: TabTitle[];
  tabStyle?: ViewStyle,
  tabTextStyle?: StyleProp<TextStyle>
  containerStyle?: ViewStyle
}

const Tab = ({selectedTab, onChange, tabs, tabStyle, tabTextStyle, containerStyle}: TabProps) => {
  const {darkMode} = usePreferenceStore();

  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={[styles.container, containerStyle]}>
      {tabs.map((tabItem) => {
        const isActive = selectedTab === tabItem.value
        return (
          <TouchableOpacity
            key={`tab-${tabItem.value}`}
            style={[
              styles.tabContainer,
              {borderColor: isActive ? theme.color.primary[500] : 'transparent'},
              tabStyle
            ]}
            onPress={() => onChange && onChange(tabItem.value)}
          >
            <Text style={[
              styles.tabTitle, 
              {color: isActive ? preferenceTheme.text.title : theme.color.neutral[500]},
              {fontWeight: isActive ? 'bold' : '500'},
              tabTextStyle
            ]}>{tabItem.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
};

export default Tab;