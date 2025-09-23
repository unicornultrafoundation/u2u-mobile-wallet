import { SafeAreaView, TouchableOpacity, View } from "react-native"
import Text from "@/component/Text"
import Icon from "@/component/Icon"
import { styles } from "./styles"
import { usePreferenceStore } from "@/state/preferences";
import { darkTheme, lightTheme } from "@/theme/color";
import { useNavigation } from "@react-navigation/native";
import { typography } from "@/theme/typography";
import { useTranslation } from "react-i18next";
import Button from "@/component/Button";
import { ethers } from "ethers";
import { authWithUniversalAccount } from "@/service/universalAccount";

const UniversalAccountScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<any>()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const handleCreateNewUAWallet = async () => {
    const wallet = ethers.Wallet.createRandom()
    const privateKey = wallet.privateKey
    const authRSJSON = await authWithUniversalAccount(privateKey)
    console.log('authRSJSON', authRSJSON)
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
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
          {t('universalAccount')}
        </Text>
        <View />
      </View>
      <View
        style={{
          padding: 16,
          gap: 12
        }}
      >
        <Button
          color="primary"
          onPress={handleCreateNewUAWallet}
        >
          {t('createNewWallet')}
        </Button>
        <Button
          color="secondary"
          onPress={() => {}}
        >
          {t('importExistingWallet')}
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default UniversalAccountScreen