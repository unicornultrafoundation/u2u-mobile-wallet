import Web3 from 'web3'
// import '@ethersproject/shims';
import { ethers } from 'ethers';
import { estimateGasPriceUtil } from './blockchain';

export const generateNewWallet = () => {
  const web3 = new Web3()
  return web3.eth.accounts.create();
}

export const getWalletFromMnemonic = (
  mnemonic: string,
  index = 1
) => {
  const path = `m/44'/60'/0'/0/${index}`
  const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic.trim(), path);
  const privateKey = wallet.privateKey;
  const addressStr = wallet.address;

  return {
    address: addressStr,
    privateKey,
    mnemonic,
    path
  };
};

export const generateMnemonic = () => {
  const wallet = ethers.Wallet.createRandom();
  return wallet.mnemonic?.phrase;
};

export const signMessage = (message: string, privateKey: string) => {
  const web3 = new Web3()
  const {signature} = web3.eth.accounts.sign(message, privateKey)
  return signature
}

export const signTransaction = async (rawTx: Record<string, any>, privateKey: string, rpc: string) => {
  const web3 = new Web3(rpc)

  const signed = await web3.eth.accounts.signTransaction(rawTx, privateKey)
  return signed.rawTransaction
}

export const sendSignedTransaction = async (rpc: string, signedTx: string) => {
  const web3 = new Web3(rpc)
  const tx = await web3.eth.sendSignedTransaction(signedTx)
  return tx
}

export const getBalance = async (rpc: string, address: string) => {
  const web3 = new Web3(rpc)
  const rs = await web3.eth.getBalance(address)
  return rs.toString()
}

export const getNonce = async (rpc: string, address: string) => {
  const web3 = new Web3(rpc)
  const rs = await web3.eth.getTransactionCount(address)
  return rs.toString()
}