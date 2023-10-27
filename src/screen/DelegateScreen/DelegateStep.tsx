import React, { useEffect } from 'react'
import { Image, View } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import SEND_ILLUS from '../../asset/images/send_tx.png'
import Button from '../../component/Button';
import { useTransaction } from '../../hook/useTransaction';
import TxDetail from '../../component/TxDetail';
import { useNavigation } from '@react-navigation/native';

const DelegateStep = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const navigation = useNavigation<any>()

  const {submitRawTx, txStatus, txHash, resetTxState} = useTransaction()

  const { t } = useTranslation<string>()

  const handleSkip = () => {
    navigation.navigate("Wallet")
  }

  useEffect(() => {
    (async () => {
      try {
        const txHash = await submitRawTx()
        console.log('sented', txHash)
      } catch (error) {
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
    <View style={{flex: 1}}>
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
            Please wait a moment or skip to check transaction status 
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
          Skip
        </Button>
      </View>
    </View>
  )
};

export default DelegateStep;
