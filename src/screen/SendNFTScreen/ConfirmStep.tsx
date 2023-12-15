import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { StepProps } from './index';
import { useStyles } from './styles';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import React, { useEffect, useState } from 'react';
import Separator from '../../component/Separator';
import U2UIcon from '../../asset/icon/u2u_wallet_icon.png';
import Button from '../../component/Button';
import { useTransaction } from '../../hook/useTransaction';
import { getDefaultWalletName, parseIPFSFile, shortenAddress } from '../../util/string';
import { useNetwork } from '../../hook/useNetwork';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import { useWallet } from '../../hook/useWallet';
import CustomGasModal from '../../component/CustomGasModal';
import BigNumber from 'bignumber.js';
import { useNativeBalance } from '../../hook/useNativeBalance';

const NFTTransferConfirmStep = ({ onNextStep, onBack }: StepProps) => {
  const styles = useStyles();

  const {networkConfig} = useNetwork()
  const {nftMeta, receiveAddress, maxFee, estimatedFee, estimateGasLimit} = useTransaction()

  const {t} = useTranslation()

  const {wallet, getWalletMetadata} = useWallet()
  const {balance} = useNativeBalance(wallet.address)

  const [error, setError] = useState('')

  useEffect(() => {
    estimateGasLimit()
  }, [])

  const handleConfirm = () => {
    if (!onNextStep) return
    setError("")
    const balanceBN = BigNumber(balance)
    if (balanceBN.minus(estimatedFee).lt(0)) {
      setError("msgInsufficientBalanceForTransactionFee")
      return;
    }

    onNextStep()
  }

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <View style={[styles.row, { marginBottom: 24 }]}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-left" width={24} height={24}/>
        </TouchableOpacity>
        <Text
          style={[
            theme.typography.title3.bold,
            styles.screenTitle
          ]}
        >
          {t('transfer')}
        </Text>
      </View>
      <ScrollView style={{flex: 1}} contentContainerStyle={{gap: 16}} showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.card}>
          <Image
            source={{ uri: parseIPFSFile(nftMeta.image) }}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              minHeight: 280,
              borderRadius: 6,
            }}
          />

          <View style={{marginTop: 6}}>
            <Text color="primary" style={theme.typography.caption1.medium}>
              {nftMeta.nftCollection.name}
            </Text>
            <Text color="title" style={theme.typography.label2.bold}>
              #{nftMeta.tokenID}
            </Text>
          </View>
          <Separator style={{ marginVertical: 8 }}/>
          <View style={{gap: 2}}>
            <Text color="primary" fontSize={11} letterSpacing={0.07}>
              {t('to')}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center'}}>
              <Icon name="wallet-icon" width={24} height={24}/>
              <Text color="primary" style={[theme.typography.caption1.regular, {flex: 1}]}>
                {shortenAddress(receiveAddress, 10, 10)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, {gap: 12}]}>
          <View style={styles.row}>
            <Text color="secondary" style={theme.typography.footnote.regular}>
              {t('estFee')}
            </Text>

            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text color="title" style={[theme.typography.footnote.regular, {textAlign: 'right'}]}>
                {estimatedFee} U2U
              </Text>
              {/* <Text fontSize={11} letterSpacing={0.07} color="primary">
                ≈ $10.014.4
              </Text> */}
            </View>
          </View>

          <View style={styles.row}>
            <Text color="secondary" style={theme.typography.footnote.regular}>
              {t('maxFee')}
            </Text>
            <CustomGasModal
              trigger={() => {
                return (
                  <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                    <Text color="title" style={[theme.typography.footnote.regular, {flex: 1, textAlign: 'right'}]}>
                      {maxFee} U2U
                    </Text>
                    <Icon
                      name="chevron-right"
                      width={16}
                      height={16}
                    />
                  </View>
                )
              }}
            />
          </View>
        </View>
        {error && (
          <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <Icon name='error' width={18} height={18} />
            <Text style={[
              theme.typography.caption2.regular,
              {
                color: theme.accentColor.error.normal,
                flex: 1,
              }
            ]}>
              {t(error)}
            </Text>
          </View>
        )}
        <View style={[styles.card, {gap: 12}]}>
          <View style={styles.row}>
            <Text color="secondary" style={theme.typography.footnote.regular}>{t('wallet')}</Text>
            <View style={{flexDirection: 'column', flex: 1, gap: 2}}>
              <Text color="title" style={[theme.typography.footnote.regular, {textAlign: 'right'}]}>
                {getWalletMetadata(wallet).name || getDefaultWalletName(wallet)}
              </Text>
              <Text color="secondary"  style={[theme.typography.footnote.small, {textAlign: 'right'}]}>
                {shortenAddress(wallet.address, 8, 8)}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text color="secondary" style={theme.typography.footnote.regular}>
              {t('network')}
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Image source={U2UIcon} style={{ width: 16, height: 16 }}/>
              <View style={{flexShrink: 1}}>
                <Text color="title" style={[theme.typography.footnote.regular]}>
                  {networkConfig?.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{paddingTop: 16}}>
        <Button
          type="fill"
          fullWidth
          onPress={handleConfirm}
          style={{borderRadius: 60}}
          textStyle={theme.typography.label.large}
        >
          {t('confirm')}
        </Button>
      </View>
    </View>
  );
};

export default NFTTransferConfirmStep;
