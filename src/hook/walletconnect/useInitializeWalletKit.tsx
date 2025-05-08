import {useCallback, useEffect, useState} from 'react';

import { createWalletKit, walletKit } from '../../util/walletconnect';

export default function useInitializeWalletKit() {
  const [initialized, setInitialized] = useState(false);

  const onInitialize = useCallback(async () => {
    try {
      const notificationSubscription = await createWalletKit();
      setInitialized(true);

      return notificationSubscription?.remove()
      
    } catch (err: unknown) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }
  }, [initialized, onInitialize]);

  return initialized;
}
