import React from 'react'
import { usePreference } from '../../hook/usePreference'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles'
import theme from '../../theme'

export default function Toggle({isOn, onToggle}: {
  isOn: boolean;
  onToggle: () => void;
}) {
  const {preferenceTheme} = usePreference()
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.toggleContainer, {backgroundColor: preferenceTheme.background.surface}]}
    >
      <View style={[styles.toggleItem, {backgroundColor: isOn ? 'transparent' : theme.color.neutral[600]}]}>
        {/* <Icon name='sun' width={16} height={16} color={isOn ? preferenceTheme.text.placeholder : preferenceTheme.text.title} /> */}
      </View>
      <View style={[styles.toggleItem, {backgroundColor: isOn ? theme.color.primary[600] : 'transparent'}]}>
        {/* <Icon name='moon' width={16} height={16} color={isOn ? preferenceTheme.text.title : preferenceTheme.text.placeholder} /> */}
      </View>
    </TouchableOpacity>
  )
}