import Web3 from 'web3'

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