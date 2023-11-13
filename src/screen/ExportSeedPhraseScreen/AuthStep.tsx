import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import OtpInputs from 'react-native-otp-inputs';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useLocalStore } from '../../state/local';
import Button from '../../component/Button';

const AuthStep = ({onNextStep, onBack}: {
  onNextStep: () => void;
  onBack: () => void;
}) => {
  const {t} = useTranslation<string>()
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {password} = useLocalStore()

  const [internalPassword, setInternalPassword] = useState('')
  const [error, setError] = useState('')

  const handleContinue = () => {
    setError('')
    if (internalPassword != password) {
      setError(t('incorrectPassword'))
      return
    }

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