import React, { useState } from 'react'
import { FlatList, View } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';
import TextInput from '../../component/TextInput';
import Button from '../../component/Button';
import { useWallet } from '../../hook/useWallet';

const Step3 = () => {
  const { t } = useTranslation<string>()
  const { accessWallet } = useWallet()

  const [seedList, setSeedList] = useState(Array(12).fill(""))

  const handleUpdateSeedWord = (value: string, index: number) => {
    const newSeed = [...seedList]
    newSeed[index] = value
    setSeedList(newSeed)
  }

  const handleSaveSeed = () => {
    // TODO: validate wallet seed
    accessWallet(seedList.join(" "))
  };

  return (
    <View style={styles.passwordContainer}>
      <Text style={styles.welcomeTitle}>
        {t("seedPhraseSignIn")}
      </Text>
      <Text style={styles.instructionText}>
        {t("seedPhraseSignInDescription")}{"\n"}
        {t("enterSeedPhrase")}
      </Text>
      <View style={{width: '100%', flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          {seedList.slice(0, 4).map((word, index) => {
            return (
              <View
                style={{width: "25%", paddingHorizontal: 4, paddingVertical: 6}}
                key={`seed-${index + 0}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  style={{textAlign: 'center'}}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText, index + 0)
                  }}
                />
              </View>
            )
          })}
        </View>
        <View style={{flexDirection: 'row'}}>
          {seedList.slice(4, 8).map((word, index) => {
            return (
              <View
                style={{width: "25%", paddingHorizontal: 4, paddingVertical: 6}}
                key={`seed-${index + 4}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  style={{textAlign: 'center'}}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText, index + 4)
                  }}
                />
              </View>
            )
          })}
        </View>
        <View style={{flexDirection: 'row'}}>
          {seedList.slice(8, 12).map((word, index) => {
            return (
              <View
                style={{width: "25%", paddingHorizontal: 4, paddingVertical: 6}}
                key={`seed-${index + 8}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  style={{textAlign: 'center'}}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText, index + 8)
                  }}
                />
              </View>
            )
          })}
        </View>
      </View>
      <Button
        fullWidth
        style={{
          borderRadius: 60
        }}
        onPress={handleSaveSeed}
      >
        Continue
      </Button>
    </View>
  )
};

export default Step3;