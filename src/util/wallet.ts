import Web3 from 'web3'

export const generateNewWallet = () => {
  const web3 = new Web3()
  return web3.eth.accounts.create();
}