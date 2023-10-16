import Web3, { AbiInput, AbiParameter, HexString } from 'web3'

export const ERC20_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

interface ContractOptions {
  contractAddress: string
  abi: any
}

export const contractCall = async (options: ContractOptions, rpc: string, method: string, params: any) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
  const contractInstance = new web3.eth.Contract(options.abi, options.contractAddress);

  return (contractInstance.methods[method] as any)(params).call()
}

export const encodeTxData = async (options: ContractOptions, method: string, params: any) => {
  const web3 = new Web3();
  const contractInstance = new web3.eth.Contract(options.abi as any, options.contractAddress);

  return (contractInstance.methods[method] as any)(params).encodeABI()
}

export const decodeTxData = (abi: AbiInput[], bytes: HexString) => {
  const web3 = new Web3();

  return web3.eth.abi.decodeParameters(abi, `0x${bytes.substr(10)}`)
}