// import '@ethersproject/shims';
import { Wallet, ethers } from 'ethers';

export const getWalletFromMnemonic = (
  mnemonic: string,
  index = 0
) => {
  try {
    const path = `m/44'/60'/0'/0/${index}`
    const _mnemonic = ethers.Mnemonic.fromPhrase(mnemonic.trim());
    const wallet = ethers.HDNodeWallet.fromMnemonic(_mnemonic, path);
    // const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic.trim(), path)
    const privateKey = wallet.privateKey;
    const addressStr = wallet.address;
    return {
      address: addressStr,
      privateKey,
      mnemonic,
      path
    };
  } catch(e) {
    throw new Error(`Exception: ${e}`);
  }
};

export const generateMnemonic = () => {
  const wallet = ethers.Wallet.createRandom();
  return wallet.mnemonic?.phrase;
};

export const signMessage = async (message: string, privateKey: string) => {
  const signer = new ethers.Wallet(privateKey)
  const signature = await signer.signMessage(message);

  return signature
}

export const signTransaction = async (rawTx: Record<string, any>, privateKey: string, rpc: string) => {
  const signer = new ethers.Wallet(privateKey)
  const signedTx = await signer.signTransaction(rawTx);
  return signedTx
}

export const sendSignedTransaction = async (rpc: string, signedTx: string, wait = true) => {
  const provider = new ethers.JsonRpcProvider(rpc)
  const tx = await provider.broadcastTransaction(signedTx)

  if (wait) {
    const receipt = await provider.waitForTransaction(tx.hash)
    return receipt
  }

  return null
}

export const getBalance = async (rpc: string, address: string) => {
  const provider = new ethers.JsonRpcProvider(rpc)
  const rs = await provider.getBalance(address)
  return rs.toString()
}

export const getNonce = async (rpc: string, address: string) => {
  const provider = new ethers.JsonRpcProvider(rpc)
  const rs = await provider.getTransactionCount(address)
  return rs.toString()
}

export const getWalletFromPrivateKey = (privateKey: string) => {
  const wl = new Wallet(privateKey)

  return {
    address: wl.address,
    privateKey,
  };
}