import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import Text from "../../component/Text";
import { useTranslation } from "react-i18next";
import TextInput from "../../component/TextInput";
import Button from "../../component/Button";
import { useWallet } from "../../hook/useWallet";
import { usePreferenceStore } from "../../state/preferences";
import { darkTheme, lightTheme } from "../../theme/color";
import ErrorTextInput from "../../component/TextInput/ErrorTextInput";

const Step3 = () => {
  const { t } = useTranslation<string>();
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const { accessWallet } = useWallet();

  const [seedList, setSeedList] = useState(Array(12).fill(""));
  const [errorSeed, setErrorSeed] = useState('')
  const [loading, setLoading] = useState(false);

  const handleUpdateSeedWord = (value: string, index: number) => {
    const newSeed = [...seedList]
    newSeed[index] = value
    setSeedList(newSeed)
  };

  const validateSeed = () => {
    for(var i = 0; i < seedList.length; i++) { 
      if (seedList[i] == '') {
        setErrorSeed('msgEnterRecoveryPhrase')
        return false
      }
    }
    setErrorSeed('')
    return true
  }

  const handleSaveSeed = () => {    
    const isOK = validateSeed();
    if (isOK) {
      setLoading(true);
      setTimeout(() => {
        try {
          accessWallet(seedList.join(" "));
        } catch(e) {
          setErrorSeed('msgImportWalletError')
        }
        setLoading(false);
      }, 100);
    }
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
      <View style={{ width: "100%", flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          {seedList.slice(0, 4).map((word, index) => {
            return (
              <View
                style={{ width: "25%", paddingHorizontal: 4, paddingVertical: 6 }}
                key={`seed-${index}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  style={{ textAlign: "left" }}
                  placeholder={`${index + 1}.`}
                  placeholderTextColor={preferenceTheme.text.primary}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText.trim(), index);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: "row" }}>
          {seedList.slice(4, 8).map((word, index) => {
            return (
              <View
                style={{ width: "25%", paddingHorizontal: 4, paddingVertical: 6 }}
                key={`seed-${index + 5}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  placeholder={`${index + 5}.`}
                  placeholderTextColor={preferenceTheme.text.primary}
                  style={{textAlign: "left"}}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText.trim(), index + 4);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: "row" }}>
          {seedList.slice(8, 12).map((word, index) => {
            return (
              <View
                style={{ width: "25%", paddingHorizontal: 4, paddingVertical: 6 }}
                key={`seed-${index + 8}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  placeholder={`${index + 9}.`}
                  placeholderTextColor={preferenceTheme.text.primary}
                  style={{ textAlign: "left" }}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText.trim(), index + 8);
                  }}
                />
              </View>
            );
          })}
        </View>
        {errorSeed && <ErrorTextInput error={t(errorSeed)} style={{marginVertical: 10, justifyContent: 'center'}}/>}
      </View>
      <Button
        fullWidth
        style={{
          borderRadius: 60
        }}
        onPress={handleSaveSeed}
      >
        {t('continue')}
      </Button>
    </View>
  );
};

export default Step3;
