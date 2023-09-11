import React from 'react'
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native'

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={{flex: 1}}>
      <Text>Home screen {t('appName')}</Text>
    </View>
  )
}

export default HomeScreen