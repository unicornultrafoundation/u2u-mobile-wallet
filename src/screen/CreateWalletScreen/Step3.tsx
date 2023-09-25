import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
import { styles } from './styles'
import Text from '../../component/Text'
import { useTranslation } from 'react-i18next'
import { usePreferenceStore } from '../../state/preferences'
import { darkTheme, lightTheme } from '../../theme/color'
import { generateMnemonic } from '../../util/wallet'
import Button from '../../component/Button'
import { useWallet } from '../../hook/useWallet'
import Icon from '../../component/Icon'
import theme from '../../theme'

const Step3 = () => {
  const { t } = useTranslation<string>()
  const { darkMode } = usePreferenceStore()
  const { accessWallet } = useWallet()

  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const [seed, setSeed] = useState('')

  useEffect(() => {
    setSeed('')
    const s = generateMnemonic()
    setSeed(s || '')
  }, [])

  const handleSaveSeed = () => {
    accessWallet(seed)
  };

  const handleCopy = () => {
    Clipboard.setString(seed);
  }

  return (
    <View style={styles.passwordContainer}>
      <Text style={styles.welcomeTitle}>
        {t('recoveryPhase')}
      </Text>
      <Text style={styles.instructionText}>
        {t('phaseWarning')}
      </Text>
      <Text style={styles.instructionText}>
        {t('phaseDescription')}
      </Text>
      <View style={{width: '100%', flex: 1}}>
        <View style={[styles.seedContainer, {backgroundColor: preferenceTheme.background.background}]}>
          {seed.length === 0 ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={seed.split(" ")}
              numColumns={4}
              keyExtractor={(item, index) => `seed-${item}-${index}` }
              style={{ width: '100%' }}
              renderItem={({item: word}) => {
                return (
                  <View style={{flex: 1, padding: 8}}>
                    <Text style={styles.seed}>{word}</Text>
                  </View>
                )
              }}
            />
          )}
        </View>
        {seed.length > 0 && (
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
      {seed.length > 0 && (
        <Button
          fullWidth
          style={{
            borderRadius: 60
          }}
          onPress={handleSaveSeed}
        >
          Continue
        </Button>
      )}
    </View>
  )
}

export default Step3