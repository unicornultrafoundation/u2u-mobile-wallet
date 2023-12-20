import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native';
import { styles } from './styles';
import { useLocalStore } from '../../state/local';
import BACKGROUND from '../../asset/images/create_wallet_bg.png'
import OtpInputs from 'react-native-otp-inputs';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import theme from '../../theme';
import { useGlobalStore } from '../../state/global';
import { useTranslation } from 'react-i18next';
import { usePreference } from '../../hook/usePreference';
import { APP_PASSWORD_RETRY_MAX } from '../../config/constant';

const AuthScreen = () => {
  const {preferenceTheme} = usePreference()

  const {t} = useTranslation<string>()

  const {password, increasePasswordTry, passwordTry, setPasswordTry, lockedUntil, setLockedUntil} = useLocalStore()
  const {setUnlocked} = useGlobalStore()
  const [error, setError] = useState('')

  const handleContinue = (pass: string) => {
    setError('')

    if (Date.now() <= lockedUntil) {
      setError(t('passwordRetryReached'))
      return
    }

    if (pass != password) {
      if (passwordTry >= APP_PASSWORD_RETRY_MAX) {
        setUnlocked(false)
        setError(t('passwordRetryReached'))
        return
      }

      setError(t('incorrectPassword'))
      increasePasswordTry()
      return
    }

    setTimeout(() => {
      setPasswordTry(0)
      setLockedUntil(0)
      setUnlocked(true)
    }, 100)
  }

  return (
    <ImageBackground
      source={BACKGROUND}
      resizeMode="cover"
      style={[
        styles.container,
      ]}
    >
      <Text
        style={[
          theme.typography.title3.bold,
          {
            color: preferenceTheme.text.title
          }
        ]}
      >
        {t('welcomeBack')}!
      </Text>
      <Text
        style={[
          theme.typography.subheadline.regular,
          {
            color: preferenceTheme.text.secondary,
            marginBottom: 22
          }
        ]}
      >
        {t('unlockWithPassword')}
      </Text>
      <OtpInputs
        autofillFromClipboard={false}
        handleChange={(value) => {
          if (value.length === 6) {
            handleContinue(value)
          }
        }}
        numberOfInputs={6}
        autoFocus={true}
        keyboardType={"numeric" as any}
        secureTextEntry={true}
        autoCapitalize="none"
        style={styles.otpContainer}
        inputStyles={styles.otpInput}
      />
      {passwordTry === APP_PASSWORD_RETRY_MAX && (
        <View style={{flexDirection: 'row', paddingBottom: 8, alignItems: 'center'}}>
          <Icon name='error' width={18} height={18} />
          <Text style={[
            theme.typography.caption2.regular,
            {
              color: theme.accentColor.error.normal,
              paddingLeft: 4
            }
          ]}>
            {t('passwordRetryReached')}
          </Text>
        </View>
      )}
      {error && passwordTry !== APP_PASSWORD_RETRY_MAX && (
        <View style={{flexDirection: 'row', paddingBottom: 8, alignItems: 'center'}}>
          <Icon name='error' width={18} height={18} />
          <Text style={[
            theme.typography.caption2.regular,
            {
              color: theme.accentColor.error.normal,
              paddingLeft: 4
            }
          ]}>
            {error}
          </Text>
        </View>
      )}
      {passwordTry >= 3 && passwordTry !== APP_PASSWORD_RETRY_MAX && (
        <View style={{flexDirection: 'row', paddingBottom: 8, alignItems: 'center'}}>
        {/* <Icon name='error' width={18} height={18} /> */}
        <Text style={[
          theme.typography.caption2.regular,
          {
            color: theme.accentColor.error.normal,
            paddingLeft: 4
          }
        ]}>
          Retry left: {APP_PASSWORD_RETRY_MAX - passwordTry}
        </Text>
      </View>
      )}
    </ImageBackground>
  )
};

export default AuthScreen;
