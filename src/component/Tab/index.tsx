import React, { useEffect, useState } from 'react'
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
  scrollTo?: Function
}

const Tab = ({selectedTab, onChange, tabs, tabStyle, tabTextStyle, containerStyle, scrollTo}: TabProps) => {
  const {darkMode} = usePreferenceStore();

  const preferenceTheme = darkMode ? darkTheme : lightTheme
  const [coordinatesX, setCoordinatesX] = useState<number[]>([])

  useEffect(() => {
    // Handle scroll when tabs list is wider than window width
    const selectedIndex = tabs.findIndex(tab => tab.value === selectedTab)
    if (selectedIndex < 0) return
    scrollTo && setTimeout(() => {
        scrollTo({
          x: coordinatesX[selectedIndex],
          y: 0,
          animated: true
        })
    }, 10)
  }, [selectedTab, coordinatesX])

  return (
    <View style={[styles.container, containerStyle]}>
      {tabs.map((tabItem, index) => {
        const isActive = selectedTab === tabItem.value
        return (
          <TouchableOpacity
            onLayout={event => {
              const layout = event.nativeEvent.layout
              coordinatesX[index] = layout.x
              setCoordinatesX(coordinatesX)
            }}
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
              {fontWeight: isActive ? '700' : '500'},
              tabTextStyle
            ]}>{tabItem.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
};

export default Tab;