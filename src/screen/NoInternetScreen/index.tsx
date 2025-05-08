import React from 'react'
import { SafeAreaView, Image } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';
import { usePreference } from '../../hook/usePreference';
import { typography } from '../../theme/typography';
import NO_INTERNET from '../../asset/images/no_internet.png'

const NoInternetScreen = () => {
  const { t } = useTranslation()
  const { preferenceTheme } = usePreference()
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
    >
      <Text
        style={[
          typography.title3.bold,
          {
            color: preferenceTheme.text.primary,
            marginBottom: 44
          }
        ]}
      >
        {t('noInternetConnection')}
      </Text>
      <Image
        source={NO_INTERNET}
        resizeMode="contain"
        width={100}
        height={124}
        style={{
          width: 100,
          height: 124,
        }}
      />
    </SafeAreaView>
  )
}

export default NoInternetScreen;
