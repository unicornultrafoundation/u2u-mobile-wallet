import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toChecksumAddress } from 'ethereum-checksum-address'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  addCustomToken: (token: TokenMeta) => void
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
      }
    }),
    {
      name: "local-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);