import React from 'react';
import { useURC20TokenTxHistory } from './useURC20TokenTxHistory';
import { useNativeTokenTxHistory } from './useNativeTokenTxHistory';

export const useTokenTxHistory = (address: string, tokenAddress: string) => {
  if (tokenAddress !== '' && tokenAddress !== '0x') return useURC20TokenTxHistory(address, tokenAddress)
  return useNativeTokenTxHistory(address)
}