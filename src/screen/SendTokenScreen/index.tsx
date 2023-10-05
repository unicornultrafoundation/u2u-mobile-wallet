import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import { styles } from './styles';
import AddressStep from './AddressStep';
import AmountStep from './AmountStep';

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
