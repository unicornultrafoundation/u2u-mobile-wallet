import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { useGlobalStore } from "../../state/global";
import { useCallback, useState } from "react";
import { styles } from "./styles";
import { usePreference } from "../../hook/usePreference";
import Icon from "../../component/Icon";
import Text from "../../component/Text";
import theme from "../../theme";
import { handleGoBack } from "../../util/navigation";
import { useWalletConnect } from "../../hook/useWalletConnect";
import Button from "../../component/Button";
import SignMessageDetail from "./SignMessageDetail";
import SignTxDetail from "./SignTxDetail";
import { useWallet } from "../../hook/useWallet";
import { signMessage, signTransaction } from "../../util/wallet";
import { typography } from "../../theme/typography";
import { hexToString } from "../../util/string";

export default function WCSignRequest() {
  const {t} = useTranslation()
  const { preferenceTheme } = usePreference()
  const navigation = useNavigation<any>()

  const route = useRoute<any>();
  const { setRouteName } = useGlobalStore();
  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const {wallet} = useWallet()
  const {walletKit} = useWalletConnect()
  const signRequest = route.params?.request
  const { topic, params, id } = signRequest
  const { request } = params

  const [loading, setLoading] = useState(false)

  const handleReject = async () => {
    try {
      if (!walletKit || !signRequest) return
      setLoading(true)
      await walletKit.respondSessionRequest({
        topic: topic,
        response: {
          id: id,
          jsonrpc: '2.0',
          error: {
            code: 5000,
            message: 'User rejected.'
          }
        }
      })
      setLoading(false)
      handleGoBack(navigation)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleConfirm = async () => {
    if (!walletKit) return
    switch (request.method) {
      case 'personal_sign':
        const message = hexToString(request.params[0].replace("0x", ""))
        const signedMessage = await signMessage(message, wallet.privateKey)
        const response = { id, result: signedMessage, jsonrpc: '2.0' }

        await walletKit.respondSessionRequest({ topic, response })
        navigation.goBack()
        break;
      case 'eth_sendTransaction':
      case 'eth_signTransaction':
        const txData = request.params[0]
        const signedTx = await signTransaction(txData, wallet.privateKey)
        const txResponse = { id, result: signedTx, jsonrpc: '2.0' }

        await walletKit.respondSessionRequest({ topic, response: txResponse })
        navigation.goBack()
        break;
      default:
        break;
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
    >
      <View style={[styles.screenHeader, {paddingVertical: 16, paddingHorizontal: 20}]}>
        <TouchableOpacity onPress={handleReject}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <Text
          style={[
            theme.typography.title3.bold,
            { flex: 1, textAlign: 'center', color: preferenceTheme.text.title }
          ]}>
          {request.method === 'personal_sign' ? t('signExternalRequestMessage') : t('signExternalRequestTx') }
        </Text>
        <View style={{width: 24, height: 24}} />
        
      </View>
      <View style={{flex: 1, marginHorizontal: 20}}>
          <Text style={[typography.headline.bold, preferenceTheme.text.title]}>
            {t('details')}
          </Text>
          {
            request.method === 'personal_sign' ? <SignMessageDetail signRequest={signRequest} /> : <SignTxDetail signRequest={signRequest} />
          }
        </View>
        <View style={{flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingBottom: 32}}>
          <Button
            style={{
              borderRadius: 60,
              flex: 1,
              backgroundColor: '#1F2225',
            }}
            textStyle={theme.typography.label.medium}
            onPress={handleReject}
          >
            {t('reject')}
          </Button>
          <Button
            style={{borderRadius: 60, flex: 1}}
            textStyle={theme.typography.label.medium}
            onPress={handleConfirm}
            loading={loading}
          >
            {t('confirm')}
          </Button>
        </View>
    </SafeAreaView>
  )
}