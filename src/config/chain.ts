export interface NetworkConfig {
  chainID: string;
  name: string;
  rpc: string;
  explorerURL: string;
  currency: string;
  suppoted_tokens_endpoint: string;
  suppoted_nfts_endpoint: string;
  remote_config_endpoint: string;
  stakingAddress: string;
  sfcSubgraph: string;
  u2uNetworkSubgraph: string;
  stakingGraphql: string;
  withdrawPeriodTime: number;
  dappURL: string;
  ecosystemSettingURL: string;
  genesisWallet: string[];
  api_endpoint: string;
}

export const SUPPORTED_CHAINS: NetworkConfig[] = [
  {
    chainID: "39",
    name: "Solaris Mainnet",
    rpc: "https://rpc-mainnet.u2u.xyz",
    explorerURL: "https://u2uscan.xyz",
    currency: "U2U",
    suppoted_tokens_endpoint: "https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/mobile_config/supported_tokens_mainnet.json",
    remote_config_endpoint: "https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master",
    stakingAddress: "0xfc00face00000000000000000000000000000000",
    sfcSubgraph: "https://graph.u2u.xyz/subgraphs/name/u2u/sfc-subgraph-v1",
    u2uNetworkSubgraph: "https://graph.u2u.xyz/subgraphs/name/u2u/sfc-network",
    stakingGraphql: "https://staking-graphql.u2u.xyz/graphql",
    withdrawPeriodTime: 604800,
    dappURL: "https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/mobile_config/dapp_mainnet.json",
    ecosystemSettingURL: "https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/mobile_config/ecosystem_setting_mainnet.json",
    suppoted_nfts_endpoint: "https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/mobile_config/supported_nfts_mainnet.json",
    genesisWallet: ["0xDa86486EA632c5A3b43c166c8799ca1Ca942Fe30", "0x131Bf53E6eCd05d46D418E970488Fc3DeA295D34"],
    api_endpoint: "https://sa-backend.u2u.xyz"
  },
  {
    chainID: "2484",
    name: "Testnet",
    rpc: "https://rpc-nebulas-testnet.u2u.xyz",
    explorerURL: "https://testnet.u2uscan.xyz",
    currency: "U2U",
    suppoted_tokens_endpoint: "https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/mobile_config/supported_tokens.json",
    remote_config_endpoint: "https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master",
    stakingAddress: "0xfc00face00000000000000000000000000000000",
    sfcSubgraph: "https://subgraph.u2u.xyz/subgraphs/name/u2u/sfc-subgraph",
    u2uNetworkSubgraph: "https://subgraph.u2u.xyz/subgraphs/name/u2u/sfc-network",
    stakingGraphql: "https://testnet-staking-graphql.u2u.xyz/graphql",
    withdrawPeriodTime: 604800,
    dappURL: "https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/mobile_config/dapp.json",
    ecosystemSettingURL: "https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/mobile_config/ecosystem_setting.json",
    suppoted_nfts_endpoint: "https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/mobile_config/supported_nfts.json",
    genesisWallet: [],
    api_endpoint: "https://sa-backend-dev.u2u.xyz"
    // api_endpoint: "http://192.168.1.38:3000",
  }
]