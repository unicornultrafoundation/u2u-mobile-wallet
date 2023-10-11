import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import { styles } from './styles';
import AddressStep from './AddressStep';
import AmountStep from './AmountStep';
import ConfirmStep from './ConfirmStep';
import AuthStep from './AuthStep';
import SendStep from './SendStep';

const SendTokenScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const navigation = useNavigation()

  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  const [step, setStep] = useState('address')

  const renderStep = () => {
    switch (step) {
      case 'address':
        return (
          <AddressStep
            onNextStep={() => setStep('amount')}
            onBack={navigation.goBack}
          />
        )
      case 'amount':
        return (
          <AmountStep
            onNextStep={() => setStep('confirm')}
            onBack={() => setStep('address')}
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
            onNextStep={() => setStep('send')}
            onBack={() => setStep('confirm')}
          />
        )
      case 'send':
        return (
          <SendStep />
        )
      default:
        return null
    }
  }

  return (
    <View style={[
      styles.container,
      {backgroundColor: preferenceTheme.background.background}
    ]}>
      {renderStep()}
    </View>
  )
};

export default SendTokenScreen;
