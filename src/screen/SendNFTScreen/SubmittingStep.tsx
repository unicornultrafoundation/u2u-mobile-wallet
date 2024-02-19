import { Image, View } from 'react-native';
import { StepProps } from './index';
import Text from '../../component/Text';
import SEND_ILLUS from '../../asset/images/send_tx.png';
import React, { useEffect, useState } from 'react';
import Button from '../../component/Button';
import { useTransaction } from '../../hook/useTransaction';
import TxDetail from '../../component/TxDetail';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import { logErrorForMonitoring } from '../../hook/useCrashlytics';

const NFTTransferSubmittingStep = ({ onNextStep, onBack }: StepProps) => {
  const navigation = useNavigation<any>()
  const {submitRawTx, txStatus, txHash, resetTxState, nftMeta} = useTransaction()
  const {t} = useTranslation()

  const handleSkipResult = () => {
    resetTxState()
    onBack && onBack()
  };

  useEffect(() => {
    (async () => {
      try {
        const txHash = await submitRawTx({receiveAddress: nftMeta.nftCollection.id})
        console.log('sented', txHash)
      } catch (error) {
        logErrorForMonitoring(error as any, "NFTTransferSubmittingStep error")
      }
    })()
  }, [])

  if (txHash) {
    return (
      <TxDetail
        txHash={txHash}
        onClose={() => {
          resetTxState()
          navigation.navigate("Wallet")
        }}
      />
    )
  }

  return (
    <View style={{ padding: 16, flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text
          color='title'
          style={[
            theme.typography.title3.bold,
            {textAlign: "center", marginBottom: 32}
          ]}
        >
          {t('transferSubmitted')}
        </Text>
        <Text
          color='secondary'
          style={[
            theme.typography.caption2.medium,
            {
              textAlign: 'center',
              marginHorizontal: 64,
              marginTop: 8,
              marginBottom: 42
            }
          ]}
        >
          {t('msgPleaseWaitAMomentOrSkipToCheckTransactionStatus')}
        </Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={SEND_ILLUS}
            style={{
              width: 182,
              height: 292,
              marginTop: 80,
            }}
          />
        </View>
      </View>

      <Button 
        style={{borderRadius: 60}}
        type="fill" 
        fullWidth 
        textStyle={theme.typography.label.large}
        onPress={handleSkipResult}
      >
        {t('skip')}
      </Button>
    </View>
  );
};

export default NFTTransferSubmittingStep;
