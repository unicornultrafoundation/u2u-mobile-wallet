import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalStore } from "../../state/global";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from "react-native";
import Icon from "../../component/Icon";
import Text from '../../component/Text';
import { usePreference } from "../../hook/usePreference";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import theme from "../../theme";
import TextInput from "../../component/TextInput";
import Button from "../../component/Button";
import { useWalletNickname } from "../../hook/useWalletNickname";
import Toast from "react-native-toast-message";

export default function NicknameScreen() {
  const {t} = useTranslation()
  const navigation = useNavigation()
  const {preferenceTheme} = usePreference()

  const {submitWalletNickname} = useWalletNickname()

  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  const [nickname, setNickname] = useState('')

  const handleSubmitNickname = async () => {
    try {
      const rs = await submitWalletNickname(nickname)
      console.log(rs)
      Toast.show({
        type: 'success',
        text1: t('updateWalletNicknameSuccess'),
      })
    } catch (error: any) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: t('updateWalletNicknameFail'),
        text2: t(error.message),
      })
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: preferenceTheme.background.background}}>
      <KeyboardAvoidingView
        style={[
          {
            flex: 1
          }
        ]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={24}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-left" width={24} height={24} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={theme.typography.title3.bold}
            >
              {t('nickname')}
            </Text>
          </View>
          <View />
        </View>
        <View style={styles.body}>
          <View>
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              placeholder={t('setYourWalletNickname')}
              autoCapitalize="none"
            />
            <Text 
              style={{
                fontSize: 11,
                letterSpacing: 0.07,
                lineHeight: 14,
                paddingBottom: 12,
                textAlign: 'left',
                marginTop: 12
              }}
            >
              {t('nicknameRules')}
            </Text>
          </View>
          <Button
            style={{borderRadius: 60}}
            textStyle={theme.typography.label.medium}
            onPress={handleSubmitNickname}
          >
            {t('confirm')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}