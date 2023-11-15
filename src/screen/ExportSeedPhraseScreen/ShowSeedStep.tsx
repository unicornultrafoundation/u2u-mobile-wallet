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

const ShowSeedStep = ({onBack}: {
  onBack: () => void
}) => {
  const {wallet} = useWallet()
  const {t} = useTranslation<string>()

  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const handleCopy = () => {
    Clipboard.setString(wallet.mnemonic);
    Toast.show({
      type: "simpleNoti",
      text1: "Copied to clipboard",
      props: {
        width: '45%'
      }
    })
  }

  return (
    <View style={{flex: 1, padding: 16}}>
      <Text style={styles.welcomeTitle}>
        {t('recoveryPhrase')}
      </Text>
      <Text style={styles.instructionText}>
        {t('phraseWarning')}
      </Text>
      <Text style={styles.instructionText}>
        {t('phraseDescription')}
      </Text>
      <View style={{width: '100%', flex: 1}}>
        <View style={[styles.seedContainer, {backgroundColor: preferenceTheme.background.background}]}>
          {wallet.mnemonic.length === 0 ? (
            <ActivityIndicator />
          ) : (
            <View style={{ width: '100%' }}>
              <View style={{width: '100%', flexDirection: 'row' }}>
                {wallet.mnemonic.split(" ").slice(0, 4).map((word, index) => {
                  return (
                    <View style={{padding: 8, width: "25%"}} key={`seed-${word}-${index}`}>
                      <Text style={styles.seed}>{word}</Text>
                    </View>
                  )
                })}
              </View>
              <View style={{width: '100%', flexDirection: 'row' }}>
                {wallet.mnemonic.split(" ").slice(4, 8).map((word, index) => {
                  return (
                    <View style={{padding: 8, width: "25%"}} key={`seed-${word}-${index}`}>
                      <Text style={styles.seed}>{word}</Text>
                    </View>
                  )
                })}
              </View>
              <View style={{width: '100%', flexDirection: 'row' }}>
                {wallet.mnemonic.split(" ").slice(8, 12).map((word, index) => {
                  return (
                    <View style={{padding: 8, width: "25%"}} key={`seed-${word}-${index}`}>
                      <Text style={styles.seed}>{word}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          )}
        </View>
        {wallet.mnemonic.length > 0 && (
          <Button
            type='text'
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: 12,
              paddingHorizontal: 8
            }}
            textStyle={{
              color: theme.color.neutral[0]
            }}
            onPress={handleCopy}
          >
            <Icon name='copy' width={16} height={16} style={{marginRight: 2}} />
            Copy to clipboard
          </Button>
        )}
      </View>
      {wallet.mnemonic.length > 0 && (
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
