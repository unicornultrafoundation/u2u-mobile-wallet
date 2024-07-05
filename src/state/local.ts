import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toChecksumAddress } from 'ethereum-checksum-address'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOCAL_STORE_KEY = 'local-storage'

interface TokenMeta {
  name: string,
  symbol: string,
  decimals: number,
  address: string,
}

interface LocalState {
  password: string;
  savePassword: (newPassword: string) => void;
  initing: boolean;
  saveIniting: (value: boolean) => void;
  selectedToken: string[];
  saveSelectedToken: (val: string[]) => void;
  toggleToken: (address: string) => void;
  tokenListInitted: boolean;
  setTokenListInitted: (tokenListInitted: boolean) => void;
  customTokenList: TokenMeta[];
  addCustomToken: (token: TokenMeta) => void;
  recentAddress: string[];
  addRecentAddress: (address: string) => void;
  alreadySubmitDeviceID: boolean;
  toggleAlreadySubmitDeviceID: () => void;
  registeredWallet: string[];
  addRegisteredWalelt: (address: string) => void;
  appCheckToken: string;
  setAppCheckToken: (appCheckToken: string) => void;
  passwordTry: number;
  setPasswordTry: (passwordTry: number) => void;
  increasePasswordTry: () => void;
  lockedUntil: number;
  setLockedUntil: (lockedUntil: number) => void;
  subscribePromotion: boolean;
  setSubscribePromotion: (subscribePromotion: boolean) => void;
  enableU2UConnect: boolean;
  setEnableU2UConnect: (enableU2UConnect: boolean) => void;
}

export const useLocalStore = create<LocalState>()(
  persist<LocalState>(
    (set, get) => ({
      password: "",
      savePassword: (newPassword: string) => set({ password: newPassword }),
      initing: true,
      saveIniting: (value: boolean) => set({ initing: value }),
      selectedToken: [],
      saveSelectedToken: (val: string[]) => set({ selectedToken: val }),
      toggleToken: (address: string) => {
        let current = [...get().selectedToken]
        if (current.includes(address)) {
          current = current.filter((i) => i !== address)
        } else {
          current.push(address)
        }
        set({ selectedToken: current })
      },
      tokenListInitted: false,
      setTokenListInitted: (tokenListInitted: boolean) => set({ tokenListInitted }),
      customTokenList: [],
      addCustomToken: (token: TokenMeta) => {
        const current = [...get().customTokenList]
        const index = current.findIndex((i) => i.address.toLowerCase() === token.address.toLowerCase())
        if (index !== -1) return;

        current.push({
          name: token.name,
          symbol: token.symbol,
          address: toChecksumAddress(token.address),
          decimals: token.decimals
        })

        set({ customTokenList: current })
        get().toggleToken(toChecksumAddress(token.address))
      },
      recentAddress: [],
      addRecentAddress: (address: string) => {
        const current = get().recentAddress.filter((a) => a.toLowerCase() !== address.toLowerCase())
        set({ recentAddress: [address, ...current] })
      },
      alreadySubmitDeviceID: false,
      toggleAlreadySubmitDeviceID: () => {
        set({ alreadySubmitDeviceID: !(get().alreadySubmitDeviceID) })
      },
      registeredWallet: [],
      addRegisteredWalelt: (address: string) => {
        const current = [...get().registeredWallet]
        if (current.includes(address)) return
        current.push(address)
        set({ registeredWallet: current })
      },
      appCheckToken: "",
      setAppCheckToken: (appCheckToken: string) => {
        set({ appCheckToken })
      },
      passwordTry: 0,
      setPasswordTry: (passwordTry: number) => {
        set({ passwordTry })
      },
      increasePasswordTry: () => {
        set({ passwordTry: get().passwordTry + 1 })
      },
      lockedUntil: 0,
      setLockedUntil: (lockedUntil: number) => {
        set({ lockedUntil })
      },
      subscribePromotion: true,
      setSubscribePromotion: (subscribePromotion: boolean) => {
        set({ subscribePromotion })
      },
      enableU2UConnect: false,
      setEnableU2UConnect: (enableU2UConnect: boolean) => {
        set({ enableU2UConnect })
      }
    }),
    {
      name: LOCAL_STORE_KEY, // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);