import React from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native'
import { styles } from './styles';
import Button from '../../component/Button';
import Text from '../../component/Text';
import theme from '../../theme';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

const OnboardingScreen = () => {
  const { t } = useTranslation();
  const {darkMode} = usePreferenceStore()

  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: preferenceTheme.background.background,
      }}
    >
      <View style={styles.topContainer}>
        <Text
          style={{
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.41,
            fontWeight: 'bold'
          }}
        >
          Hello Uniceran,
        </Text>
        <Text
          style={{
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.41,
            textAlign: 'center'
          }}
        >
          Welcome to Unicorn Ultra Ecosystem.{"\n"}
          To continue, please Create New Wallet or Import your seed phrase
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 11,
            lineHeight: 13,
            letterSpacing: 0.07
          }}
        >
          By using U2U wallet, you agree to the Terms and Privacy Policy
        </Text>
        <Button
          fullWidth
          style={{
            borderRadius: 60,
            backgroundColor: theme.color.neutral[0],
            marginVertical: 12
          }}
          textStyle={{
            color: theme.color.neutral[600]
          }}
        >
          {t('createNewWallet')}
        </Button>
        <Button
          type='text'
          textStyle={{
            color: preferenceTheme.text.title
          }}
        >
          Already have an account
        </Button>
      </View>
    </View>
  )
}

export default OnboardingScreen