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
import { parseIPFSFile, shortenAddress } from '../../util/string';
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

  const {wallet} = useWallet()
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
      setError('Insufficient balance for transaction fee')
      return;
    }

    onNextStep()
  }

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <View style={[styles.row, { marginBottom: 24 }]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onBack}>
            <Icon name="arrow-left" width={24} height={24}/>
          </TouchableOpacity>
        </View>

        <Text
          style={[
            theme.typography.title3.bold,
            styles.screenTitle
          ]}
        >
          {t('transfer')}
        </Text>

        <View style={{ flex: 1 }}/>
      </View>

      <ScrollView style={{ gap: 16, flex: 1 }} showsVerticalScrollIndicator={false} >
        <View style={[styles.card, { gap: 8 }]}>
          <Image
            source={{ uri: parseIPFSFile(nftMeta.image) }}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              minHeight: 330,
              borderRadius: 6,
            }}
          />

          <View>
            <Text color="primary" fontSize={12} fontWeight="500">
              {nftMeta.nftCollection.name}
            </Text>
            <Text fontSize={14} fontWeight="700">
              #{nftMeta.tokenID}
            </Text>
          </View>

          <Separator style={{ marginVertical: 8 }}/>

          <View>
            <Text color="primary" fontSize={11} letterSpacing={0.07}>
              {t('to')}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Icon name="wallet-icon" width={24} height={24}/>
              <Text fontSize={12}>
                {shortenAddress(receiveAddress, 10, 10)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text fontSize={14} letterSpacing={-0.08} color="primary">
                {t('estFee')}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text fontSize={14} letterSpacing={-0.08}>
                {estimatedFee} U2U
              </Text>
              {/* <Text fontSize={11} letterSpacing={0.07} color="primary">
                ≈ $10.014.4
              </Text> */}
            </View>
          </View>

          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <Text fontSize={14} letterSpacing={-0.08} color="primary">
              {t('maxFee')}
            </Text>
            <CustomGasModal
              trigger={() => {
                return (
                  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <Text style={[theme.typography.footnote.regular]}>
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
          <View style={{flexDirection: 'row', paddingBottom: 8, alignItems: 'center'}}>
            <Icon name='error' width={18} height={18} />
            <Text style={[
              theme.typography.caption2.regular,
              {
                color: theme.accentColor.error.normal,
                paddingLeft: 4
              }
            ]}>
              {error}
            </Text>
          </View>
        )}
        <View style={styles.card}>
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <Text fontSize={14} letterSpacing={-0.08} color="primary">
              {t('from')}
            </Text>

            <View style={{ alignItems: 'flex-end' }}>
              <Text fontSize={14} letterSpacing={-0.08}>
                {wallet.name || shortenAddress(wallet.address, 6, 6)}
              </Text>
              <Text fontSize={11} letterSpacing={0.07} color="primary">
                {shortenAddress(wallet.address, 6, 6)}
              </Text>
            </View>
          </View>

          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <Text fontSize={14} letterSpacing={-0.08} color="primary">
              {t('network')}
            </Text>

            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text fontSize={14} letterSpacing={-0.08}>
                {networkConfig?.name}
              </Text>
              <Image source={U2UIcon} style={{ width: 16, height: 16 }}/>
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
          textStyle={theme.typography.label.medium}
        >
          {t('confirm')}
        </Button>
      </View>
    </View>
  );
};

export default NFTTransferConfirmStep;
