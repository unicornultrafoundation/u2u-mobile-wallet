import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import SetAmountStepHeader from './SetAmountStepHeader';
import Text from '../../component/Text';
import theme from '../../theme';
import Button from '../../component/Button';
import { parseNumberFormatter } from '../../util/string';
import { getPhonePaddingBottom } from '../../util/platform';
import { usePreference } from '../../hook/usePreference';

const SetAmountStep = ({handleBack, setAmount, amount, tokenMeta}: {
  handleBack: () => void
  amount: string
  setAmount: (newAmount: string) => void
  tokenMeta: Record<string, any>
}) => {
  const {preferenceTheme} = usePreference()

  const [internalAmount, setInternalAmount] = useState(amount)

  return (
    <KeyboardAvoidingView 
      style={{flex: 1, paddingBottom: getPhonePaddingBottom()}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={24}
    >
      <SetAmountStepHeader handleBack={handleBack} />
      <View style={{flex: 1, paddingHorizontal: 16, justifyContent: 'space-between'}}>
        <View style={{
          paddingHorizontal: 16, 
          marginTop: 50, 
          alignItems: 'center', 
          flexDirection: 'row', 
          justifyContent: 'center',
        }}>
          <View style={{flexWrap: 'nowrap', flexShrink: 1}}>
            <TextInput
              onChangeText={(val) => {
                const newVal = parseNumberFormatter(val.replaceAll(",", "."))
                if (newVal != null) {
                  setInternalAmount(newVal)
                }
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
          </View>
          <Text style={theme.typography.largeTitle.medium}>{tokenMeta.symbol}</Text>
        </View>
        <Button
          style={{borderRadius: 60}}
          textStyle={theme.typography.label.medium}
          onPress={() => {
            setAmount(internalAmount)
            handleBack()
          }}
        >
          Confirm
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
};

export default SetAmountStep;
