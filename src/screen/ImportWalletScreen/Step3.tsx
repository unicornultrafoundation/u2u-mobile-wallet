import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./styles";
import Text from "../../component/Text";
import { useTranslation } from "react-i18next";
import TextInput from "../../component/TextInput";
import Button from "../../component/Button";
import { useWallet } from "../../hook/useWallet";
import { usePreferenceStore } from "../../state/preferences";
import { darkTheme, lightTheme } from "../../theme/color";
import ErrorTextInput from "../../component/TextInput/ErrorTextInput";
import Clipboard from "@react-native-clipboard/clipboard";
import { ScrollView } from "react-native";
import Icon from "../../component/Icon";
import useIsKeyboardShown from "../../hook/useIsKeyboardShown";

const Step3 = () => {
  const { t } = useTranslation<string>();
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const { accessWallet } = useWallet();

  const isKeyboardShown = useIsKeyboardShown()

  // const SEED_LENGTH = 12;
  const [seedLength, setSeedLength] = useState(12)
  const [seedList, setSeedList] = useState(Array(seedLength).fill(""));
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

  const pasteRecoveryPhrase = async () => {
    const content = await Clipboard.getString();
    const contentLi = content.trim().split(/\s+/)
    const newSeedLi = Array(seedLength).fill("")
    const len = Math.min(contentLi.length, seedLength)
    for (var i = 0; i < len; ++i) {
      newSeedLi[i] = contentLi[i]
    }
    setSeedList(newSeedLi)
  }

  const handleSaveSeed = async () => {    
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

  const renderMode12 = () => {
    return (
      <>
        <View style={{ flexDirection: "row" }}>
          {seedList.slice(0, 3).map((word, index) => {
            return (
              <View
                style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 6 }}
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
          {seedList.slice(3, 6).map((word, index) => {
            return (
              <View
                style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 6 }}
                key={`seed-${index + 3}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  placeholder={`${index + 4}.`}
                  placeholderTextColor={preferenceTheme.text.primary}
                  style={{textAlign: "left"}}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText.trim(), index + 3);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: "row" }}>
          {seedList.slice(6, 9).map((word, index) => {
            return (
              <View
                style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 6 }}
                key={`seed-${index + 6}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  placeholder={`${index + 7}.`}
                  placeholderTextColor={preferenceTheme.text.primary}
                  style={{ textAlign: "left" }}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText.trim(), index + 6);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: "row" }}>
          {seedList.slice(9, 12).map((word, index) => {
            return (
              <View
                style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 6 }}
                key={`seed-${index + 9}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  placeholder={`${index + 10}.`}
                  placeholderTextColor={preferenceTheme.text.primary}
                  style={{ textAlign: "left" }}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText.trim(), index + 9);
                  }}
                />
              </View>
            );
          })}
        </View>
      </>
    )
  }

  const renderMode15 = () => {
    return (
      <>
        <View style={{ flexDirection: "row" }}>
          {seedList.slice(0, 3).map((word, index) => {
            return (
              <View
                style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 6 }}
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
          {seedList.slice(3, 6).map((word, index) => {
            return (
              <View
                style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 6 }}
                key={`seed-${index + 3}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  placeholder={`${index + 4}.`}
                  placeholderTextColor={preferenceTheme.text.primary}
                  style={{textAlign: "left"}}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText.trim(), index + 3);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: "row" }}>
          {seedList.slice(6, 9).map((word, index) => {
            return (
              <View
                style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 6 }}
                key={`seed-${index + 6}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  placeholder={`${index + 7}.`}
                  placeholderTextColor={preferenceTheme.text.primary}
                  style={{ textAlign: "left" }}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText.trim(), index + 6);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: "row" }}>
          {seedList.slice(9, 12).map((word, index) => {
            return (
              <View
                style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 6 }}
                key={`seed-${index + 9}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  placeholder={`${index + 10}.`}
                  placeholderTextColor={preferenceTheme.text.primary}
                  style={{ textAlign: "left" }}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText.trim(), index + 9);
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: "row" }}>
          {seedList.slice(12, 15).map((word, index) => {
            return (
              <View
                style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 6 }}
                key={`seed-${index + 12}`}
              >
                <TextInput
                  value={word}
                  autoCapitalize="none"
                  placeholder={`${index + 13}.`}
                  placeholderTextColor={preferenceTheme.text.primary}
                  style={{ textAlign: "left" }}
                  onChangeText={(newText) => {
                    handleUpdateSeedWord(newText.trim(), index + 12);
                  }}
                />
              </View>
            );
          })}
        </View>
      </>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={styles.passwordContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={24}
          style={{flex: 1, width: '100%', alignItems: 'center'}}
        >
          {!isKeyboardShown && (
            <>
              <Text style={styles.welcomeTitle}>
                {t("seedPhraseSignIn")}
              </Text>
              <Text style={styles.instructionText}>
                {t("seedPhraseSignInDescription", {wordCount: `${seedLength}`})}{"\n"}
                {t("enterSeedPhrase")}
              </Text>
            </>
          )}
          <ScrollView style={{ width: "100%" }} contentContainerStyle={{paddingBottom: 20}} bounces={false}>
            {seedLength === 12 ? renderMode12() : renderMode15()}
            <Button
              type="text"
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 12,
                paddingHorizontal: 8
              }}
              textStyle={{
                color: preferenceTheme.text.title,
              }}
              onPress={pasteRecoveryPhrase}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="copy" width={16} height={16} style={{ marginRight: 4 }} />
                <Text style={{ fontWeight: "500", fontSize: 14 }}>{t('paste')}</Text>
              </View>
            </Button>
            <Button
              type="text"
              textStyle={{
                color: preferenceTheme.text.title,
                textDecorationLine: "underline"
              }}
              onPress={() => {
                const newSeedLength = seedLength === 12 ? 15 : 12
                setSeedList(Array(newSeedLength).fill(""))
                setSeedLength(newSeedLength)
              }}
            >
              {seedLength === 12 ? t('switchSeedLength', {seedLength: 15}) : t('switchSeedLength', {seedLength: 12})}
            </Button>
            {errorSeed && <ErrorTextInput error={t(errorSeed)} style={{marginVertical: 10, justifyContent: 'center'}}/>}
          </ScrollView>
        </KeyboardAvoidingView>
        <Button
          fullWidth
          style={{
            borderRadius: 60,
            marginTop: 10,
          }}
          onPress={handleSaveSeed}
        >
          {t('continue')}
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Step3;
