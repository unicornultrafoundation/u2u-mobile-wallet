import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { styles } from './styles'
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import AuthStep from './AuthStep';
import NewPassStep from './NewPassStep';
import ConfirmStep from './ConfirmStep';
import { handleGoBack } from '../../util/navigation';

const ExportSeedPhraseScreen = () => {
  const navigation = useNavigation<any>()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [step, setStep] = useState('auth')
  const [passwordToConfirm, setPasswordToConfirm] = useState('')

  const route = useRoute()
  const {setRouteName} = useGlobalStore()

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
            onNextStep={() => setStep('new-pass')}
            onBack={() => handleGoBack(navigation)}
          />
        )
      case 'new-pass':
        return (
          <NewPassStep
            savePassword={setPasswordToConfirm}
            onNextStep={() => setStep('confirm-pass')}
            onBack={() => handleGoBack(navigation)}
          />
        )
      case 'confirm-pass':
        return (
          <ConfirmStep
            passwordToConfirm={passwordToConfirm}
            onBack={() => setStep('new-pass')}
            onNextStep={() => handleGoBack(navigation)}
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

export default ExportSeedPhraseScreen;
