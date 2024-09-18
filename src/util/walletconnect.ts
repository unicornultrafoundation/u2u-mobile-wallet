import { Core } from '@walletconnect/core'
import { WC_PROJECT_ID } from '../config/constant'

const core = new Core({
  projectId: WC_PROJECT_ID
})

export const walletConnectOptions = {
  core, // <- pass the shared `core` instance
  metadata: {
    name: 'U2U Super App',
    description: 'U2U Super App for Unicorn Ultra blockchains',
    url: 'https://u2uscan.xyz/',
    icons: ['https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/public_assets/u2u_logo_colored_32x32.svg'],
    redirect: {
      native: 'u2umobilewallet://'
    }
  }
}

// const walletKit = await WalletKit.init({
//   core, // <- pass the shared `core` instance
//   metadata: {
//     name: 'Demo React Native Wallet',
//     description: 'Demo RN Wallet to interface with Dapps',
//     url: 'www.walletconnect.com',
//     icons: ['https://your_wallet_icon.png'],
//     redirect: {
//       native: 'yourwalletscheme://'
//     }
//   }
// })