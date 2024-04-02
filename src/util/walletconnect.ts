import '@walletconnect/react-native-compat'
import {Core} from '@walletconnect/core';
import {ICore} from '@walletconnect/types';
import {Web3Wallet, IWeb3Wallet} from '@walletconnect/web3wallet';
import { WALLET_CONNECT_PROJECT_ID } from '../config/constant';

export let web3wallet: IWeb3Wallet;
export let core: ICore;

export async function createWeb3Wallet() {
  core = new Core({
    // @notice: If you want the debugger / logs
    // logger: 'info',
    projectId: WALLET_CONNECT_PROJECT_ID,
  });

  web3wallet = await Web3Wallet.init({
    core: core as any,
    metadata: {
      name: 'U2U Super App',
      description: 'U2U Super App for U2U ecosystem',
      url: 'https://uniultra.xyz/',
      icons: ['https://avatars.githubusercontent.com/u/37784886'],
    },
  });
}

export async function _pair(params: {uri: string}) {
  try {
    if (web3wallet) {
      await web3wallet.pair({ uri: params.uri })
      return 
    }
    console.log('web3wallet undefined') 
  } catch (error) {
    console.log('pair error', error)
  }
}
