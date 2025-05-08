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
import { useWalletConnect } from "../../hook/walletconnect/useWalletConnect";
import Button from "../../component/Button";
import SignMessageDetail from "./SignMessageDetail";
import SignTxDetail from "./SignTxDetail";
import { useWallet } from "../../hook/useWallet";
import { sendSignedTransaction, signMessage, signTransaction } from "../../util/wallet";
import { typography } from "../../theme/typography";
import { hexToString } from "../../util/string";
import { walletKit } from "../../util/walletconnect";
import { useTransaction } from "@/hook/useTransaction";
import { useNetwork } from "@/hook/useNetwork";
import BigNumber from "bignumber.js";
import { useTransactionStore } from "@/state/transaction";

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
  const signRequest = route.params?.request
  const { topic, params, id } = signRequest
  const { request } = params

  const { estimateGasPrice, estimateGasLimit, submitRawTx } = useTransaction()
  const { setTxHash } = useTransactionStore()

  const [loading, setLoading] = useState(false)

  const handleReject = async (message?: string) => {
    try {
      if (!walletKit || !signRequest || loading) return
      setLoading(true)
      await walletKit.respondSessionRequest({
        topic: topic,
        response: {
          id: id,
          jsonrpc: '2.0',
          error: {
            code: 5000,
            message: message || 'User rejected.'
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
    if (!walletKit || loading) return
    setLoading(true)
    console.log('request.method', request.method)
    switch (request.method) {
      case 'personal_sign':
        const message = hexToString(request.params[0].replace("0x", ""))
        const signedMessage = await signMessage(message, wallet.privateKey)
        const response = { id, result: signedMessage, jsonrpc: '2.0' }

        await walletKit.respondSessionRequest({ topic, response })
        setLoading(false)
        navigation.goBack()
        break;
      case 'eth_sendTransaction':
        // For eth_sendTransaction, we need to sign AND broadcast
        const sendTxData = request.params[0]
        const rawTx: Record<string, any> = {
          receiveAddress: sendTxData.to,
          amount: sendTxData.value || "0x00",
          txData: sendTxData.data,
        }

        if (sendTxData.gasLimit || sendTxData.gas) {
          rawTx.gasLimit = sendTxData.gasLimit ? sendTxData.gasLimit : sendTxData.gas
        } else {
          rawTx.gasLimit = await estimateGasLimit(rawTx)
        }
  
        if (sendTxData.gasPrice) {
          rawTx.gasPrice = sendTxData.gasPrice
        } else {
          rawTx.gasPrice = await estimateGasPrice()
        }
        console.log('rawTx', rawTx)
        try {
          // Broadcast the transaction
          const receipt = await submitRawTx(rawTx)
          // If we got a receipt, return the transaction hash
          if (!receipt) {
            setLoading(false)
            handleReject('Can not send transaction, please try again later')
            return
          }
          console.log('receipt', receipt.hash)
          const sendResponse = { 
            id, 
            result: receipt.hash, // fallback to signed tx if broadcast fails
            jsonrpc: '2.0' 
          }
          await walletKit.respondSessionRequest({ topic, response: sendResponse })
          setLoading(false)
          setTxHash("")
          navigation.goBack()
          break;
        } catch (error) {
          handleReject('Can not send transaction, please try again later')
          return
        }
      case 'eth_signTransaction':
        const txData = request.params[0]
        const signedTx = await signTransaction(txData, wallet.privateKey)
        const txResponse = { id, result: {signature: signedTx}, jsonrpc: '2.0' }

        console.log({ topic, response: txResponse })

        await walletKit.respondSessionRequest({ topic, response: txResponse })
        setLoading(false)
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
        <TouchableOpacity onPress={() => handleReject()}>
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
            onPress={() => handleReject()}
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