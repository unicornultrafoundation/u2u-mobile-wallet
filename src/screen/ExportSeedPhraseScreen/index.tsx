import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import AuthStep from './AuthStep';
import ShowSeedStep from './ShowSeedStep';
import { handleGoBack } from '../../util/navigation';

const ExportSeedPhraseScreen = () => {
  const navigation = useNavigation<any>()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [step, setStep] = useState('auth')

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
            onNextStep={() => setStep('show-seed')}
            onBack={() => handleGoBack(navigation)}
          />
        )
      case 'show-seed':
        return (
          <ShowSeedStep
            onBack={() => handleGoBack(navigation)}
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
