export interface NetworkConfig {
  chainID: string;
  name: string;
  rpc: string;
  explorerURL: string;
  currency: string;
  suppoted_tokens_endpoint: string;
  remote_config_endpoint: string;
  stakingAddress: string;
  sfcSubgraph: string;
  u2uNetworkSubgraph: string;
  stakingGraphql: string;
  withdrawPeriodTime: number;
}

export const SUPPORTED_CHAINS: NetworkConfig[] = [
  {
    chainID: "39",
    name: "Mainnet",
    rpc: "https://rpc-mainnet.uniultra.xyz",
    explorerURL: "https://u2uscan.xyz/",
    currency: "U2U",
    suppoted_tokens_endpoint: "https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/mobile_config/supported_tokens_mainnet.json",
    remote_config_endpoint: "https://raw.githubusercontent.com/phongnhat19/explorer-assets/master",
    stakingAddress: "0xfc00face00000000000000000000000000000000",
    sfcSubgraph: "https://graph.uniultra.xyz/subgraphs/name/u2u/sfc-subgraph-v1",
    u2uNetworkSubgraph: "https://graph.uniultra.xyz/subgraphs/name/u2u/sfc-network",
    stakingGraphql: "https://staking-graphql.uniultra.xyz/graphql",
    withdrawPeriodTime: 604800,
  },
  {
    chainID: "2484",
    name: "Testnet",
    rpc: "https://rpc-nebulas-testnet.uniultra.xyz",
    explorerURL: "https://testnet.u2uscan.xyz",
    currency: "U2U",
    suppoted_tokens_endpoint: "https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/mobile_config/supported_tokens.json",
    remote_config_endpoint: "https://raw.githubusercontent.com/phongnhat19/explorer-assets/master",
    stakingAddress: "0xfc00face00000000000000000000000000000000",
    // sfcSubgraph: "https://subgraph.uniultra.xyz/subgraphs/name/u2u/sfc-subgraph",
    sfcSubgraph: "https://42a4-171-242-12-202.ngrok-free.app/subgraphs/name/u2u/sfc-subgraph",
    u2uNetworkSubgraph: "https://subgraph.uniultra.xyz/subgraphs/name/u2u/sfc-network",
    stakingGraphql: "https://testnet-staking-graphql.uniultra.xyz/graphql",
    withdrawPeriodTime: 604800,
  }
]