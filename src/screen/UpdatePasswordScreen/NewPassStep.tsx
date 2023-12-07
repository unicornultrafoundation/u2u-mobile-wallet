import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import Button from '../../component/Button';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import theme from '../../theme';
import OtpInputs from 'react-native-otp-inputs';
import { usePreference } from '../../hook/usePreference';

const NewPassStep = ({onNextStep, onBack, savePassword}: {
  onNextStep: () => void;
  onBack: () => void;
  savePassword: (pass: string) => void
}) => {
  const {t} = useTranslation<string>()
  const {preferenceTheme} = usePreference()

  const [internalPassword, setInternalPassword] = useState('')

  const handleContinue = () => {
    savePassword(internalPassword)
    onNextStep()
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>{t('enterNewPassword')}</Text>
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
            {t('enterNewPassword')}
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

export default NewPassStep;
