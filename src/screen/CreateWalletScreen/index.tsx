import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import BACKGROUND from '../../asset/images/create_wallet_bg.png'
import Icon from '../../component/Icon';
import OtpInputs from 'react-native-otp-inputs';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import Steps from '../../component/Steps';
import Text from '../../component/Text';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { useLocalStore } from '../../state/local';

const CreateWalletScreen = () => {
  const navigation = useNavigation<any>()
  const { t } = useTranslation();
  const {darkMode} = usePreferenceStore()
  const { savePassword } = useLocalStore()

  const preferenceTheme = darkMode ? darkTheme : lightTheme

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
        {/* Header section */}
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
}

export default CreateWalletScreen;
