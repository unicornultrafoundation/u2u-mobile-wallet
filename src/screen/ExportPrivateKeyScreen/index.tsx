import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import AuthStep from './AuthStep';
import ShowPKStep from './ShowPKStep';
import { Wallet } from '../../state/wallet';
import { handleGoBack } from '../../util/navigation';

const ExportPrivateKeyScreen = () => {
  const navigation = useNavigation<any>()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [step, setStep] = useState('auth')

  const route = useRoute<any>()
  const {setRouteName} = useGlobalStore()

  const wallet: Wallet = route.params?.wallet

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  const renderStep = () => {
    switch (step) {
      case 'auth':
        return (
          <AuthStep
            onNextStep={() => setStep('show-pk')}
            onBack={() => handleGoBack(navigation)}
          />
        )
      case 'show-pk':
        return (
          <ShowPKStep
            onBack={() => handleGoBack(navigation)}
            wallet={wallet}
          />
        )
      default:
        return null
    }
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={24}
    >
      {renderStep()}
    </KeyboardAvoidingView>
  )
}

export default ExportPrivateKeyScreen;
