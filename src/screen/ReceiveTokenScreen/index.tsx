import React, { useCallback, useMemo, useState } from 'react'
import { TouchableOpacity, View, SafeAreaView } from 'react-native';
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
import SetAmountStep from './SetAmountStep';
import { formatNumberString } from '../../util/string';
import { SvgUri } from 'react-native-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

const ReceiveTokenScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const { t } = useTranslation<string>()
  const { wallet } = useWallet()

  const {params} = useRoute<any>();
  const tokenMeta = params?.tokenMeta || {}

  const [showingAmount, setShowingAmount] = useState(false)
  const [amount, setAmount] = useState('0')

  const qrValue = useMemo(() => {
    if (amount === '0') return wallet.address
    return JSON.stringify({
      address: wallet.address,
      amount,
      tokenMeta
    })
  }, [wallet, amount])
  
  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  const renderBody = () => {
    if (showingAmount) {
      return (
        <SetAmountStep
          handleBack={() => setShowingAmount(false)}
          setAmount={(newValue) => {
            if (newValue === '') setAmount('0')
            else setAmount(newValue)
          }}
          amount={amount}
          tokenMeta={tokenMeta}
        />
      )
    }
    return (
      <View style={{flex: 1}}>
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
            {amount === '0' ? t('receiveTokenDescriptionPre') : t('qrWithAmountWarningPre')}
            <Text
              style={[
                theme.typography.caption2.bold,
                {
                  color: preferenceTheme.text.primary
                }
              ]}
            >
              {amount === '0' ? t('chainName') : t('appName')}
            </Text>
            {amount === '0' ? t('receiveTokenDescriptionPost') : t('qrWithAmountWarningPost')}
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
              <View style={{width: 32, height: 32}}>
                <SvgUri
                  uri={tokenMeta.logo}
                  width="100%"
                  height="100%"
                />
              </View>
              <View style={{paddingHorizontal: 8, flex: 1}}>
                <Text style={theme.typography.caption1.regular}>
                  {wallet.address}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(wallet.address)
                  Toast.show({
                    type: "simpleNoti",
                    text1: t('msgCopied'),
                    props: {
                      width: '45%'
                    }
                  })
                }}
              >
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
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <QRCode
                  value={qrValue}
                  quietZone={16}
                  size={228}
                />
                <View style={{width: 56, height: 56, position: 'absolute', padding: 4, borderRadius: 28, backgroundColor: '#FFFFFF'}}>
                  <SvgUri
                    uri={tokenMeta.logo}
                    width="100%"
                    height="100%"
                  />
                </View>
              </View>
            </View>
            {amount !== '0' && (
              <View style={{marginTop: 24, justifyContent: 'center', alignItems: 'center'}}>
                <Text 
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={[
                    theme.typography.title1.medium, 
                    {color: preferenceTheme.text.title}
                  ]}
                >
                  {formatNumberString(amount)} {tokenMeta.symbol}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              <Icon name="share" width={18} height={18} />
              <Text
                style={[
                  theme.typography.label.medium,
                  {marginLeft: 8}
                ]}
              >
                {t('shareQRCode')}
              </Text>
            </TouchableOpacity>
            <View style={{height: '100%', width: 1, backgroundColor: '#FFF'}} />
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
              onPress={() => setShowingAmount(true)}
            >
              <Icon name="setting" width={18} height={18} />
              <Text
                style={[
                  theme.typography.label.medium,
                  {marginLeft: 8}
                ]}
              >
                {t('setAmountQRCode')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: preferenceTheme.background.background}
      ]}
    >
      {renderBody()}
    </SafeAreaView>
  )
};

export default ReceiveTokenScreen;
