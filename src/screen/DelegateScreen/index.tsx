import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { styles } from './styles';
import Icon from '../../component/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Validator } from '../../service/staking';
import AmountStep from './AmountStep';
import ConfirmStep from './ConfirmStep';
import AuthStep from './AuthStep';
import DelegateStep from './DelegateStep';

const DelegateScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const navigation = useNavigation<any>()
  const route = useRoute<any>()

  const validator: Validator = route.params?.validator || {}

  const [step, setStep] = useState('amount')

  const renderStep = () => {
    console.log('step', step)
    switch (step) {
      case 'amount':
        return (
          <AmountStep
            onNextStep={() => setStep('confirm')}
            onBack={() => navigation.goBack()}
            validator={validator}
          />
        )
      case 'confirm':
        return (
          <ConfirmStep
            onNextStep={() => setStep('auth')}
            onBack={() => setStep('amount')}
          />
        )
      case 'auth':
        return (
          <AuthStep
            onNextStep={() => setStep('delegate')}
            onBack={() => setStep('confirm')}
          />
        )
      case 'delegate':
        return (
          <DelegateStep />
        )
      default:
        return null
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
    >
      {renderStep()}
    </View>
  )
}

export default DelegateScreen;
