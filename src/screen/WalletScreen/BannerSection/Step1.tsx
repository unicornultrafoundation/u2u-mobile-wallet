import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, View } from 'react-native';
import Step1Illus from "../../../asset/images/wallet_steps/step1.png"
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import theme from '../../../theme';
import { useTranslation } from 'react-i18next';
import { useClaimMembershipNFT } from '../../../hook/useClaimMembershipNFT';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import { isValidDevice } from '../../../util/platform';
import { usePreference } from '../../../hook/usePreference';
import { useWallet } from '../../../hook/useWallet';
import { useTracking } from '../../../hook/useTracking';
import { useRemoteConfig } from '../../../hook/useRemoteConfig';

const Step1 = () => {
  const {preferenceTheme} = usePreference()

  const { t } = useTranslation();
  const { submitClaimRequest, claimRequest, refetchClaimRequest } = useClaimMembershipNFT()
  const { deviceID } = useTracking()
  const { wallet } = useWallet()
  const { remoteConfig } = useRemoteConfig()

  const [alreadySubmitted, setAlreadySubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [claimMessageKey, setClaimMessageKey] = useState('')
  const alertError = () => {
    Toast.show({
      type: 'error',
      text1: t('deviceIsEmulator'),
    })
  }

  const handleClaimMembershipNFT = async () => {
    if (!isValidDevice()) {
      alertError()
      return;
    }
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
      await refetchClaimRequest()
    } else {
      if (rs.message === "already request") {
        setAlreadySubmitted(true)
      }
    }
  }

  useEffect(() => {
    if (!claimRequest.id) {
      setAlreadySubmitted(false)
      return
    }
    if (claimRequest.id) setAlreadySubmitted(true)

    if (claimRequest.walletToReceive === wallet.address) {
      setClaimMessageKey('alreadySent')
    } else if (claimRequest.device.deviceID === deviceID) {
      setClaimMessageKey('deviceAlreadyClaim')
    }

  }, [claimRequest, deviceID, wallet])

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
        {loading && remoteConfig.allowClaimMembership ? (
          <ActivityIndicator />
        ) : (
          <Button
            type='text'
            style={{justifyContent: 'flex-start'}}
            onPress={handleClaimMembershipNFT}
          >
            {alreadySubmitted ? (claimRequest.status === "completed" ? t(claimMessageKey) : t('alreadyClaimed') ) : t('claimNow')}
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
