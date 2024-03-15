import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { TransactionResponse } from 'ethers';
import Text from '../Text';
import theme from '../../theme';
import { decodeTxData, findABIFragment } from '../../util/contract';
import BigNumber from 'bignumber.js';
import { ERC20_ABI } from '../../util/abis/erc20';
import { usePreference } from '../../hook/usePreference';
import { logErrorForMonitoring } from '../../hook/useCrashlytics';

const ERC20TxMetaSection = ({tokenMeta, txDetail}: {
  tokenMeta: Record<string, any>;
  txDetail: TransactionResponse
}) => {
  const {preferenceTheme} = usePreference()

  // const [decodedParams, setDecodedParams] = useState<Record<string, any>>({})
  const [amount, setAmount] = useState("0")

  useEffect(() => {
    (async () => {
      if (!txDetail || !txDetail.data) return
      try {
        const fragment = findABIFragment("function", "transfer", ERC20_ABI)
        if (!fragment) return;
        const rs = decodeTxData(fragment.inputs as any, txDetail.data.toString())
        const _amount = (rs.amount as any).toString() || "0"

        setAmount(BigNumber(_amount as string).dividedBy(10 ** tokenMeta.decimals).toFormat())
      } catch (error) {
        logErrorForMonitoring(error as any, "Error ERC20TxMetaSection")
      }
    })()
  }, [txDetail])

  return (
    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
      <View style={{width: 32, height: 32}}>
        <SvgUri
          uri={tokenMeta.logo}
          width="100%"
          height="100%"
        />
      </View>
      <Text
          style={[
            theme.typography.title3.medium,
            {
              marginLeft: 6,
              color: preferenceTheme.text.title
            }
          ]}
      >
        -{' '}{amount} {tokenMeta.symbol}
      </Text>
    </View>
  )
}

export default ERC20TxMetaSection;
