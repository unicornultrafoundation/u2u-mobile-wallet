import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles';
import Text from '../Text';
import theme from '../../theme';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

const Scanner = ({onSuccess, onCancel}: {
  onSuccess: (val: string) => void
  onCancel: () => void
}) => {
  const {t} = useTranslation<string>()

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={(e) => {
          onSuccess(e.data)
        }}
        topContent={
          <Text style={[theme.typography.headline.medium, {paddingHorizontal: 24}]}>
            Scan QR code from {' '}
            <Text style={theme.typography.headline.bold}>U2U super app</Text>
          </Text>
        }
        bottomContent={
          <Button
            onPress={onCancel}
            style={{
              borderRadius: 60,
              flex: 1,
              paddingVertical: 8,
              marginHorizontal: 24,
              backgroundColor: preferenceTheme.background.surface
            }}
            textStyle={[
              theme.typography.label.medium,
              {
                color: preferenceTheme.text.disabled
              }
            ]}
          >
            {t('cancel')}
          </Button>
        }
      />
    </View>
  )
}

export default Scanner;
