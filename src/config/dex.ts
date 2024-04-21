export interface DexToken {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
}

export const DEX_SUPPORTED_TOKEN: Record<number, DexToken[]> = {
  39: [],
  2484: [
    {
      "name": "Unicorn Ultra",
      "address": "0x",
      "symbol": "U2U",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"
    },
    {
      "name": "USDT Token on U2U",
      "address": "0xdfae88f8610a038afcdf47a5bc77c0963c65087c",
      "symbol": "USDT",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0xdfae88f8610a038afcdf47a5bc77c0963c65087c.png"
    },
    {
      "name": "Wrapped Cardano",
      "address": "0xbeb74c0c2cc994c8fad7ba91fae15b5b748cd707",
      "symbol": "WADA",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0xbeb74c0c2cc994c8fad7ba91fae15b5b748cd707.png"
    },
    {
      "name": "Wrapped Binance Smart Chain",
      "address": "0x7bd3dc0e0e1e1ccce1657a18cbe32f13f9fc9376",
      "symbol": "WBNB",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0x7bd3dc0e0e1e1ccce1657a18cbe32f13f9fc9376.png"
    },
    {
      "name": "BTC Token on U2U",
      "address": "0x4ebbe24182e9c14e1d2e02ab9459190f39c43b6f",
      "symbol": "WBTC",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0x4ebbe24182e9c14e1d2e02ab9459190f39c43b6f.png"
    },
    {
      "name": "Wrapped Doge Coin",
      "address": "0xf25394ebb6d132d21bce902f759f592954e898cd",
      "symbol": "WDOGE",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0xf25394ebb6d132d21bce902f759f592954e898cd.png"
    },
    {
      "name": "ETH Token on U2U",
      "address": "0x94504f356a267f3a128c2e6387281bccdbd821a0",
      "symbol": "WETH",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0x94504f356a267f3a128c2e6387281bccdbd821a0.png"
    },
    {
      "name": "Wrapped Near",
      "address": "0xfd7ea8beabf2999dcf7f97a694b7fda60ac4bf20",
      "symbol": "WNEAR",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0xfd7ea8beabf2999dcf7f97a694b7fda60ac4bf20.png"
    },
    {
      "name": "Wrapped Solana",
      "address": "0xa4447a108e92b8c36de0fb310d43f95c54fc81e2",
      "symbol": "WSOL",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0xa4447a108e92b8c36de0fb310d43f95c54fc81e2.png"
    },
    {
      "address": "0x5b4aabd65701eeda8afe6e341cb23b52f2ef7e56",
      "chainId": 2484,
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0x5b4aabd65701eeda8afe6e341cb23b52f2ef7e56.png",
      "name": "Wrapped TRX",
      "symbol": "WTRX"
    },
    {
      "name": "Wrapped U2U",
      "address": "0xc5f15624b4256c1206e4bb93f2ccc9163a75b703",
      "symbol": "WU2U",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0xc5f15624b4256c1206e4bb93f2ccc9163a75b703.png"
    },
    {
      "name": "Wrapped XRP",
      "address": "0xcedb8ee7c0e21bdd78f46e334a33ed17189131d5",
      "symbol": "WXRP",
      "decimals": 18,
      "chainId": 2484,
      "logoURI": "https://raw.githubusercontent.com/u2u-eco/default-token-list/master/logos/network/2484/0xcedb8ee7c0e21bdd78f46e334a33ed17189131d5.png"
    }
  ]
}

export const FACTORY_ADDRESS_MAP: Record<number, `0x${string}`> = {
  2484: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
}

export const INIT_CODE_HASH_MAP: Record<number, `0x${string}`> = {
  2484: '0x34fe98aefc7b111647fe0dfe9c361b57b704a434f64c749daef6d539a8c086fc',
}