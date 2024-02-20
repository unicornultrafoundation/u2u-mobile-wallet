import { SafeAreaView } from "react-native";
import { usePreferenceStore } from "../../state/preferences";
import { darkTheme, lightTheme } from "../../theme/color";
import Text from "../../component/Text";
import { useWalletConnect } from "../../hook/useWalletConnect";

export default function WCSessionRequestScreen() {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const {initialized, request} = useWalletConnect()

  if (!initialized || !request) return null

  console.log(request)

  return (
    <SafeAreaView
      style={[
        { backgroundColor: preferenceTheme.background.background, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20},
      ]}
    >
      <Text>Request</Text>
    </SafeAreaView>
  )
}