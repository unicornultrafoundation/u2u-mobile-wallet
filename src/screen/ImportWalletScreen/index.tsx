import React, { useState } from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useNavigation } from '@react-navigation/native';
import BACKGROUND from '../../asset/images/create_wallet_bg.png'
import Step1 from './Step1';
import Step2 from './Step2';
import { useLocalStore } from '../../state/local';
import Step3 from './Step3';
import Icon from '../../component/Icon';
import Steps from '../../component/Steps';
import { styles } from './styles';

const ImportWalletScreen = () => {
  const navigation = useNavigation<any>()
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  const { savePassword } = useLocalStore()

  const [currentStep, setCurrentStep] = useState(0)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleBack = () => {
    if (currentStep === 0) {
      navigation.goBack()
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    if (currentStep === 0) {
      return <Step1 onChange={setPassword} nextStep={() => setCurrentStep(1)} />
    } else if (currentStep === 1) {
      return (
        <Step2
          onChange={setConfirmPassword}
          password={password}
          nextStep={() => {
            savePassword(password)
            setCurrentStep(2)
          }}
        />
      )
    } else if (currentStep === 2) {
      return (
        <Step3 />
      )
    }
    return null
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: preferenceTheme.background.background,
      }}
    >
      <ImageBackground
        source={BACKGROUND}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
        }}
      >
        <View
          style={styles.header}
        >
          <TouchableOpacity onPress={handleBack}>
            <Icon name="arrow-left" />
          </TouchableOpacity>
          <Steps current={currentStep} steps={4} />
          <View />
        </View>
        {renderStep()}
      </ImageBackground>
    </View>
  )
};

export default ImportWalletScreen;
