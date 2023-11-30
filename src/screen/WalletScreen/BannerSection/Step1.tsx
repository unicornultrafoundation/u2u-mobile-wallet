import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, View } from 'react-native';
import Step1Illus from "../../../asset/images/wallet_steps/step1.png"
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import theme from '../../../theme';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { useTranslation } from 'react-i18next';
import { useClaimMembershipNFT } from '../../../hook/useClaimMembershipNFT';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';

const Step1 = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const { t } = useTranslation();
  const { submitClaimRequest, claimRequest } = useClaimMembershipNFT()

  const [alreadySubmitted, setAlreadySubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const alertError = () => {
    Toast.show({
      type: 'error',
      text1: t('deviceIsEmulator'),
    })
  }

  const handleClaimMembershipNFT = async () => {
    if (alreadySubmitted) return;

    const isEmulator = DeviceInfo.isEmulatorSync()
    if (isEmulator) {
      alertError()
      return;
    }
    
    setLoading(true)
    const rs = await submitClaimRequest()
    setLoading(false)
    if (rs.id) {
      setAlreadySubmitted(true)
    }
  }

  useEffect(() => {
    console.log('claimRequest', claimRequest.status)
    if (claimRequest.id) setAlreadySubmitted(true)
  }, [claimRequest])

  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12}}>
      <View style={{paddingRight: 60, flex: 1}}>
        <Text
          style={[
            theme.typography.caption2.regular,
            {
              color: theme.color.neutral[500],
              marginBottom: 3,
              textAlign: 'left'
            }
          ]}
        >
          {t('bannerTitle1')}
        </Text>
        <Text
          style={[
            theme.typography.body.regular,
            {
              color: preferenceTheme.text.primary,
              marginBottom: 23,
              textAlign: 'left'
            }
          ]}
        >
           {t('bannerContent1')}
        </Text>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            type='text'
            style={{justifyContent: 'flex-start'}}
            onPress={handleClaimMembershipNFT}
          >
            {alreadySubmitted ? (claimRequest.status === "completed" ? t('alreadySent') : t('alreadyClaimed') ) : t('claimNow')}
          </Button>
        )}
      </View>
      <View>
        <Image
          source={Step1Illus}
          width={117}
          height={94}
          resizeMode="contain"
          style={{
            width: 117,
            height: 94
          }}
        />
      </View>
    </View>
  )
}

export default Step1;
