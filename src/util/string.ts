import BigNumber from "bignumber.js";

export const truncate = (str: string, len: number) => {
  return `${str.substring(0, Math.min(len, str.length))}...`
}

export const shortenAddress = (str: string, head: number, tail: number) => {
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
  if (fragtionsCount) return (new BigNumber(numberString)).toFormat(fragtionsCount, roundMode)
  return (new BigNumber(numberString)).toFormat()
}

export const isNumber = (val: string) => {
  return /^\d+(,\d{3})*(\.\d*)?$/.test(val);
};

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