import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { styles } from './styles';
import { useLocalStore } from '../../state/local';
import BACKGROUND from '../../asset/images/create_wallet_bg.png'
import OtpInputs from 'react-native-otp-inputs';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import theme from '../../theme';
import Button from '../../component/Button';
import { useGlobalStore } from '../../state/global';
import { useTranslation } from 'react-i18next';

const AuthScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {t} = useTranslation<string>()

  const {password} = useLocalStore()
  const {toggleUnlocked} = useGlobalStore()

  const [internalPassword, setInternalPassword] = useState('')
  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleContinue = () => {
    setError('')
    if (internalPassword != password) {
      setError('Incorrect password')
      return
    }
    setLoading(true)
    setTimeout(() => {
      toggleUnlocked()
      setLoading(false)
    }, 100)
  }

  useEffect(() => {
    if (internalPassword.length === 6) {
      handleContinue()
    }
  }, [internalPassword])

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
        handleChange={setInternalPassword}
        numberOfInputs={6}
        autoFocus={true}
        keyboardType="phone-pad"
        secureTextEntry={true}
        style={styles.otpContainer}
        inputStyles={styles.otpInput}
      />
      {error && (
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
    </ImageBackground>
  )
};

export default AuthScreen;
