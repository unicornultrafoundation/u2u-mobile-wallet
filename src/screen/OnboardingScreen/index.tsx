import React from 'react'
import { useTranslation } from 'react-i18next';
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import { styles } from './styles';
import Button from '../../component/Button';
import Text from '../../component/Text';
import theme from '../../theme';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import BACKGROUND from '../../asset/images/onboarding_bg.png'
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation<any>()
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
      <ImageBackground
        source={BACKGROUND}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
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
            {t('helloU2U')},
          </Text>
          <Text
            style={{
              fontSize: 17,
              lineHeight: 22,
              letterSpacing: -0.41,
              textAlign: 'center'
            }}
          >
            {t('welcomeU2U')}.{"\n"}
            {t('continueCreateWalletImport')}
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
            onPress={() => {
              navigation.navigate('CreateWallet')
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
            {t('alreadyHaveAccount')}
          </Button>
        </View>
      </ImageBackground>
    </View>
  )
}

export default OnboardingScreen