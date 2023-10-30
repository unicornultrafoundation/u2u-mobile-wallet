import React, { useState } from 'react'
import { View } from 'react-native';
import Button from '../../../component/Button';
import theme from '../../../theme';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { useTranslation } from 'react-i18next';

const UnstakeSection = ({onCancel} : {
  onCancel: () => void
}) => {
  const {t} = useTranslation<string>()
  const [unstaking, setUnstaking] = useState(false)

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const handleUnstake = () => {

  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <View>
      <View></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 12}}>
        <Button
          onPress={handleUnstake}
          loading={unstaking}
          disabled={unstaking}
          color='primary'
          style={{
            borderRadius: 60,
            flex: 1,
            paddingVertical: 8
          }}
          textStyle={[
            theme.typography.label.medium,
            {
              color: preferenceTheme.text.title
            }
          ]}
        >
          {t('confirm')}
        </Button>
        <Button
          onPress={handleCancel}
          style={{
            borderRadius: 60,
            flex: 1,
            paddingVertical: 8,
            backgroundColor: preferenceTheme.background.surface
          }}
          textStyle={[
            theme.typography.label.medium,
            {
              color: preferenceTheme.text.disabled
            }
          ]}
        >
          {t('cancel')}
        </Button>
      </View>
    </View>
  )
}

export default UnstakeSection;
