import { create } from 'zustand'

interface TokenMeta {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  logo: string;
}

interface TransactionState {
  receiveAddress: string;
  setReceiveAddress: (address: string) => void;
  tokenMeta: TokenMeta;
  setTokenMeta: (tokenMeta: TokenMeta) => void;
  amount: string;
  setAmount: (amount: string) => void;
  gasPrice: string;
  setGasPrice: (gasPrice: string) => void;
  gasLimit: string;
  setGasLimit: (gasLimit: string) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  receiveAddress: '',
  setReceiveAddress: (address: string) => {
    set({ receiveAddress: address })
  },
  tokenMeta: {
    name: "",
    symbol: "",
    decimals: 0,
    address: "",
    logo: ""
  },
  setTokenMeta: (tokenMeta: TokenMeta) => set({ tokenMeta }),
  amount: '0',
  setAmount: (amount: string) => set({ amount }),
  gasPrice: '1000000000',
  setGasPrice: (gasPrice: string) => set({ gasPrice }),
  gasLimit: '29000',
  setGasLimit: (gasLimit: string) => set({ gasLimit }),
}))