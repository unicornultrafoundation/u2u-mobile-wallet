import React from 'react';
import OtpInputs from 'react-native-otp-inputs';
import { styles } from './styles';
import { View } from 'react-native';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';

const Step1 = ({onChange, nextStep}: {
  onChange: (newPassword: string) => void;
  nextStep: () => void;
}) => {
  const { t } = useTranslation<string>()
  const handleChange = (code: string) => {
    if (code.length === 6) {
      onChange(code)
      nextStep()
    }
  }

  return (
    <View style={styles.passwordContainer}>
      <Text style={styles.welcomeTitle}>
        {t('welcomeWallet')}
      </Text>
      <Text style={styles.instructionText}>
        {t('setupAppPassword')}
      </Text>
      <OtpInputs
        autofillFromClipboard={false}
        handleChange={handleChange}
        autoFocus={true}
        numberOfInputs={6}
        keyboardType={"numeric" as any}
        secureTextEntry={true}
        style={styles.otpContainer}
        inputStyles={styles.otpInput}
      />
    </View>
  )
};

export default Step1