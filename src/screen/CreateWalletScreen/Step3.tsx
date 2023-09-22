import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { styles } from './styles'
import Text from '../../component/Text'
import { useTranslation } from 'react-i18next'
import { usePreferenceStore } from '../../state/preferences'
import { darkTheme, lightTheme } from '../../theme/color'
import { generateMnemonic } from '../../util/wallet'
import Button from '../../component/Button'

const Step3 = () => {
  const { t } = useTranslation<string>()
  const { darkMode } = usePreferenceStore()

  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const [seed, setSeed] = useState('')

  useEffect(() => {
    setSeed('')
    const s = generateMnemonic()
    setSeed(s || '')
  }, [])

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
        <Button
          type='text'
        >
          Copy to clipboard
        </Button>
      </View>
      {seed.length > 0 && (
        <Button
          fullWidth
          style={{
            borderRadius: 60
          }}
        >
          Continue
        </Button>
      )}
    </View>
  )
}

export default Step3