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

export const signTypedData = async (
  {domain, types, message, primaryType}: {
    domain: ethers.TypedDataDomain,
    types: Record<string, Array<ethers.TypedDataField>>,
    message: Record<string, any>,
    primaryType?: string
  }, 
  privateKey: string
) => {
  const signer = new ethers.Wallet(privateKey)
  
  // In ethers v6, signTypedData only accepts domain, types, and message
  // The primaryType is handled internally by ethers or should be included in the types structure
  // If you need to specify a primaryType, ensure it's the first key in your types object
  // or ethers will automatically determine it from the message structure

  const finalTypes: Record<string, Array<ethers.TypedDataField>> = {}
  if (primaryType) {
    finalTypes[primaryType] = types[primaryType]
  }

  Object.keys(types).forEach(key => {
    if (!finalTypes[key]) {
      finalTypes[key] = types[key]
    }
  })

  const signature = await signer.signTypedData(domain, finalTypes, message)
  return signature
}

export const signMessage = async (message: string, privateKey: string) => {
  const signer = new ethers.Wallet(privateKey)
  const signature = await signer.signMessage(message);

  return signature
}

export const signTransaction = async (rawTx: Record<string, any>, privateKey: string) => {
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
    mnemonic: '',
    path: ''
  };
}