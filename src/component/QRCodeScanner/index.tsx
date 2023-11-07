import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles';
import Text from '../Text';
import theme from '../../theme';

const Scanner = ({onSuccess, onCancel}: {
  onSuccess: (val: string) => void
  onCancel: () => void
}) => {

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={(e) => {
          onSuccess(e.data)
        }}
        topContent={
          <Text style={theme.typography.headline.medium}>
            Go to{' '}
            <Text style={theme.typography.headline.bold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity onPress={onCancel}>
            <Text style={theme.typography.caption2.medium}>Cancel</Text>
          </TouchableOpacity>
        }
      />
    </View>
  )
}

export default Scanner;
