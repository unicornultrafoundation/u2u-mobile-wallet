import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles';
import Text from '../Text';
import theme from '../../theme';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { usePreference } from '../../hook/usePreference';

const Scanner = ({onSuccess, onCancel}: {
  onSuccess: (val: string) => void
  onCancel: () => void
}) => {
  const {t} = useTranslation<string>()

  const {preferenceTheme} = usePreference()

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={(e) => {
          onSuccess(e.data)
        }}
        topContent={
          <Text style={[theme.typography.headline.medium, {paddingHorizontal: 24}]}>
            Scan QR code for {' '}
            <Text style={theme.typography.headline.bold}>U2U super app</Text>
          </Text>
        }
        bottomContent={
          <Button
            onPress={onCancel}
            style={{
              borderRadius: 60,
              paddingVertical: 12,
              paddingHorizontal: 40,
              marginHorizontal: 48,
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
