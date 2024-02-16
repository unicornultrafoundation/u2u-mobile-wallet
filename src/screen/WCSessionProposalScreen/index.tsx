import { SafeAreaView, View } from "react-native";
import { useWalletConnect } from "../../hook/useWalletConnect";
import Text from "../../component/Text";
import Button from "../../component/Button";
import { darkTheme, lightTheme } from "../../theme/color";
import { usePreferenceStore } from "../../state/preferences";
import { useEffect, useState } from "react";
import { _pair, web3wallet } from "../../util/walletconnect";

export default function WCSessionProposal() {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [uri, setURI] = useState('wc:68c64739152c2251997d98d09a07c7c12d0753748e465ed23c1d97a41b10fe5c@2?expiryTimestamp=1708076424&relay-protocol=irn&symKey=173f4394d7c1a020f6258ba3c4bdda27d146c42f3a76e9d2b181e775a2624e70')

  const {initialized} = useWalletConnect()

  // useEffect(() => {
  //   pair({uri})
  // }, [])

  const getSession = () => {
    const sessions = web3wallet.getActiveSessions()
    console.log(sessions)
  }

  return (
    <SafeAreaView
      style={[
        { backgroundColor: preferenceTheme.background.background, flex: 1 },
      ]}
    >
      <Text>
        URI: {uri}
      </Text>
      <Button onPress={() => _pair({uri})}>
        Approve
      </Button>
      <Button onPress={getSession}>
        Get session
      </Button>
    </SafeAreaView>
  )
}