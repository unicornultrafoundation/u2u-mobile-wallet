import React, { useMemo } from 'react'
import { Linking, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message';
import Text from '..//Text';
import { usePreference } from '../../hook/usePreference'
import Icon from '../Icon'
import theme from '../../theme';
import { useNetwork } from '../../hook/useNetwork';
import { useTranslation } from 'react-i18next';

export default function ToastComponent() {
  const {t} = useTranslation()
  const {blockExplorer} = useNetwork()
  const {preferenceTheme} = usePreference()
  const toastConfig = useMemo(() => {
    return {
      success: ({text1, text2, props}: any) => {
        return (
          <View
            style={{
              height: 60,
              width: '85%',
              padding: 12,
              borderRadius: 16,
              backgroundColor: preferenceTheme.background.surface,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16
            }}
          >
            <View style={{padding: 10, paddingRight: 0}}>
              <Icon name='success' height={32} width={32} />
            </View>
            <View style={{flex: 1, paddingHorizontal: 12}}>
              <Text
                style={[
                  theme.typography.body.bold,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {text1}
              </Text>
              {props.txHash && (
                <TouchableOpacity
                  style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}
                  onPress={() => {
                    Linking.openURL(`${blockExplorer}/tx/${props.txHash.toLowerCase()}`)
                  }}
                >
                  <Text
                    style={[
                      theme.typography.body.medium,
                      {
                        color: preferenceTheme.text.disabled
                      }
                    ]}
                  >
                    {t('detail')}
                  </Text>
                  <Icon name="chevron-right" width={18} height={18} />
                </TouchableOpacity>
              )}
            </View>
            {props.renderTrailing && props.renderTrailing()}
          </View>
        )
      },
      error: ({text1, text2, props}: any) => {
        return (
          <View
            style={{
              height: 60,
              width: '85%',
              padding: 12,
              borderRadius: 16,
              backgroundColor: preferenceTheme.background.surface,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16
            }}
          >
            <View style={{padding: 10}}>
              <Icon name='error' height={32} width={32} />
            </View>
            <View style={{flex: 1, paddingHorizontal: 12}}>
              <Text
                style={[
                  theme.typography.body.medium,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {text1}
              </Text>
              <Text
                style={[
                  theme.typography.body.medium,
                  {
                    color: preferenceTheme.text.disabled
                  }
                ]}
              >
                {text2}
              </Text>
            </View>
            {props.renderTrailing && props.renderTrailing()}
          </View>
        )
      },
      simpleNoti: ({text1, text2, props}: any) => {
        return (
          <View
            style={{
              height: 40,
              padding: 8,
              borderRadius: 12,
              backgroundColor: preferenceTheme.background.surface,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16
            }}
          >
            <View style={{flex: 1, paddingHorizontal: 12}}>
              <Text
                style={[
                  theme.typography.body.bold,
                  {
                    color: preferenceTheme.text.title,
                    textAlign: 'center'
                  }
                ]}
              >
                {text1}
              </Text>
              {props.txHash && (
                <TouchableOpacity
                  style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}
                  onPress={() => {
                    Linking.openURL(`${blockExplorer}/tx/${props.txHash.toLowerCase()}`)
                  }}
                >
                  <Text
                    style={[
                      theme.typography.body.medium,
                      {
                        color: preferenceTheme.text.disabled
                      }
                    ]}
                  >
                    {t('detail')}
                  </Text>
                  <Icon name="chevron-right" width={18} height={18} />
                </TouchableOpacity>
              )}
            </View>
            {props.renderTrailing && props.renderTrailing()}
          </View>
        )
      }
    }
  }, [preferenceTheme])

  return (
    <Toast config={toastConfig} />
  )
}