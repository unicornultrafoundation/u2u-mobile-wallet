import React, { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import ReceiveTokenHeader from './ReceiveTokenHeader';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';
import theme from '../../theme';
import Separator from '../../component/Separator';
import Icon from '../../component/Icon';
import U2UIcon from '../../asset/icon/u2u_wallet_icon.png'
import { useWallet } from '../../hook/useWallet';
import QRCode from 'react-native-qrcode-svg';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';

const ReceiveTokenScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const { t } = useTranslation<string>()
  const { wallet } = useWallet()
  
  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  return (
    <View style={[
      styles.container,
      {backgroundColor: preferenceTheme.background.background}
    ]}>
      <ReceiveTokenHeader />
      <View style={{paddingVertical: 8, paddingHorizontal: 53}}>
        <Text
          style={[
            theme.typography.caption2.medium,
            {
              textAlign: 'center',
              color: preferenceTheme.text.secondary
            }
          ]}
        >
          {t('receiveTokenDescriptionPre')}
          <Text
            style={[
              theme.typography.caption2.bold,
              {
                color: preferenceTheme.text.primary
              }
            ]}
          >
            {t('chainName')}
          </Text>
          {t('receiveTokenDescriptionPost')}
        </Text>
      </View>
      <View style={{paddingTop: 24, paddingHorizontal: 16, flex: 1, justifyContent: 'space-between'}}>
        <View
          style={[
            styles.addressCard,
            {
              backgroundColor: preferenceTheme.background.surface
            }
          ]}
        >
          <View style={{flexDirection: 'row', paddingVertical: 16}}>
            <Icon name='u2u' width={32} height={32} />
            <View style={{paddingHorizontal: 8, flex: 1}}>
              <Text style={theme.typography.caption1.regular}>
                {wallet.address}
              </Text>
            </View>
            <TouchableOpacity>
              <Icon name='copy' width={16} height={16} color="#8D8D8D" />
            </TouchableOpacity>
          </View>
          <Separator style={{marginTop: 0}} />
          <View
            style={{
              paddingTop: 24,
              paddingHorizontal: 56,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <QRCode
                value={wallet.address}
                quietZone={16}
                size={228}
                logo={U2UIcon}
                logoMargin={4}
                logoSize={52}
                logoBorderRadius={28}
                logoBackgroundColor='#FFFFFF'
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{t('shareQRCode')}</Text>
          </TouchableOpacity>
          <View style={{height: '100%', width: 1, backgroundColor: '#FFF'}} />
          <TouchableOpacity style={{flex: 1, alignItems:  'center', justifyContent: 'center'}}>
            <Text>{t('setAmountQRCode')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

export default ReceiveTokenScreen;
