import React, { useState } from 'react';
import OtpInputs from 'react-native-otp-inputs';
import { styles } from './styles';
import { View } from 'react-native';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';
import ErrorTextInput from '../../component/TextInput/ErrorTextInput';

const Step2 = ({password, nextStep}: {
  password: string;
  nextStep: () => void;
}) => {
  const { t } = useTranslation<string>();
  const [error, setError] = useState("");

  const handleChange = (code: string) => {
    if (code.length === 6) {
      if (password === code) {
        setError("")
        nextStep()
        return
      }
      setError("passConfirmNotMatch")
    }
  }

  return (
    <View style={styles.passwordContainer}>
      <Text style={styles.welcomeTitle}>
        {t('confirmPasswordTitle')}
      </Text>
      <Text style={styles.instructionText}>
        {t('confirmDescription')}
      </Text>
      <OtpInputs
        autofillFromClipboard={false}
        handleChange={handleChange}
        numberOfInputs={6}
        autoFocus={true}
        keyboardType={"numeric" as any}
        secureTextEntry={true}
        style={styles.otpContainer}
        inputStyles={styles.otpInput}
      />
      {error && <ErrorTextInput error={t(error)} style={{justifyContent: 'center', marginVertical: 10}}/>}
    </View>
  )
};

export default Step2