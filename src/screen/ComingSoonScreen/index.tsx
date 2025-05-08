import React from 'react'
import { Image, View } from 'react-native';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';
import COMING_SOON from '../../asset/images/coming_soon.png'
import theme from '../../theme';
import { getPhonePaddingTop } from '../../util/platform';
import { usePreference } from '../../hook/usePreference';

const ComingSoonScreen = () => {
  const {preferenceTheme} = usePreference()

  const {t} = useTranslation<string>()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: preferenceTheme.background.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: getPhonePaddingTop() + 54
      }}
    >
      <Text
        style={[
          theme.typography.title3.bold,
          {
            color: preferenceTheme.text.title
          }
        ]}
      >
        {t('comingSoon')}
      </Text>
      <Text
        style={[
          theme.typography.subheadline.regular,
          {
            color: preferenceTheme.text.title,
            marginTop: 4
          }
        ]}
      >
        {t('featureBeingCompleted')}
      </Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={COMING_SOON}
          style={{
            width: 166,
            height: 210,
            marginTop: 44,
          }}
        />
      </View>
    </View>
  )
}

export default ComingSoonScreen;
