import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { styles } from "./styles";
import { usePreference } from "../../hook/usePreference";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "../../state/global";
import { useNetwork } from "../../hook/useNetwork";
import Scanner from "../../component/QRCodeScanner";
import Text from "../../component/Text";
import theme from "../../theme";
import LottieView from "lottie-react-native";
import { useWalletConnect } from "../../hook/useWalletConnect";
import Button from "../../component/Button";
import Icon from "../../component/Icon";

export default function WCScanQRCode() {
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const {t} = useTranslation()
  const {pair, proposal, approve, reject, walletKit} = useWalletConnect()
  const route = useRoute<any>();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const [wcURI, setWCURI] = useState('')
  const [connected, setConnected] = useState(false)
  
  useEffect(() => {
    if (!wcURI) return
    console.log(wcURI)
    pair(wcURI)
  }, [wcURI])

  useEffect(() => {
    if (!walletKit) return
    walletKit.on('proposal_expire', (args) => {
      console.log('proposal expired')
      navigation.goBack()
    });
  }, [walletKit, navigation])

  if (!wcURI || wcURI === '') {
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
      >
        <Button
          onPress={() => {
            setWCURI(
              'wc:169ceb0904de5d3b6f8ca1bc8016837d549245b81ec69f10f6295c0fa4864404@2?expiryTimestamp=1726682381&relay-protocol=irn&symKey=e2f9c224204dc9cc1a5ccd80dfcc37989fc0569391add3a3fd658526f0accb75'
            )
          }}
        >
          <Text>Set</Text>
        </Button>
        {/* <Scanner
          onCancel={navigation.goBack}
          onSuccess={setWCURI}
          topContent={(
            <Text style={[theme.typography.headline.medium, {paddingHorizontal: 24}]}>
              Scan QR code to connect
            </Text>
          )}
        /> */}
      </SafeAreaView>
    )
  }

  if (connected) {
    <SafeAreaView
      style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
    >
      <View>
        <Icon name="success" width={40} height={40} />
        <Text>Connect success</Text>
      </View>
      <Button
        style={{borderRadius: 60, marginBottom: 12, marginHorizontal: 16}}
        onPress={navigation.goBack}
      >
        <Text>Confirm</Text>
      </Button>
    </SafeAreaView>
  }

  if (!proposal) {
    <SafeAreaView
      style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
    >
      <LottieView
        style={{ height:250, width: 400}}
        source={require("../SplashScreen/loading.json")}
        autoPlay
        loop
      />
    </SafeAreaView>
  }

  console.log('proposal', proposal?.params.proposer.metadata)

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
            setConnected(true)
            // navigation.goBack()
          }}
        >
          <Text>Approve</Text>
        </Button>
        <Button
          style={{borderRadius: 60, marginHorizontal: 16}}
          color="tertiary"
          onPress={() => {
            proposal && reject(proposal)
            navigation.goBack()
          }}
        >
          <Text>Reject</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}