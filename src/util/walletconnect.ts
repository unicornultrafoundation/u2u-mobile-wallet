import { Core } from '@walletconnect/core'
import { WC_PROJECT_ID } from '../config/constant'
import WalletKit, { IWalletKit } from '@reown/walletkit';
import messaging from '@react-native-firebase/messaging'

const core = new Core({
  projectId: WC_PROJECT_ID,
  relayUrl: 'wss://relay.walletconnect.org'
})

export let walletKit: IWalletKit;

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

export async function createWalletKit() {
  walletKit = await WalletKit.init(walletConnectOptions);

  try {
    // const clientId =
    //   await walletKit.engine.signClient.core.crypto.getClientId();
    // console.log('WalletConnect ClientID: ', clientId);

    messaging().onTokenRefresh(async (token) => {
      await walletKit.registerDeviceToken({
        // token: await messaging().getToken(), // device token
        token,
        clientId: await walletKit.core.crypto.getClientId(), //your instance clientId
        notificationType: 'fcm', // notification type
        enableEncrypted: true // flag that enabled detailed notifications
      });
    });
  } catch (error) {
    console.error(
      'Failed to set WalletConnect clientId in localStorage: ',
      error,
    );
  }
}

export async function updateSignClientChainId(
  chainId: string,
  address: string,
) {
  // get most recent session
  const sessions = walletKit.getActiveSessions();
  if (!sessions) {
    return;
  }
  const namespace = chainId.split(':')[0];
  Object.values(sessions).forEach(async session => {
    await walletKit.updateSession({
      topic: session.topic,
      namespaces: {
        ...session.namespaces,
        [namespace]: {
          ...session.namespaces[namespace],
          chains: [
            ...new Set(
              [chainId].concat(
                Array.from(session.namespaces[namespace].chains || []),
              ),
            ),
          ],
          accounts: [
            ...new Set(
              [`${chainId}:${address}`].concat(
                Array.from(session.namespaces[namespace].accounts),
              ),
            ),
          ],
        },
      },
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const chainChanged = {
      topic: session.topic,
      event: {
        name: 'chainChanged',
        data: parseInt(chainId.split(':')[1], 10),
      },
      chainId: chainId,
    };

    const accountsChanged = {
      topic: session.topic,
      event: {
        name: 'accountsChanged',
        data: [`${chainId}:${address}`],
      },
      chainId,
    };
    await walletKit.emitSessionEvent(chainChanged);
    await walletKit.emitSessionEvent(accountsChanged);
  });
}