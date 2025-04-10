import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from '@/component/Icon';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import Text from '@/component/Text';
import OtpInputs from 'react-native-otp-inputs';
import theme from '@/theme';
import Button from '@/component/Button';
import { useLocalStore } from '@/state/local';
import { usePreference } from '@/hook/usePreference';
import { getPhonePaddingBottom } from '@/util/platform';
import { useGlobalStore } from '@/state/global';
import { APP_LOCK_TIME, APP_PASSWORD_RETRY_MAX } from '@/config/constant';
import ErrorTextInput from '@/component/TextInput/ErrorTextInput';

const AuthStep = ({onNextStep, onBack}: {
  onNextStep: () => void;
  onBack: () => void;
}) => {
  const {preferenceTheme} = usePreference()

  const { t } = useTranslation<string>()
  const {password, increasePasswordTry, passwordTry, setPasswordTry, lockedUntil, setLockedUntil} = useLocalStore()
  const { setUnlocked } = useGlobalStore()

  const [internalPassword, setInternalPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        style={{
          // flex: 1,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: preferenceTheme.background.background,
          padding: 16
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={24}
      >
        <View>
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
              {t('msgPleaseInputSecurityPasswordToConfirmTransaction')}
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
            style={{borderRadius: 60, marginBottom: 8}}
            textStyle={theme.typography.label.medium}
            onPress={handleContinue}
            loading={loading}
          >
            {t('continue')}
          </Button>

          <TouchableOpacity
            style={{ width: '100%', alignItems: 'center' }}
            onPress={onBack}>
            <Text type="label-medium" color="disabled">
              {t('cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
};

export default AuthStep;
