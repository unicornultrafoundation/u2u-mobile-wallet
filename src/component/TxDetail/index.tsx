import React, { useEffect, useMemo, useState } from 'react'
import { Image, Linking, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from '../../screen/SendTokenScreen/styles';
import Text from '../Text';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import Separator from '../Separator';
import { TransactionReceipt, TransactionResponse } from 'ethers'
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
import NormalTxMetaSection from './NormalTxMetaSection';
import { useSupportedTokens } from '../../hook/useSupportedTokens';
import ERC20TxMetaSection from './ERC20TxMetaSection';
import Toast from 'react-native-toast-message';

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
  const [loading, setLoading] = useState(true)

  const {supportedTokens} = useSupportedTokens()

  const [txReceipt, setTxReceipt] = useState<TransactionReceipt>()
  const [txDetail, setTxDetail] = useState<TransactionResponse>()
  const [timestamp, setTimestamp] = useState(0)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const [receipt, detail] = await Promise.all([fetchTxReceipt(txHash), fetchTxDetail(txHash)])
        setTxReceipt(receipt)
        setTxDetail(detail)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    })()
  }, [txHash])

  useEffect(() => {
    (async () => {
      if (!txReceipt) return
      const block = await fetchBlock(txReceipt.blockHash.toString())
      if (!block) return
      setTimestamp(
        Number(block.timestamp.toString())
      )
    })()
  }, [txReceipt])

  function handleCopied(value: string | null | undefined) {
    if (value == null) return
    Clipboard.setString(value)
    Toast.show({
      type: "simpleNoti",
      text1: t("msgCopied"),
      props: {
        width: '45%'
      }
    })
  }

  const gasUsed = useMemo(() => {
    return txReceipt ? txReceipt.gasUsed.toString() : '0'
  }, [txReceipt])

  const gasPrice = useMemo(() => {
    return txReceipt ? txReceipt.gasPrice!.toString() : '0'
  }, [txReceipt])

  const txValue = useMemo(() => {
    return txDetail && txDetail.value ? BigNumber(txDetail.value.toString()).dividedBy(10 ** 18).toFixed() : '0'
  }, [txDetail])

  const renderTxMeta = () => {
    if (!txReceipt || !txDetail) return null
    const tokenMetaItem = supportedTokens.find((i: Record<string, any>) => i.address.toLowerCase() === txReceipt.to!.toLowerCase())

    if (tokenMetaItem) {
      return <ERC20TxMetaSection tokenMeta={tokenMetaItem} txDetail={txDetail} />
    } 
    return <NormalTxMetaSection txValue={txValue} />
  }

  const renderItem = ({label, value, flex = 1} : {
    label: string,
    value: string,
    flex: number
  }) => {
    return (
      <View style={{flex: flex}}>
        <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary, marginBottom: 8}]}>
          {t(label)}
        </Text>
        <Text style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}>
          {value}
        </Text>
      </View>
    );
  }

  const renderCopyItem = ({label, displayValue, value, flex = 1} : {
    label: string,
    displayValue: string,
    value?: string,
    flex: number
  }) => {
    return (
      <View style={{flex: flex}}>
        <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary, marginBottom: 8}]}>
          {t(label)}
        </Text>
        { 
        !value 
          ? <Text style={theme.typography.caption1.medium}>{displayValue}</Text> 
          : <TouchableOpacity onPress={() => {
            handleCopied(value)
          }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[theme.typography.caption1.medium, {paddingRight: 5, width: 'auto'}]}>{displayValue}</Text>
              <Icon name='copy' width={16} height={16} color={"#8D8D8D"}/>
            </View>
          </TouchableOpacity>
        }
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <View>
          <Icon name={txReceipt?.status!.toString() === "1" ? 'success' : 'error'} width={24} height={24} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', flex: 1, paddingHorizontal: 8}}>
          <Text style={[styles.headerText]}>{txReceipt?.status!.toString() === "1" ? t('transactionSuccess') : t('transactionFailed')}</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <Icon name='close' width={24} height={24} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Separator/>{renderTxMeta()}<Separator/>
        <View style={{padding: 16}}>
          <View style={{paddingBottom: 20}}>
            <Text style={[{paddingBottom: 8, color: preferenceTheme.text.secondary}, theme.typography.caption2.regular]}>{t('from')}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {txReceipt && <Text style={theme.typography.caption1.medium}>{shortenAddress(txReceipt.from, 10, 10) }</Text>}
              <TouchableOpacity onPress={() => handleCopied(txReceipt?.from)}>
                <Icon name='copy' width={16} height={16} color={"#8D8D8D"} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={[{paddingBottom: 8, color: preferenceTheme.text.secondary}, theme.typography.caption2.regular]}>{t('to')}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {txReceipt && <Text style={theme.typography.caption1.medium}>{shortenAddress(txReceipt.to!, 10, 10) }</Text>}
              <TouchableOpacity onPress={() => handleCopied(txReceipt?.to)}>
                <Icon name='copy' width={16} height={16} color={"#8D8D8D"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Separator/>
        <View style={{paddingHorizontal: 16}}>
          <View style={{flexDirection: 'row', paddingTop: 8, paddingBottom: 12}}>
            {renderItem({
              label: 'time', 
              value: formatDate(timestamp * 1000, "dd/MM/yyyy, HH:mm:ss"), 
              flex: 2,
            })}
            {renderItem({
              label: 'type', 
              value: txReceipt?.from.toLowerCase() === wallet.address.toLowerCase() ? t('Send') : t('Receive'), 
              flex: 1,
            })}
          </View>
          <Separator/>
          <View style={{flexDirection: 'row', paddingTop: 8, paddingBottom: 12}}>
            {renderItem({
              label: 'networkFee', 
              value: `${txReceipt? (BigNumber(gasUsed).multipliedBy(gasPrice)).dividedBy(10 ** 18).toFixed() : '--'} U2U`,
              flex: 2,
            })}
            {renderItem({
              label: 'network', 
              value: name,
              flex: 1,
            })}
          </View>
          <Separator/>
          <View style={{flexDirection: 'row', paddingTop: 8, paddingBottom: 12}}>
            {renderCopyItem({
              label: 'transactionHash', 
              displayValue: txReceipt? shortenAddress(txReceipt.hash.toString(), 10, 10) : '--',
              value: txReceipt?.hash.toString(),
              flex: 2,
            })}
            {renderItem({
              label: 'block', 
              value: txReceipt ? txReceipt.blockNumber.toString() : '--',
              flex: 1,
            })}
          </View>
          <Separator/>
          <TouchableOpacity
            style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
            onPress={() => {
              Linking.openURL(`${blockExplorer}/tx/${txReceipt?.hash.toString().toLowerCase()}`)
            }}
          >
            <Text style={[theme.typography.label.large, {color: preferenceTheme.text.title}]}>
              {t('viewOnBlockchainExplorer')}
            </Text>
            <Icon name="chevron-right" width={18} height={18} />
          </TouchableOpacity>
          <View style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 18}}>
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
      </ScrollView>
    </View>
  )
}

export default TxDetail;
