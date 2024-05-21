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
  api_endpoint: string;
}

export const SUPPORTED_CHAINS: NetworkConfig[] = [
  {
    chainID: "39",
    name: "Solaris Mainnet",
    rpc: "https://rpc-mainnet.uniultra.xyz",
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
    api_endpoint: "https://sa-backend.uniultra.xyz"
  },
  {
    chainID: "2484",
    name: "Testnet",
    rpc: "https://rpc-nebulas-testnet.uniultra.xyz",
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
    api_endpoint: "https://sa-backend-dev.uniultra.xyz"
    // api_endpoint: "http://192.168.1.38:3000"
  }
]

// {
//     isGroup: true,
//     name: 'Group name',
//     image: '',
//     collections: [
//         {
//             "id": "0x34AdaCBbb61AB0345094fFdFe2a6a737530BF155",
//             "name": "The Solar Adventure",
//             "image": "https://u2-adv-assets-dev.s3.ap-southeast-1.amazonaws.com/logo.png",
//             "banner": "https://u2-adv-assets-dev.s3.ap-southeast-1.amazonaws.com/banner.png",
//             "category": "Membership",
//             "graph": "https://subgraph.uniultra.xyz/subgraphs/name/u2u/solar_adventure",
//             "description": "Congratulations to all early supporters of Unicorn Ultra’s Adventure"
//         }
//     ]
// },