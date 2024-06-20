import BigNumber from "bignumber.js";
import { Wallet } from "../state/wallet";

export const truncate = (str: string, len: number) => {
  return `${str.substring(0, Math.min(len, str.length))}...`
}

export const shortenAddress = (str: string, head: number, tail: number) => {
  if (!str || str === '') return ''
  return `${str.substring(0, head)}...${str.substring(str.length - tail)}`
}

export const getDigit = (val: string, editting = true) => {
  let result = '';
  let decimalPointExists = false
  for (let index = 0; index < val.length; index++) {
    const char = val.charAt(index);
    if (/\d/.test(char)) {
      result += char;
    } else if (char === '.' && !decimalPointExists) {
      result += char;
      decimalPointExists = true
    } else if (char === 'e' || char === '+' || char === '-') {
      result += char;
    }
  }
  if (result[0] === '0' && result[1] !== '.' && !editting) {
    result = result.slice(1);
  }
  if (result[result.length - 1] === '.' && !editting) {
    result = result.slice(0, result.length - 1)
  }
  return result;
};

export const formatNumberString = (numberString: string, fragtionsCount?: number, roundMode: BigNumber.RoundingMode = 1) => {
  if (!numberString) return '0'
  if (typeof numberString !== 'string') {
    numberString = (new BigNumber(numberString)).toFixed()
  }

  const fmt = {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: ''
  }
  BigNumber.config({ FORMAT: fmt })
  if (fragtionsCount || fragtionsCount === 0) return (new BigNumber(numberString)).toFormat(fragtionsCount, roundMode)
  return (new BigNumber(numberString)).toFormat()
}

export const isNumber = (val: string) => {
  return /^\d+(,\d{3})*(\.\d*)?$/.test(val);
};

export const parseNumberFormatter = (value: string) => {
  const digitFormatter = /^\d*\.?\d{0,}$/
  if (!digitFormatter.test(value)) return null
  value = value.replace(/^0+/, '')
  if (!value || value.startsWith('.')) {
    value = '0' + value
  }
  return value
}

export const parseFormatedNumberInput = (amount: string): string => {
  const digitOnly = getDigit(amount);
  if (digitOnly === '') {
    return '0';
  }
  if (isNumber(digitOnly)) {
    let formatedValue = formatNumberString(digitOnly);

    const [numParts, decimalParts] = digitOnly.split('.')
    if (!decimalParts && decimalParts !== "") {
      return formatedValue;
    }

    formatedValue = formatNumberString(numParts) + '.' + decimalParts

    return formatedValue;
  }

  return ''
}

export const parseIPFSFile = (rawURL: string) => {
  if (rawURL.startsWith("ipfs://")) {
    return rawURL.replace("ipfs://", "https://ipfs.io/ipfs/")
  }
  return rawURL
}

export const getPathIndex = (path: string) => {
  try {
    const idx =  Number(path.split('/').at(-1))
    if (Number.isNaN(idx)) return null
    return idx
  } catch {
    return null
  }
}

export const getDefaultWalletName = (wallet: Wallet) => {
  if (wallet.mnemonic === '') {
    return `Imported ${shortenAddress(wallet.address, 3, 3)}`
  }
  return `Address ${getPathIndex(wallet.path) ?? '--'}`
}

export const hexToString = (hex: string) => {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const hexValue = hex.substr(i, 2);
    const decimalValue = parseInt(hexValue, 16);
    str += String.fromCharCode(decimalValue);
  }
  return str;
}

export const isURL = (str: string) => {
  return /^(http|https):\/\//.test(str)
}

export const addHTTPS = (str: string) => {
  if (isURL(str)) return str
  return `https://${str}`
}

export const getSearchURL = (str: string) => {
  return `https://www.google.com/search?q=${str}`
}

export const isDomain = (str: string) => {
  const regex = new RegExp(/^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/);
  return regex.test(str)
}

export const getDomain = (fullURL: string) => {
  let domain
  //find & remove protocol (http, ftp, etc.) and get domain
  if (fullURL.indexOf('://') > -1) {
    domain = fullURL.split('/')[2];
  } else if (fullURL.indexOf('//') === 0) {
    domain = fullURL.split('/')[2];
  } else {
    domain = fullURL.split('/')[0];
  }

  return domain
}

export const getPredictedURLTypeFromRaw = (url: string) => {
  if (isDomain(url)) {
    return addHTTPS(url)
  } else if (!isURL(url)) {
    return getSearchURL(url)
  } else {
    return url
  }
}
