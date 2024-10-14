import { useCallback } from "react";
import { WalletKitTypes } from "@reown/walletkit";
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils'
import { useNetwork } from "../useNetwork";
import { useWallet } from "../useWallet";
import { useGlobalStore } from "../../state/global";
import { walletKit } from "../../util/walletconnect";
import { useQuery } from "@tanstack/react-query";
import { SessionTypes } from '@walletconnect/types';

export function useWalletConnect() {
  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()

  const {setWCProposal} = useGlobalStore()

  const pair = useCallback((wcuri: string) => {
    if (!walletKit) return
    try {
      return walletKit.pair({ uri: wcuri }) 
    } catch (error) {
      console.log(error)
    }
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
            chains: [`eip155:${networkConfig.chainID}`],
            // chains: [`eip155:11155111`],
            methods: ['eth_sendTransaction', 'personal_sign'],
            events: ['accountsChanged', 'chainChanged'],
            accounts: [
              `eip155:${networkConfig.chainID}:${wallet.address.toLowerCase()}`,
              // `eip155:11155111:${wallet.address.toLowerCase()}`,
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
      setWCProposal(undefined)
    } catch(error) {
      // use the error.message to show toast/info-box letting the user know that the connection attempt was unsuccessful
  
      await walletKit.rejectSession({
        id: proposal.params.id,
        reason: getSdkError("USER_REJECTED")
      })

      setWCProposal(undefined)
    }
  }, [networkConfig, wallet, walletKit])
  
  const reject = useCallback(async (proposal: WalletKitTypes.SessionProposal) => {
    (async () => {
      if (!walletKit) return
      await walletKit.rejectSession({
        id: proposal.params.id,
        reason: getSdkError("USER_REJECTED")
      })
    })()
  }, [walletKit])

  const disconnect = useCallback(async (topic: string) => {
    (async () => {
      if (!walletKit) return
      await walletKit.disconnectSession({
        topic,
        reason: getSdkError('USER_DISCONNECTED')
      })
    })()
  }, [walletKit])

  const {data, refetch} = useQuery({
    queryKey: ['walletconnect-sessions', wallet.address, networkConfig?.chainID],
    queryFn: () => {
      if (!walletKit) return [] as SessionTypes.Struct[]
      const rs = walletKit.getActiveSessions()
      return Object.values(rs)
    },
    initialData: [] as SessionTypes.Struct[],
    refetchInterval: 5000
  })

  return {
    pair,
    approve,
    reject,
    disconnect,
    connectedSessions: data,
    refetch
  }
}