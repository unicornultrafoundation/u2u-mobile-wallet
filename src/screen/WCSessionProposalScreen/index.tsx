import { SafeAreaView, View } from "react-native";
import { useWalletConnect } from "../../hook/useWalletConnect";
import Text from "../../component/Text";
import Button from "../../component/Button";
import { darkTheme, lightTheme } from "../../theme/color";
import { usePreferenceStore } from "../../state/preferences";
import { useEffect, useState } from "react";
import { _pair, web3wallet } from "../../util/walletconnect";
import { useRoute } from "@react-navigation/native";

export default function WCSessionProposal() {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const route = useRoute<any>();
  const uri = route.params?.uri || ""

  // const [uri, setURI] = useState('wc:6504230a049bf196be1a66a5b86db4b4d58f7b45690e8211ab77b8809754d9be@2?relay-protocol=irn&symKey=936e8b1e733ad14881bc0487ca536dcf5d19167394db23fd771d5ddf7d1e4e4c')

  const {initialized, approveSession, rejectSession} = useWalletConnect()

  useEffect(() => {
    uri !== "" && _pair({uri})
  }, [uri])

  if (!initialized) {
    return null
  }

  return (
    <SafeAreaView
      style={[
        { backgroundColor: preferenceTheme.background.background, flex: 1, padding: 20},
      ]}
    >
      <Text>
        URI: {uri}
      </Text>
      <View style={{gap: 8, flexDirection: 'row'}}>
        <Button onPress={approveSession}>
          Approve
        </Button>
        <Button color="tertiary" onPress={rejectSession}>
          Reject
        </Button>
      </View>
    </SafeAreaView>
  )
}