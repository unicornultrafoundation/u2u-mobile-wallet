import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native';
import Step1Illus from "../../../asset/images/wallet_steps/step1.png"
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import theme from '../../../theme';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { useTranslation } from 'react-i18next';
import { useClaimMembershipNFT } from '../../../hook/useClaimMembershipNFT';

const Step1 = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const { t } = useTranslation();
  const { submitClaimRequest, claimRequest } = useClaimMembershipNFT()

  const [alreadySubmitted, setAlreadySubmitted] = useState(false)

  const handleClaimMembershipNFT = async () => {
    if (alreadySubmitted) return;
    const rs = await submitClaimRequest()
    console.log(rs)
  }

  useEffect(() => {
    console.log(claimRequest)
    if (claimRequest) setAlreadySubmitted(true)
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
        <Button
          type='text'
          style={{justifyContent: 'flex-start'}}
          onPress={handleClaimMembershipNFT}
        >
          {alreadySubmitted ? t('alreadyClaimed') : t('claimNow')}
        </Button>
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
