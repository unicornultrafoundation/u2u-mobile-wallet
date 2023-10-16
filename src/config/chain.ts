export interface NetworkConfig {
  chainID: string;
  name: string;
  rpc: string;
  explorerURL: string;
  currency: string;
  suppoted_tokens_endpoint: string;
  remote_config_endpoint: string;
}

export const SUPPORTED_CHAINS: NetworkConfig[] = [
  {
    chainID: "39",
    name: "Mainnet",
    rpc: "https://rpc-mainnet.uniultra.xyz",
    explorerURL: "https://u2uscan.xyz/",
    currency: "U2U",
    suppoted_tokens_endpoint: "https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/mobile_config/supported_tokens_mainnet.json",
    remote_config_endpoint: "https://raw.githubusercontent.com/phongnhat19/explorer-assets/master"
  },
  {
    chainID: "2484",
    name: "Testnet",
    rpc: "https://rpc-nebulas-testnet.uniultra.xyz",
    explorerURL: "https://testnet.u2uscan.xyz",
    currency: "U2U",
    suppoted_tokens_endpoint: "https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/mobile_config/supported_tokens.json",
    remote_config_endpoint: "https://raw.githubusercontent.com/phongnhat19/explorer-assets/master"
  }
]