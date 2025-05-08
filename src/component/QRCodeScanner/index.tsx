import React, { useCallback, useRef, useState } from 'react'
import { View, StyleSheet, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import styles from './styles';
import Text from '../Text';
import theme from '../../theme';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { usePreference } from '../../hook/usePreference';

const Scanner = ({onSuccess, onCancel, topContent}: {
  onSuccess: (val: string) => void
  onCancel: () => void
  topContent?: React.JSX.Element
}) => {
  const {t} = useTranslation<string>()
  const {preferenceTheme} = usePreference()
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = useCallback((result: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      onSuccess(result.data);
    }
  }, [onSuccess, scanned]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[theme.typography.body.medium, { textAlign: 'center', marginBottom: 16 }]}>
          {t('We need your permission to use the camera')}
        </Text>
        <Button onPress={requestPermission} style={{ borderRadius: 60, paddingVertical: 12, paddingHorizontal: 40 }}>
          {t('grant permission')}
        </Button>
        <Button
          onPress={onCancel}
          style={{
            borderRadius: 60,
            paddingVertical: 12,
            paddingHorizontal: 40,
            marginTop: 16,
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {topContent || (
        <Text style={[theme.typography.headline.medium, {paddingHorizontal: 24}]}>\n          Scan QR code for {' '}
          <Text style={theme.typography.headline.bold}>U2U super app</Text>
        </Text>
      )}
      <CameraView
        style={{ flex: 1, width: '100%' }}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={handleBarCodeScanned}
      />
      <Button
        onPress={onCancel}
        style={{
          borderRadius: 60,
          paddingVertical: 12,
          paddingHorizontal: 40,
          marginHorizontal: 48,
          marginTop: 16,
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
    </View>
  )
}

export default Scanner;
