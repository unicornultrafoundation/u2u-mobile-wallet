import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from "react-native";
import { usePreferenceStore } from "../../state/preferences";
import { darkTheme, lightTheme } from "../../theme/color";
import { styles } from "./styles";
import Text from "../../component/Text";
import Icon from "../../component/Icon";
import { typography } from "../../theme/typography";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import TextInput from "../../component/TextInput";
import Button from "../../component/Button";
import useIsKeyboardShown from "../../hook/useIsKeyboardShown";
import Clipboard from "@react-native-clipboard/clipboard";
import { useState } from "react";
import { getWalletFromPrivateKey } from "../../util/wallet";
import theme from "../../theme";
import { useWallet } from "../../hook/useWallet";
import { logErrorForMonitoring } from "../../hook/useCrashlytics";

export default function ImportWithPrivateKeyScreen() {
  const navigation = useNavigation<any>()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [privateKey, setPrivateKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isKeyboardShown = useIsKeyboardShown()
  const {addPrivateKey} = useWallet()

  const {t} = useTranslation()

  const handlePaste = async () => {
    const content = await Clipboard.getString();
    setPrivateKey(content)
  }

  const handleImport = async () => {
    try {
      setError('')
      setLoading(true)
      const _pk = privateKey.includes('0x') ? privateKey : `0x${privateKey}`

      const wallet = getWalletFromPrivateKey(_pk)
      addPrivateKey(_pk)
      setLoading(false)
      navigation.goBack()
    } catch (err) {
      logErrorForMonitoring(error as any, "Import with private key error")
      setLoading(false)
      setError('Invalid private key')
    }
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={24}
    >
      <View
        style={styles.header}
      >
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <Text
          style={[
            typography.title3.bold,
            {
              color: preferenceTheme.text.primary
            }
          ]}
        >
          {t('importWallet')}
        </Text>
        <View />
      </View>
      <Text
        type="caption2-regular"
        color="primary"
        style={{
          textAlign: 'center',
          paddingTop: 10,
          paddingBottom: 35,
          paddingHorizontal: 16
        }}
      >
        {t('enterPrivateKey')}
      </Text>
      <View
        style={{flex: 1, justifyContent: 'space-between', paddingBottom: isKeyboardShown ? 0 : 12}}
      >
        <View>
          <TextInput
            multiline
            value={privateKey}
            onChangeText={setPrivateKey}
            numberOfLines={6}
            textWrapperStyle={{height: 128, paddingTop: 14}}
            style={[{height: 128}, typography.body2.regular]}
            placeholder={t("enterPrivateKeyShort")}
          />
          {error !== '' && (
            <View style={{flexDirection: 'row', paddingVertical: 8, alignItems: 'center'}}>
              <Icon name='error' width={18} height={18} />
              <Text style={[
                theme.typography.caption2.regular,
                {
                  color: theme.accentColor.error.normal,
                  paddingLeft: 4
                }
              ]}>
                {error}
              </Text>
            </View>
          )}
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
            onPress={handlePaste}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="copy" width={16} height={16} style={{ marginRight: 4 }} />
              <Text style={{ fontWeight: "500", fontSize: 14 }}>{t('paste')}</Text>
            </View>
          </Button>
        </View> 
        <Button
          loading={loading}
          fullWidth
          style={{
            borderRadius: 60
          }}
          onPress={handleImport}
        >
          {t('confirm')}
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}