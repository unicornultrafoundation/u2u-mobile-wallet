import {Web3Wallet, IWeb3Wallet, Web3WalletTypes} from '@walletconnect/web3wallet';
import {SignClientTypes} from '@walletconnect/types';
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils'
import { WALLET_CONNECT_PROJECT_ID } from '../config/constant';
import { useCallback, useEffect, useState } from 'react';
import { useWallet } from './useWallet';
import { useNetwork } from './useNetwork';
import { createWeb3Wallet, web3wallet } from '../util/walletconnect';
import { useGlobalStore } from '../state/global';

export function useWalletConnect() {
  const [initialized, setInitialized] = useState(false);
  const [pairedProposal, setPairedProposal] = useState<Web3WalletTypes.SessionProposal>();

  // const onSessionProposal = async ({ id, params }: Web3WalletTypes.SessionProposal) => {
  //   try{
  //     console.log('here 1')
  //     // ------- namespaces builder util ------------ //
  //     const approvedNamespaces = buildApprovedNamespaces({
  //       proposal: params as any,
  //       supportedNamespaces: {
  //         eip155: {
  //           chains: ['eip155:1', 'eip155:137'],
  //           methods: ['eth_sendTransaction', 'personal_sign'],
  //           events: ['accountsChanged', 'chainChanged'],
  //           accounts: [
  //             'eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb',
  //             'eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb'
  //           ]
  //         }
  //       }
  //     })
  //     // ------- end namespaces builder util ------------ //
  //     console.log('before approve')
  //     const session = await web3wallet.approveSession({
  //       id,
  //       namespaces: approvedNamespaces
  //     })
  //     console.log(session)
  //   }catch(error){
  //     // use the error.message to show toast/info-box letting the user know that the connection attempt was unsuccessful
  
  //     await web3wallet.rejectSession({
  //       id: id,
  //       reason: getSdkError("USER_REJECTED")
  //     })
  //   }
  // }

  const approveSession = async () => {
    if (!pairedProposal) return
    const {id, params} = pairedProposal;
    // ------- namespaces builder util ------------ //
    const approvedNamespaces = buildApprovedNamespaces({
      proposal: params as any,
      supportedNamespaces: {
        eip155: {
          chains: ['eip155:1', 'eip155:137'],
          methods: ['eth_sendTransaction', 'personal_sign'],
          events: ['accountsChanged', 'chainChanged'],
          accounts: [
            'eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb',
            'eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb'
          ]
        }
      }
    })
    // ------- end namespaces builder util ------------ //
    console.log('before approve')
    const session = await web3wallet.approveSession({
      id,
      namespaces: approvedNamespaces
    })
    console.log(session)
  }

  const onSessionProposal = useCallback(
    (proposal: Web3WalletTypes.SessionProposal) => {
      setPairedProposal(proposal);
    },
    [],
  );

  const onInitialize = useCallback(async () => {
    try {
      await createWeb3Wallet();
      web3wallet.on('session_proposal', onSessionProposal)

      web3wallet.on('session_request', async (event) => {
        const { topic, params, id } = event
        const { request } = params
        const requestParamsMessage = request.params[0]
        
        console.log(requestParamsMessage)
      
        // convert `requestParamsMessage` by using a method like hexToUtf8
        // const message = hexToUtf8(requestParamsMessage)
      
        // sign the message
        // const signedMessage = await wallet.signMessage(message)
      
        // const response = { id, result: signedMessage, jsonrpc: '2.0' }
      
        // await web3wallet.respondSessionRequest({ topic, response })
      })
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

  return {
    initialized,
    approveSession
  }
}