import Web3 from "web3";

export const estimateGasPriceUtil = async (rpc: string) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
  return web3.eth.getGasPrice()
}

export const estimateGasLimitUtil = async (txObject: Record<string, any>, rpc: string) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
  return web3.eth.estimateGas(txObject);
}

export const getTxReceipt = async (txHash: string, rpc: string) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
  return web3.eth.getTransactionReceipt(txHash);
}

export const getTxDetail = async (txHash: string, rpc: string) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
  return web3.eth.getTransaction(txHash);
}

export const getBlockDetail = async (blockHash: string, rpc: string) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
  return web3.eth.getBlock(blockHash);
}
