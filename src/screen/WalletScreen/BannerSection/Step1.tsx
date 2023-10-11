import React from 'react'
import { Image, View } from 'react-native';
import Step1Illus from "../../../asset/images/wallet_steps/step1.png"
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import theme from '../../../theme';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';

const Step1 = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

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
          1/4 Explore U2U Wallet
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
          Take a tour with U2U Wallet to claim NFTs!
        </Text>
        <Button
          type='text'
          style={{justifyContent: 'flex-start'}}
        >
          Visit now
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
