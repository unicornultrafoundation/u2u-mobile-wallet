import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import { useTranslation } from 'react-i18next';
import Button from '../../component/Button';
import theme from '../../theme';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { SvgUri } from 'react-native-svg';
import { useTransactionStore } from '../../state/transaction';
import { formatNumberString, shortenAddress } from '../../util/string';
import Separator from '../../component/Separator';
import { useNetworkStore } from '../../state/network';
import { useWallet } from '../../hook/useWallet';

const ConfirmStep = ({onNextStep, onBack}: {
  onNextStep: () => void;
  onBack: () => void;
}) => {
  const {t} = useTranslation<string>()
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {receiveAddress, tokenMeta, amount} = useTransactionStore()
  const {name: networkName} = useNetworkStore()
  const {wallet} = useWallet()

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
        <View>
          <View style={[styles.cardContainer, {backgroundColor: preferenceTheme.background.surface}]}>
            <Text style={theme.typography.caption2.regular}>Send</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 8}}>
              <View style={{width: 24, height: 24}}>
                <SvgUri
                  uri={tokenMeta.logo}
                  width="100%"
                  height="100%"
                />
              </View>
              <Text style={[theme.typography.footnote.medium, {paddingHorizontal: 8}]}>
                {formatNumberString(amount)} {tokenMeta.symbol}
              </Text>
            </View>
            <Separator />
            <Text style={theme.typography.caption2.regular}>To</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 8}}>
              <Icon name="wallet-icon" width={24} height={24} />
              <Text style={[theme.typography.footnote.medium, {paddingHorizontal: 8, flex: 1}]}>
                {receiveAddress}
              </Text>
            </View>
          </View>
          <View style={[styles.cardContainer, {backgroundColor: preferenceTheme.background.surface}]}>
            <View style={styles.cardRow}>
              <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>EST fee</Text>
              <Text style={[theme.typography.footnote.regular]}>12 U2U</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>Max fee</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text style={[theme.typography.footnote.regular]}>12 U2U</Text>
                <Icon name="chevron-right" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.cardContainer, {backgroundColor: preferenceTheme.background.surface}]}>
            <View style={styles.cardRow}>
              <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>From</Text>
              <Text style={[theme.typography.footnote.regular]}>{shortenAddress(wallet.address, 8, 8)}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={[theme.typography.footnote.regular, {color: preferenceTheme.text.secondary}]}>Network</Text>
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
        >
          Confirm
        </Button>
      </View>
    </View>
  )
};

export default ConfirmStep;