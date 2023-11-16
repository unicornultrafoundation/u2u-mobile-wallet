import { TouchableOpacity, View } from 'react-native';
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

  const handleContinue = async () => {
    setReceiveAddress(address)

    const txData = await encodeTxData({
      contractAddress: nftMeta.nftCollection.id,
      abi: ERC721_ABI
    }, "transferFrom", [wallet.address, address, nftMeta.tokenID])

    setTxData(txData)
    onNextStep && onNextStep()
  }

  const handleScanSuccess = async (value: string) => {
    setErrorAddress('')
    if (!isAddress(value)) {
      console.log('invalid QR data')
      return;
    }
    setAddress(value)
    handleContinue()
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
    <View style={{ padding: 16, flex: 1 }}>
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

      <View>
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
          containerStyle={{ height: 48, marginVertical: 24 }}
          placeholder={t("enterWalletAddress")}
          value={address}
          onChangeText={(val) => setAddress(val)}
          error={errorAddress}
          postIcon={() => {
            return (
              <TouchableOpacity onPress={() => setShowScanner(true)}>
                <Icon name="scan" width={18} height={18} />
              </TouchableOpacity>
            )
          }}
        />
      </View>

      <View style={{ flex: 1 }}/>

      <Button type="fill" fullWidth onPress={handleContinue}>
        {t('continue')}
      </Button>
    </View>
  );
};

export default NFTTransferAddressStep;
