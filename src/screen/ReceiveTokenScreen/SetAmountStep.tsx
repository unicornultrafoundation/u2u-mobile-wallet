import React, { useState } from 'react'
import { TextInput, View } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import SetAmountStepHeader from './SetAmountStepHeader';
import Text from '../../component/Text';
import theme from '../../theme';
import Button from '../../component/Button';
import { getDigit, parseFormatedNumberInput } from '../../util/string';

const SetAmountStep = ({handleBack, setAmount, amount}: {
  handleBack: () => void
  amount: string
  setAmount: (newAmount: string) => void
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const [internalAmount, setInternalAmount] = useState(parseFormatedNumberInput(amount))

  return (
    <View style={[
      styles.container,
      {backgroundColor: preferenceTheme.background.background}
    ]}>
      <SetAmountStepHeader handleBack={handleBack} />
      <View style={{flex: 1, paddingHorizontal: 16, justifyContent: 'space-between'}}>
        <View style={{paddingVertical: 16, marginTop: 36, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            onChangeText={(val) => {
              setInternalAmount(parseFormatedNumberInput(val))
            }}
            value={internalAmount}
            keyboardType="numeric"
            style={[
              theme.typography.largeTitle.medium,
              {
                marginRight: 4,
                color: preferenceTheme.text.title
              }
            ]}
          />
          <Text style={theme.typography.largeTitle.medium}>U2U</Text>
        </View>
        <Button
          style={{borderRadius: 60}}
          textStyle={theme.typography.label.medium}
          onPress={() => {
            setAmount(getDigit(internalAmount))
            handleBack()
          }}
        >
          Confirm
        </Button>
      </View>
    </View>
  )
};

export default SetAmountStep;