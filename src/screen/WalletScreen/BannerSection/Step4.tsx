import React from 'react'
import { Image, View } from 'react-native';
import Step4Illus from "../../../asset/images/wallet_steps/step4.png"
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import theme from '../../../theme';
import { useTranslation } from 'react-i18next';
import { usePreference } from '../../../hook/usePreference';
import { useNavigation } from '@react-navigation/native';

const Step3 = () => {
  const {preferenceTheme} = usePreference()
  const { t } = useTranslation();

  const navigation = useNavigation<any>()

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
          {t('bannerTitle4')}
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
          {t('bannerContent4')}
        </Text>
        <Button
          type='text'
          style={{justifyContent: 'flex-start'}}
          onPress={() => {
            navigation.navigate('DiscoverStack', {screen: 'Home'})
          }}
        >
          {t('exploreNow')}
        </Button>
      </View>
      <View>
        <Image
          source={Step4Illus}
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

export default Step3;
