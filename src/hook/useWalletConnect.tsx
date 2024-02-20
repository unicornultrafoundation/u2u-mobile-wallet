import {Web3Wallet, IWeb3Wallet, Web3WalletTypes} from '@walletconnect/web3wallet';
import {SignClientTypes} from '@walletconnect/types';
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils'
import { WALLET_CONNECT_PROJECT_ID } from '../config/constant';
import { useCallback, useEffect, useState } from 'react';
import { useWallet } from './useWallet';
import { useNetwork } from './useNetwork';
import { createWeb3Wallet, web3wallet } from '../util/walletconnect';
import { hexToString } from '../util/string';
import { Wallet, isHexString } from 'ethers';

export function useWalletConnect() {
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const [initialized, setInitialized] = useState(false);
  const [pairedProposal, setPairedProposal] = useState<Web3WalletTypes.SessionProposal>();
  const [request, setRequest] = useState<{method: string; params: any}>()

  const approveSession = async () => {
    if (!pairedProposal || !networkConfig) return
    const {id, params} = pairedProposal;
    // ------- namespaces builder util ------------ //
    const approvedNamespaces = buildApprovedNamespaces({
      proposal: params as any,
      supportedNamespaces: {
        eip155: {
          chains: [`eip155:${networkConfig?.chainID}`],
          // chains: [`eip155:1`],
          methods: ['eth_sendTransaction', 'personal_sign'],
          events: ['accountsChanged', 'chainChanged'],
          accounts: [
            `eip155:${networkConfig?.chainID}:${wallet.address.toLowerCase()}`,
            // `eip155:1:${wallet.address.toLowerCase()}`,
            // 'eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb'
          ]
        }
      }
    })
    // ------- end namespaces builder util ------------ //
    const session = await web3wallet.approveSession({
      id,
      namespaces: approvedNamespaces
    })
    console.log(session)
  }

  const rejectSession = async () => {
    if (!pairedProposal || !networkConfig) return
    await web3wallet.rejectSession({
      id: pairedProposal.id,
      reason: getSdkError('USER_REJECTED_METHODS')
    })
  }

  const onSessionProposal = useCallback(
    (proposal: Web3WalletTypes.SessionProposal) => {
      setPairedProposal(proposal);
    },
    [],
  );

  const handleSessionRequest = async (event: Web3WalletTypes.SessionRequest) => {
    const { topic, params, id } = event
    const { request } = params

    setRequest(request)

    // switch (request.method) {
    //   case 'signPersonalMessage':

    //     if (!wallet.privateKey) return;

    //     const signer = new Wallet(wallet.privateKey)
    //     const requestParamsMessage = request.params[0]
    //     const rawMessage = isHexString(requestParamsMessage) ? hexToString(requestParamsMessage.replace("0x", "")) : requestParamsMessage
    //     const signedMessage = await signer.signMessage(rawMessage);

    //     const response = { id, result: signedMessage, jsonrpc: '2.0' }
  
    //     await web3wallet.respondSessionRequest({ topic, response })
    //     break;
    //   default:
    //     return;
    // } 
  }

  const onInitialize = useCallback(async () => {
    try {
      await createWeb3Wallet();
      web3wallet.on('session_proposal', onSessionProposal)
      web3wallet.on('session_request', handleSessionRequest)

      setInitialized(true);
    } catch (err: unknown) {
      console.log('Error for initializing', err);
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }
  }, [initialized, onInitialize]);

  useEffect(() => {
    pairedProposal && console.log(pairedProposal.params.proposer.metadata)
  }, [pairedProposal])

  return {
    request,
    pairedProposal,
    initialized,
    approveSession,
    rejectSession
  }
}