import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import { useTranslation } from 'react-i18next';
import Button from '../../component/Button';
import theme from '../../theme';
import { SvgUri } from 'react-native-svg';
import { formatNumberString, getDefaultWalletName, shortenAddress } from '../../util/string';
import Separator from '../../component/Separator';
import { useNetworkStore } from '../../state/network';
import { useWallet } from '../../hook/useWallet';
import { useTransaction } from '../../hook/useTransaction';
import BigNumber from 'bignumber.js';
import { useNativeBalance } from '../../hook/useNativeBalance';
import CustomGasModal from '../../component/CustomGasModal';
import { usePreference } from '../../hook/usePreference';

const ConfirmStep = ({onNextStep, onBack}: {
  onNextStep: () => void;
  onBack: () => void;
}) => {
  const {t} = useTranslation<string>()
  const {preferenceTheme} = usePreference()

  const {receiveAddress, tokenMeta, amount, estimatedFee, maxFee} = useTransaction()
  const {name: networkName} = useNetworkStore()
  const {wallet, getWalletMetadata} = useWallet()
  const {balance} = useNativeBalance(wallet.address)

  const [error, setError] = useState('')

  const handleConfirm = () => {
    setError("")
    const isNativeTx = tokenMeta.address.toLowerCase() === "0x" || tokenMeta.address.toLowerCase() === ""
    const balanceBN = BigNumber(balance)
    const rawAmount = isNativeTx ? amount : "0"
    if (balanceBN.minus(estimatedFee).minus(rawAmount).lt(0)) {
      setError('Insufficient balance for transaction fee')
      return;
    }

    onNextStep()
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>{t('confirmTransactionInfo')}</Text>
        </View>
        <View />
      </View>
  
      <View style={styles.bodyContainer}>
        <View style={{gap: 4, flex: 1}}>
          <View style={[styles.cardContainer, {backgroundColor: preferenceTheme.background.surface}]}>
            <Text style={theme.typography.caption2.regular}>{t('send')}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 8}}>
              <View style={{width: 24, height: 24}}>
                <SvgUri
                  uri={"https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"}
                  width="100%"
                  height="100%"
                />
              </View>
              <Text style={[theme.typography.footnote.medium, {paddingHorizontal: 8, flex: 1}]}>
                {formatNumberString(amount)} {tokenMeta.symbol}
              </Text>
            </View>
            <Separator />
            <Text style={theme.typography.caption2.regular}>{t('to')}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 8}}>
              <Icon name="wallet-icon" width={24} height={24} />
              <Text style={[theme.typography.footnote.medium, {paddingHorizontal: 8, flex: 1}]}>
                {receiveAddress} 
              </Text>
            </View>
          </View>
          <View style={[styles.cardContainer, {backgroundColor: preferenceTheme.background.surface}]}>
            <View style={[styles.cardRow, {gap: 8}]}>
              <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>{t('estFee')}</Text>
              <Text style={[theme.typography.footnote.regular, { flex: 1, textAlign: 'right' }]}>{estimatedFee} U2U</Text>
            </View>
            <View style={[styles.cardRow, {gap: 8}]}>
              <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>{t('maxFee')}</Text>
              <View style={{flex: 1}}>
                <CustomGasModal
                  trigger={() => {
                    return (
                      <View style={{flexDirection: 'row'}}>
                        <Text 
                          style={[theme.typography.footnote.regular, {flex: 1, textAlign: 'right'}]}
                          numberOfLines={1}
                          adjustsFontSizeToFit
                        >   
                          {maxFee} U2U
                        </Text>
                        <Icon name="chevron-right" />
                      </View>
                    )
                  }}
                />
              </View>
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
                {t(error)}
              </Text>
            </View>
          )}
          <View style={[styles.cardContainer, {backgroundColor: preferenceTheme.background.surface}]}>
            <View style={styles.cardRow}>
              <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>{t('wallet')}</Text>
              <View style={{flexDirection: 'column', flex: 1, gap: 2}}>
                <Text style={[theme.typography.footnote.regular, {textAlign: 'right'}]}>
                  {getWalletMetadata(wallet).name || getDefaultWalletName(wallet)}
                </Text>
                <Text style={[theme.typography.footnote.small, {color: preferenceTheme.text.secondary, textAlign: 'right'}]}>
                  {shortenAddress(wallet.address, 8, 8)}
                </Text>
              </View>
            </View>
            <View style={styles.cardRow}>
              <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>{t('network')}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name='u2u' width={16} height={16} />
                <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.title, paddingLeft: 4}]}>
                  {networkName}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Button
          style={{borderRadius: 60}}
          textStyle={theme.typography.label.medium}
          onPress={handleConfirm}
        >
          {t('confirm')}
        </Button>
      </View>
    </View>
  )
};

export default ConfirmStep;