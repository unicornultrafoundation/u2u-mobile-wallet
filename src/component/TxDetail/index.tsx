import React, { useEffect, useMemo, useState } from 'react'
import { Image, Linking, TouchableOpacity, View } from 'react-native';
import { styles } from '../../screen/SendTokenScreen/styles';
import Text from '../Text';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import Separator from '../Separator';
import { Transaction, TransactionReceipt } from 'web3';
import { useTransaction } from '../../hook/useTransaction';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import theme from '../../theme';
import { useNetwork } from '../../hook/useNetwork';
import { formatDate } from '../../util/date';
import { useWallet } from '../../hook/useWallet';
import BigNumber from 'bignumber.js';
import { shortenAddress } from '../../util/string';
import TX_DETAIL from '../../asset/images/tx_detail.png'
import Clipboard from '@react-native-clipboard/clipboard';
import { SvgUri } from 'react-native-svg';

const TxDetail = ({txHash, onClose}: {
  txHash: string;
  onClose: () => void
}) => {
  const {wallet} = useWallet()
  const {name, blockExplorer} = useNetwork()
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  const { t } = useTranslation<string>()
  const { fetchTxReceipt, fetchTxDetail } = useTransaction()
  const { fetchBlock } = useNetwork()

  const [txReceipt, setTxReceipt] = useState<TransactionReceipt>()
  const [txDetail, setTxDetail] = useState<Transaction>()
  const [timestamp, setTimestamp] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const [receipt, detail] = await Promise.all([fetchTxReceipt(txHash), fetchTxDetail(txHash)])
        setTxReceipt(receipt)
        setTxDetail(detail)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [txHash])

  useEffect(() => {
    (async () => {
      if (!txReceipt) return
      const block = await fetchBlock(txReceipt.blockHash.toString())
      setTimestamp(
        Number(block.timestamp.toString())
      )
    })()
  }, [txReceipt])

  const gasUsed = useMemo(() => {
    return txReceipt ? txReceipt.gasUsed.toString() : '0'
  }, [txReceipt])

  const gasPrice = useMemo(() => {
    return txReceipt ? txReceipt.effectiveGasPrice!.toString() : '0'
  }, [txReceipt])

  const txValue = useMemo(() => {
    return txDetail && txDetail.value ? BigNumber(txDetail.value.toString()).dividedBy(10 ** 18).toFixed() : '0'
  }, [txDetail])

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <View>
          <Icon name='success' width={24} height={24} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', flex: 1, paddingHorizontal: 8}}>
          <Text style={[styles.headerText]}>{txReceipt?.status.toString() === "1" ? t('transactionSuccess') : t('transactionFailed')}</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <Icon name='close' width={24} height={24} />
        </TouchableOpacity>
      </View>

      <Separator />
      <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
        <View style={{width: 28, height: 28}}>
          <SvgUri
            uri={"https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"}
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
          -{' '}{txValue} U2U
        </Text>
      </View>
      <Separator />
      <View style={{padding: 16}}>
        <View style={{paddingBottom: 12}}>
          <Text style={[{paddingVertical: 8, color: preferenceTheme.text.secondary}, theme.typography.caption2.regular]}>From</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{txReceipt?.from}</Text>
            <TouchableOpacity
              onPress={() => txReceipt && Clipboard.setString(txReceipt.from)}
            >
              <Icon name='copy' width={16} height={16} color={"#8D8D8D"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingBottom: 12}}>
        <Text style={[{paddingVertical: 8, color: preferenceTheme.text.secondary}, theme.typography.caption2.regular]}>To</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{txReceipt?.to}</Text>
            <TouchableOpacity
              onPress={() => txReceipt && Clipboard.setString(txReceipt.to)}
            >
              <Icon name='copy' width={16} height={16} color={"#8D8D8D"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Separator />
      <View style={{paddingHorizontal: 16}}>
        <View style={{flexDirection: 'row', paddingVertical: 12}}>
          <View style={{flex: 2}}>
            <Text
              style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
            >
              Time
            </Text>
            <Text
              style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title, marginTop: 8}]}
            >
              {formatDate(timestamp * 1000, "dd/MM/yyyy, HH:mm:ss")}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
            >
              Type
            </Text>
            <Text
              style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title, marginTop: 8}]}
            >
              {txReceipt?.from.toLowerCase() === wallet.address.toLowerCase() ? "Send" : "Receive"}
            </Text>
          </View>
        </View>
        <Separator />
        <View style={{flexDirection: 'row', paddingVertical: 12}}>
          <View style={{flex: 2}}>
            <Text
              style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
            >
              Network fee
            </Text>
            <Text
              style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title, marginTop: 8}]}
            >
              {txReceipt? (BigNumber(gasUsed).multipliedBy(gasPrice)).dividedBy(10 ** 18).toFixed() : '--'} U2U
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
            >
              Network
            </Text>
            <Text
              style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title, marginTop: 8}]}
            >
              {name}
            </Text>
          </View>
        </View>
        <Separator />
        <View style={{flexDirection: 'row', paddingVertical: 12}}>
          <View style={{flex: 2}}>
            <Text
              style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
            >
              Transaction hash
            </Text>
            <Text
              style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title, marginTop: 8}]}
            >
              {txReceipt? shortenAddress(txReceipt.transactionHash.toString(), 10, 10) : '--'}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
            >
              Block
            </Text>
            <Text
              style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title, marginTop: 8}]}
            >
              {txReceipt ? txReceipt.blockNumber.toString() : '--'}
            </Text>
          </View>
        </View>
        <Separator />
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
          onPress={() => {
            Linking.openURL(`${blockExplorer}/tx/${txReceipt?.transactionHash.toString().toLowerCase()}`)
          }}
        >
          <Text
            style={[
              theme.typography.label.medium,
              {
                color: preferenceTheme.text.title
              }
            ]}
          >
            View on blockchain explorer
          </Text>
          <Icon name="chevron-right" width={18} height={18} />
        </TouchableOpacity>
        <View style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingTop: 18}}>
          <Image
            source={TX_DETAIL}
            resizeMode='contain'
            width={223}
            height={235}
            style={{
              width: 223,
              height: 235
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default TxDetail;
