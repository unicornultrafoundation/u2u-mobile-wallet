import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { styles } from "./styles";
import { usePreference } from "../../hook/usePreference";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "../../state/global";
import Text from "../../component/Text";
import theme from "../../theme";
import LottieView from "lottie-react-native";
import { useWalletConnect } from "../../hook/walletconnect/useWalletConnect";
import Button from "../../component/Button";
import Scanner from "../../component/QRCodeScanner";

export default function WCScanQRCode() {
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const {t} = useTranslation()

  const {pair, approve, reject} = useWalletConnect()
  const {wcProposal: proposal} = useGlobalStore()
  const route = useRoute<any>();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const [wcURI, setWCURI] = useState('')
  
  useEffect(() => {
    if (!wcURI) return
    pair(wcURI)

  }, [wcURI])

  if (proposal) {
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
      >
        <View style={styles.header}>
          <Text
            style={[theme.typography.title3.bold, {textAlign: 'center'}]}
          >
            {t('approvalSession')}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.metadataRow}>
            <Text>Name:</Text>
            <Text>{proposal?.params.proposer.metadata.name}</Text>
          </View>
          <View style={styles.metadataRow}>
            <Text>Description:</Text>
            <Text>{proposal?.params.proposer.metadata.description}</Text>
          </View>
          <View style={styles.metadataRow}>
            <Text>URL:</Text>
            <Text>{proposal?.params.proposer.metadata.url}</Text>
          </View>
        </View>
        <View>
          <Button
            style={{borderRadius: 60, marginBottom: 12, marginHorizontal: 16}}
            onPress={() => {
              proposal && approve(proposal)
              // setConnected(true)
              navigation.goBack()
            }}
          >
            <Text>Approve</Text>
          </Button>
          <Button
            style={{borderRadius: 60, marginHorizontal: 16}}
            color="error"
            onPress={() => {
              proposal && reject(proposal)
              navigation.goBack()
            }}
          >
            <Text color="title">
              Reject
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
    >
      {/* <Button
        onPress={() => {
          setWCURI(
            'wc:d4cfcb0dc915e0f7c5cc0aa196aa1b0f6a356df5afa7dd915bea30fb717f0e94@2?expiryTimestamp=1726735794&relay-protocol=irn&symKey=ac8c6d9645f8f11f9713fe576aef7feca05c88feb8b68c1d7d7215cb651a1d11'
          )
        }}
      >
        <Text>Set</Text>
      </Button> */}
      <Scanner
        onCancel={navigation.goBack}
        onSuccess={setWCURI}
        topContent={(
          <Text style={[theme.typography.headline.medium, {paddingHorizontal: 24}]}>
            Scan QR code to connect
          </Text>
        )}
      />
    </SafeAreaView>
  )

  // if (!proposal) {
  //   <SafeAreaView
  //     style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
  //   >
  //     <LottieView
  //       style={{ height:250, width: 400}}
  //       source={require("../SplashScreen/loading.json")}
  //       autoPlay
  //       loop
  //     />
  //   </SafeAreaView>
  // }
}