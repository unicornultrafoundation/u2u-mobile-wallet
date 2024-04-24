import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalStore } from "../../state/global";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "../../component/Icon";
import Text from '../../component/Text';
import { usePreference } from "../../hook/usePreference";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import theme from "../../theme";
import TextInput from "../../component/TextInput";
import Button from "../../component/Button";

export default function NicknameScreen() {
  const {t} = useTranslation()
  const navigation = useNavigation()
  const {preferenceTheme} = usePreference()
  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  const [nickname, setNickname] = useState('')

  const handleSubmitNickname = () => {

  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: preferenceTheme.background.background}}>
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
        <TextInput
          value={nickname}
          onChangeText={setNickname}
          placeholder={t('setYourWalletNickname')}
        />
        <Button
          style={{borderRadius: 60}}
          textStyle={theme.typography.label.medium}
          onPress={handleSubmitNickname}
        >
          {t('submit')}
        </Button>
      </View>
    </SafeAreaView>
  )
}