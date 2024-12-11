import React, { useEffect } from 'react'
import { Image, View } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import SEND_ILLUS from '../../asset/images/send_tx.png'
import Button from '../../component/Button';
import { useTransaction } from '../../hook/useTransaction';
import TxDetail from '../../component/TxDetail';
import { useNavigation } from '@react-navigation/native';
import { usePreference } from '../../hook/usePreference';
import { logErrorForMonitoring } from '../../hook/useCrashlytics';
import { SafeAreaView } from 'react-native';

const DelegateStep = ({onSkip}: {
  onSkip: () => void
}) => {
  const {preferenceTheme} = usePreference()

  const navigation = useNavigation<any>()

  const {submitRawTx, txStatus, txHash, resetTxState} = useTransaction()

  const { t } = useTranslation<string>()

  const handleSkip = () => {
    resetTxState()
    onSkip()
  }

  useEffect(() => {
    (async () => {
      try {
        const txHash = await submitRawTx()
        console.log('sented', txHash)
      } catch (error) {
        logErrorForMonitoring(error as any, "DelegateStep error")
        console.log(error)
      }
    })()
  }, [])

  if (txHash) {
    return (
      <TxDetail
        txHash={txHash}
        onClose={() => {
          resetTxState()
          navigation.navigate("StakingDashboard")
        }}
      />
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <View />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>{t('transactionSubmitted')}</Text>
        </View>
        <View />
      </View>

      <View style={styles.bodyContainer}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={[
              theme.typography.caption2.medium,
              {
                color: preferenceTheme.text.secondary,
                textAlign: 'center',
                marginHorizontal: 64,
                marginTop: 8,
                marginBottom: 42
              }
            ]}
          >
            {t('msgPleaseWaitAMomentOrSkipToCheckTransactionStatus')} 
          </Text>

          <Image
            source={SEND_ILLUS}
            style={{
              width: 182,
              height: 292,
              marginTop: 80
            }}
          />
        </View>
        <Button
          style={{borderRadius: 60}}
          textStyle={theme.typography.label.medium}
          onPress={handleSkip}
        >
          {t('skip')}
        </Button>
      </View>
    </SafeAreaView>
  )
};

export default DelegateStep;
