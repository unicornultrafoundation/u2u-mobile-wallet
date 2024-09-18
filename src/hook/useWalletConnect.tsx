import Client, { WalletKit } from "@reown/walletkit";
import { useCallback, useEffect, useState } from "react";
import { walletConnectOptions } from "../util/walletconnect";
import { WalletKitTypes } from "@reown/walletkit";
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils'
import { useNetwork } from "./useNetwork";
import { useWallet } from "./useWallet";
import { useNavigation } from "@react-navigation/native";

export function useWalletConnect() {
  const navigation = useNavigation<any>()
  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()
  const [walletKit, setWalletKit] = useState<Client>()
  const [proposal, setProposal] = useState<WalletKitTypes.SessionProposal>()

  useEffect(() => {
    (async () => {
      const _walletKit = await WalletKit.init(walletConnectOptions)
      setWalletKit(_walletKit)
    })()
  }, [])

  useEffect(() => {
    if (!walletKit) return
    walletKit.on('session_proposal', (_p) => {
      setProposal(_p)
    })

    walletKit.on("session_request", (p) => {
      navigation.navigate('WalletStack', {screen: 'WCSignRequest', params: {request: p}})
    });

    walletKit.on('session_delete', (_p) => {
      console.log('session deleted', _p.id)
    })

    walletKit.engine.signClient.events.on('session_ping', data => {
      console.log('session_ping received', data);
    });
  }, [walletKit])

  const getActiveSessions = useCallback(() => {
    if (!walletKit) return []
    console.log(walletKit.getActiveSessions())
    return walletKit.getActiveSessions()
  }, [walletKit])

  const pair = useCallback((wcuri: string) => {
    if (!walletKit) return
    return walletKit.core.pairing.pair({ uri: wcuri })
  }, [walletKit])

  const approve = useCallback(async (proposal: WalletKitTypes.SessionProposal) => {
    if (!walletKit || !networkConfig || !wallet || !proposal) return
    try{
      const { id, params } = proposal
      // ------- namespaces builder util ------------ //
      const approvedNamespaces = buildApprovedNamespaces({
        proposal: params,
        supportedNamespaces: {
          eip155: {
            // chains: [`eip155:${networkConfig.chainID}`],
            chains: [`eip155:11155111`],
            methods: ['eth_sendTransaction', 'personal_sign'],
            events: ['accountsChanged', 'chainChanged'],
            accounts: [
              // `eip155:${networkConfig.chainID}:${wallet.address.toLowerCase()}`,
              `eip155:11155111:${wallet.address.toLowerCase()}`,
            ]
          }
        }
      })
      // ------- end namespaces builder util ------------ //
  
      const session = await walletKit.approveSession({
        id,
        namespaces: approvedNamespaces
      })
      console.log('connected to session', session.topic)
      console.log(walletKit.getActiveSessions())
      setProposal(undefined)
    } catch(error) {
      // use the error.message to show toast/info-box letting the user know that the connection attempt was unsuccessful
  
      await walletKit.rejectSession({
        id: proposal.params.id,
        reason: getSdkError("USER_REJECTED")
      })

      setProposal(undefined)
    }
  }, [walletKit, networkConfig, wallet])
  
  const reject = useCallback(async (proposal: WalletKitTypes.SessionProposal) => {
    (async () => {
      if (!walletKit || !proposal) return
      await walletKit.rejectSession({
        id: proposal.params.id,
        reason: getSdkError("USER_REJECTED")
      })
    })()
  }, [walletKit])

  return {
    walletKit,
    proposal,
    pair,
    approve,
    reject,
    getActiveSessions
  }
}