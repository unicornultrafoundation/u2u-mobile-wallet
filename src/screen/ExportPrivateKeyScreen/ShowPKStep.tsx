import React from 'react'
import { ActivityIndicator, View } from 'react-native';
import { useWallet } from '../../hook/useWallet';
import Text from '../../component/Text';
import Button from '../../component/Button';
import { useTranslation } from 'react-i18next';
import Icon from '../../component/Icon';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import theme from '../../theme';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { styles } from './styles';
import { Wallet } from '../../state/wallet';

const ShowSeedStep = ({onBack, wallet}: {
  onBack: () => void;
  wallet: Wallet
}) => {
  const {t} = useTranslation<string>()

  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const handleCopy = () => {
    Clipboard.setString(wallet.privateKey);
    Toast.show({
      type: "simpleNoti",
      text1: t('msgCopied'),
      props: {
        width: '45%'
      }
    })
  }

  return (
    <View style={{flex: 1, padding: 16}}>
      <Text style={styles.welcomeTitle}>
        {t('showPKTitle')}
      </Text>
      <Text style={styles.instructionText}>
        {t('pkWarning')}
      </Text>
      <View style={{width: '100%', flex: 1}}>
        <View style={[styles.seedContainer, {backgroundColor: preferenceTheme.background.background}]}>
          {wallet.privateKey.length === 0 ? (
            <ActivityIndicator />
          ) : (
            <View style={{ width: '100%' }}>
              <View style={{width: '100%', flexDirection: 'row' }}>
                <Text style={styles.seed}>{wallet.privateKey}</Text>
              </View>
            </View>
          )}
        </View>
        {wallet.privateKey.length > 0 && (
          <Button
            type="text"
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 12,
              paddingHorizontal: 8
            }}
            textStyle={{
              color: theme.color.neutral[0]
            }}
            onPress={handleCopy}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="copy" width={16} height={16} style={{ marginRight: 4 }} />
              <Text style={{ fontWeight: "500", fontSize: 14 }}>Copy to clipboard</Text>
            </View>
          </Button>
        )}
      </View>
      {wallet.privateKey.length > 0 && (
        <Button
          fullWidth
          style={{
            borderRadius: 60
          }}
          onPress={onBack}
        >
          {t('confirm')}
        </Button>
      )}
    </View>
  )
}

export default ShowSeedStep;
