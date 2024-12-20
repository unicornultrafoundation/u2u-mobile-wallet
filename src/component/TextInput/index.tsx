import React, { forwardRef, useState } from 'react';
import { TextInput as RNTextInput, StyleProp, View, ViewStyle } from 'react-native'
import { TextInputProps } from 'react-native'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import styles from './styles';
import theme from '../../theme';
import Icon from '../Icon';
import Text from '../Text';
import { usePreference } from '../../hook/usePreference';

interface Props extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>
  textWrapperStyle?: StyleProp<ViewStyle>
  placeholderTextColor?: string,
  error?: string
  postIcon?: () => JSX.Element
  preIcon?: () => JSX.Element
  insideModal?: boolean
}

const TextInput = (
  {style, textWrapperStyle, containerStyle, placeholderTextColor, error, postIcon, preIcon, insideModal = false, ...rest}: Props,
  ref: any
) => {

  const {preferenceTheme} = usePreference()

  const [focused, setFocused] = useState(false)

  const renderPostIcon = () => {
    if (error) {
      return <Icon name='error' width={18} height={18} />
    }
    return postIcon ? postIcon() : null
  }

  const renderPreIcon = () => {
    return preIcon ? preIcon() : null
  }

  return (
    <View 
      style={[
        containerStyle,
        {
          alignItems: 'center',
          justifyContent: 'center'
        }
      ]}
    >
      <View
        style={[
          textWrapperStyle,
          styles.container,
          {
            backgroundColor: preferenceTheme.background.surface,
            borderColor: focused ? theme.accentColor.primary.normal : preferenceTheme.background.surface,
            width: "100%"
          }
        ]}
      >
        {renderPreIcon()}
        {insideModal ? (
          <BottomSheetTextInput
            {...rest}
            onFocus={(e) => {
              setFocused(true)
              rest.onFocus && rest.onFocus(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              rest.onBlur && rest.onBlur(e)
            }}
            style={[
              // theme.typography.label.regular,
              {
                color: preferenceTheme.text.title,
                flex: 1
              },
              style
            ]}
            placeholderTextColor={preferenceTheme.text.placeholder}
            ref={ref}
          />
        ) : (
          <RNTextInput
            {...rest}
            ref={ref}
            onFocus={(e) => {
              setFocused(true)
              rest.onFocus && rest.onFocus(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              rest.onBlur && rest.onBlur(e)
            }}
            style={[
              // theme.typography.label.regular,
              {
                color: preferenceTheme.text.title,
                flex: 1
              },
              style
            ]}
            placeholderTextColor={placeholderTextColor ?? preferenceTheme.text.placeholder}
          />
        )}
        {renderPostIcon()}
      </View>
      {error && (
        <View style={{width: '100%', justifyContent: 'flex-start'}}>
          <Text
            style={[
              theme.typography.caption2.regular,
              {
                color: theme.accentColor.error.normal,
                marginTop: 6,
                marginLeft: 1
              }
            ]}
          >
            {error}
          </Text>
        </View>
      )}
    </View>
  )
};

export default forwardRef(TextInput);