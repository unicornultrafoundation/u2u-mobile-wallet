import Config from "react-native-config";

export const VALIDATOR_COMMISSION = 15
export const TABLE_LIMIT = 10;
export const GAS_LIMIT_HARD = 1000000
export const MIN_LOCKUP_DURATION = 0.03

export const APP_PASSWORD_RETRY_MAX = 5
export const APP_LOCK_TIME = 30 * 60 * 1000 // 30 minutes

export const NEWS_CATEGORY_ENDPOINT = `https://u2u.xyz/api/v1/categories`
export const ALL_NEWS_ENDPOINT = `https://u2u.xyz/api/v1/blog`
export const NEWS_BY_CATEGORY_ENDPOINT = `https://u2u.xyz/api/v1/blog/categories/`
export const NEWS_DETAIL_ENDPOINT = `https://u2u.xyz/api/v1/blog/find/`
export const FEATURED_NEWS_ENDPOINT = `https://u2u.xyz/api/v1/feature`

export const APP_FLYERS_DEV_KEY = Config.APP_FLYERS_DEV_KEY
export const APP_FLYERS_IOS_APP_ID = Config.APP_FLYERS_IOS_APP_ID

export const APP_REMOTE_CONFIG = Config.APP_REMOTE_CONFIG

export const DAPP_PROMOTION_NOTIFICATION_TOPIC = 'dapp-promotion'
export const NEWS_NOTIFICATION_TOPIC = 'news'