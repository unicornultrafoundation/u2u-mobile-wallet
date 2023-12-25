import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import React, { useCallback, useState } from 'react';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import TextInput from '../../component/TextInput';
import Button from '../../component/Button';
import { StepProps } from './index';
import { useTransaction } from '../../hook/useTransaction';
import { useTranslation } from 'react-i18next';
import { encodeTxData } from '../../util/contract';
import { ERC721_ABI } from '../../util/abis/erc721';
import { useWallet } from '../../hook/useWallet';
import Scanner from '../../component/QRCodeScanner';
import { isAddress } from 'ethers';
import theme from '../../theme';
import { getPhonePaddingBottom } from '../../util/platform';
import ErrorTextInput from '../../component/TextInput/ErrorTextInput';

const NFTTransferAddressStep = ({ onNextStep, onBack }: StepProps) => {
  const route = useRoute();
  const {t} = useTranslation()
  const styles = useStyles()
  const {wallet} = useWallet()
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const { setReceiveAddress, nftMeta, setTxData } = useTransaction()

  const [address, setAddress] = useState('')
  const [errorAddress, setErrorAddress] = useState('')
  const [showScanner, setShowScanner] = useState(false)

  const handleContinue = async (value: string) => {
    if (!isAddress(value)) {
      setErrorAddress('invalidAddress')
      return
    }
    setErrorAddress('')
    setReceiveAddress(nftMeta.nftCollection.id)

    const txData = await encodeTxData({
      contractAddress: nftMeta.nftCollection.id,
      abi: ERC721_ABI
    }, "transferFrom", [wallet.address, address, nftMeta.tokenID])

    setTxData(txData)
    onNextStep && onNextStep()
  }

  const handleScanSuccess = async (value: string) => {
    setAddress(value)
    handleContinue(value)
  }

  if (showScanner) {
    return (
      <Scanner
        onCancel={() => setShowScanner(false)}
        onSuccess={handleScanSuccess}
      />
    )
  }

  return (
    <KeyboardAvoidingView 
      style={{ padding: 16, flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={24}
    >
      <View style={[styles.row, { marginBottom: 24 }]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onBack}>
            <Icon name="arrow-left" width={24} height={24}/>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '700',
            letterSpacing: 0.38,
            textAlign: 'center',
          }}>
          {t('transfer')}
        </Text>

        <View style={{ flex: 1 }}/>
      </View>
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', marginBottom: 24}}>
        <Text
          style={{
            fontSize: 11,
            letterSpacing: 0.07,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          {t('nftTransferWarning')}
        </Text>
        {/* Todo: Fix input style */}
        <TextInput
          containerStyle={{ height: 48, marginTop: 24, marginBottom: 8 }}
          placeholder={t("enterWalletAddress")}
          value={address}
          onChangeText={(val) => setAddress(val)}
          postIcon={() => {
            return (
              <TouchableOpacity onPress={() => setShowScanner(true)}>
                <Icon name="scan" width={18} height={18} />
              </TouchableOpacity>
            )
          }}
        />
        {errorAddress && <ErrorTextInput error={t(errorAddress)} style={{justifyContent: 'center'}}/>}
      </View>
      <Button 
        style={{borderRadius: 60}}
        type="fill" 
        fullWidth 
        textStyle={theme.typography.label.large}
        onPress={() => handleContinue(address)}
      >
        {t('continue')}
      </Button>
    </KeyboardAvoidingView>
  );
};

export default NFTTransferAddressStep;
