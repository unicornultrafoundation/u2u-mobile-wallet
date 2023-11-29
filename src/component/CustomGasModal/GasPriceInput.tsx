import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import styles from './styles';
import theme from '../../theme';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import Text from '../Text';
import { useTransaction } from '../../hook/useTransaction';
import { getDigit, parseNumberFormatter } from '../../util/string';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';

const GasPriceInput = () => {
  const {darkMode} = usePreferenceStore()
  const {t} = useTranslation()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {gasPrice, setGasPrice} = useTransaction()
  const [focused, setFocused] = useState(false)

  const parsedGasPrice = useMemo(() => {
    return BigNumber(gasPrice).dividedBy(10 ** 18).toFormat().replaceAll(',', '')
  }, [gasPrice])

  const [internalValue, setInternalValue] = useState(parsedGasPrice)

  useEffect(() => {
    const digit = getDigit(internalValue)
    setGasPrice(
      BigNumber(digit).multipliedBy(10 ** 18).toString()
    )
  }, [internalValue])

  return (
    <View style={{alignItems: 'flex-start', width: '100%', gap: 3}}>
      <Text
        style={[
          theme.typography.footnote.regular,
          {
            marginBottom: 4,
            color: preferenceTheme.text.secondary
          }
        ]}
      >
        {t('gasPriceInU2U')}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: preferenceTheme.background.surface,
            borderColor: focused ? theme.accentColor.primary.normal : preferenceTheme.outline,
          },
        ]}
      >
        <BottomSheetTextInput
          style={[
            theme.typography.body.regular,
            {
              color: preferenceTheme.text.title,
              flex: 1
            },
          ]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={(val) => {
            // setInternalValue(parseFormatedNumberInput(val.replaceAll(",", ".")))
            const newVal = parseNumberFormatter(val.replaceAll(",", "."))
            if (newVal != null) {
              setInternalValue(newVal)
            }
          }}
          keyboardType="numeric"
          value={internalValue}
        />
      </View>
    </View>
  )
}

export default GasPriceInput;
