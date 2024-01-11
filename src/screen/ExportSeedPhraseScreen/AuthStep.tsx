import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import OtpInputs from 'react-native-otp-inputs';
import { useLocalStore } from '../../state/local';
import Button from '../../component/Button';
import { usePreference } from '../../hook/usePreference';
import { APP_LOCK_TIME, APP_PASSWORD_RETRY_MAX } from '../../config/constant';
import { useGlobalStore } from '../../state/global';
import ErrorTextInput from '../../component/TextInput/ErrorTextInput';

const AuthStep = ({onNextStep, onBack}: {
  onNextStep: () => void;
  onBack: () => void;
}) => {
  const {t} = useTranslation<string>()
  const {preferenceTheme} = usePreference()

  const {password, increasePasswordTry, passwordTry, setPasswordTry, lockedUntil, setLockedUntil} = useLocalStore()
  const { setUnlocked } = useGlobalStore()

  const [internalPassword, setInternalPassword] = useState('')
  const [error, setError] = useState('')

  const handleContinue = () => {
    setError('')

    if (Date.now() <= lockedUntil) {
      setError(t('passwordRetryReached'))
      return
    }

    if (internalPassword != password) {
      if (passwordTry >= APP_PASSWORD_RETRY_MAX) {
        setUnlocked(false)
        setError(t('passwordRetryReached'))
        setLockedUntil(Date.now() + APP_LOCK_TIME)
        return
      }

      setError(t('incorrectPassword'))
      increasePasswordTry()
      return
    }

    setPasswordTry(0)
    setLockedUntil(0)
    onNextStep()
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>{t('enterPassword')}</Text>
        </View>
        <View />
      </View>

      <View style={styles.bodyContainer}>
        <View>
          <Text
            style={[
              theme.typography.caption2.medium,
              {
                color: preferenceTheme.text.secondary,
                textAlign: 'center',
                marginHorizontal: 16,
                marginTop: 8,
                marginBottom: 42
              }
            ]}
          >
            {t('enterPasswordToContinue')}
          </Text>
          <OtpInputs
            autofillFromClipboard={false}
            handleChange={setInternalPassword}
            numberOfInputs={6}
            autoFocus={true}
            keyboardType={"numeric" as any}
            secureTextEntry={true}
            style={styles.otpContainer}
            inputStyles={styles.otpInput}
          />
          {error && <ErrorTextInput error={error} style={{justifyContent: 'center', marginVertical: 10}}/>}
        </View>

        <Button
          style={{borderRadius: 60}}
          textStyle={theme.typography.label.medium}
          onPress={handleContinue}
        >
          {t('continue')}
        </Button>
      </View>
    </View>
  )
}

export default AuthStep;
