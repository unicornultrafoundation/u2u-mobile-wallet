import React from 'react'
import { usePreference } from '../../hook/usePreference'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles'
import theme from '../../theme'
import Icon from '../Icon'

export default function DarkModeToggle() {
  const {preferenceTheme, toggleDarkMode, darkMode} = usePreference()

  return (
    <TouchableOpacity
      onPress={toggleDarkMode}
      style={[styles.toggleContainer, {backgroundColor: preferenceTheme.background.surface}]}
    >
      <View style={[styles.toggleItem, {backgroundColor: darkMode ? 'transparent' : theme.color.primary[600]}]}>
        <Icon name='sun' width={16} height={16} color={darkMode ? preferenceTheme.text.placeholder : preferenceTheme.text.title} />
      </View>
      <View style={[styles.toggleItem, {backgroundColor: darkMode ? theme.color.primary[600] : 'transparent'}]}>
        <Icon name='moon' width={16} height={16} color={darkMode ? preferenceTheme.text.title : preferenceTheme.text.placeholder} />
      </View>
    </TouchableOpacity>
  )
}