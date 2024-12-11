import { useEffect } from "react";
import { useGlobalStore } from "../../state/global";
import { useNavigation } from "@react-navigation/native";
import { updateSignClientChainId, walletKit } from "../../util/walletconnect";
import { useNetwork } from "../useNetwork";
import { useWallet } from "../useWallet";

export const useWalletKitEventsManager = (initialized: boolean) => {
  const navigation = useNavigation<any>()
  const {setWCProposal} = useGlobalStore()

  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()

  useEffect(() => {
    if (!walletKit || !initialized) return
    //sign
    walletKit.on('session_proposal', (_p) => {
      navigation.navigate('WCScanQRCode')
      setWCProposal(_p)
    })

    walletKit.on("session_request", (p) => {
      navigation.navigate('WalletStack', {screen: 'WCSignRequest', params: {request: p}})
    });
    walletKit.on('session_delete', data => {
      console.log('session_delete event received', data);
    });
    
    walletKit.on('proposal_expire', (args) => {
      console.log('proposal expired')
      // navigation.goBack()
    });
  }, [initialized, walletKit]);

  useEffect(() => {
    if (!initialized || !networkConfig || !wallet) return
    updateSignClientChainId(networkConfig.chainID, wallet.address)
  }, [initialized, wallet, networkConfig])
}