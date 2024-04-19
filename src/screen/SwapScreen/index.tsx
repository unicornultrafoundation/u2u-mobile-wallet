import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './styles';
import { usePreference } from "../../hook/usePreference";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "../../state/global";
import Text from "../../component/Text";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from "react-native";
import Icon from "../../component/Icon";
import TextInput from '../../component/TextInput';
import { typography } from "../../theme/typography";
import { useURC20Metadata } from "../../hook/useURC20Metadata";
import { useSupportedTokens } from "../../hook/useSupportedTokens";
import { SvgUri } from "react-native-svg";
import { CachedImage } from "@georstat/react-native-image-cache";
import { useWallet } from "../../hook/useWallet";
import { useTokenBalance } from "../../hook/useTokenBalance";
import { formatNumberString } from "../../util/string";
import Button from "../../component/Button";
import SelectTokenModal from "../../component/SelectTokenModal";
import { useDexTokens } from "../../hook/useDexTokens";

export default function SwapScreen() {
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const {t} = useTranslation()
  const {wallet} = useWallet()

  // const {getLogo} = useSupportedTokens()
  const {getLogo} = useDexTokens()

  const [tokenFrom, setTokenFrom] = useState('0x4ebbe24182e9c14e1d2e02ab9459190f39c43b6f')
  const [tokenFromValue, setTokenFromValue] = useState('')
  const {symbol: symbolFrom, decimals: decimalsFrom} = useURC20Metadata(tokenFrom)
  const {balance: balanceFrom} = useTokenBalance(wallet.address, tokenFrom, decimalsFrom)

  const [tokenTo, setTokenTo] = useState('0xdfae88f8610a038afcdf47a5bc77c0963c65087c')
  const [tokenToValue, setTokenToValue] = useState('')

  const {symbol: symbolTo, decimals: decimalsTo} = useURC20Metadata(tokenTo)
  const {balance: balanceTo} = useTokenBalance(wallet.address, tokenTo, decimalsTo)

  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  const renderTokenLogo = (uri: string) => {
    if (uri.endsWith(".svg")) {
      return (
        <View style={{ width: 20, height: 20, borderRadius: 10 }}>
          <SvgUri
            uri={uri}
            width="100%"
            height="100%"
          />
        </View>
      )
    } else {
      return (
        <CachedImage
          source={uri}
          style={{ width: 20, height: 20, borderRadius: 10 }}
          thumbnailSource="https://via.placeholder.com/20x20"
        />
      )
    }
  }

  return (
    <SafeAreaView style={[
      styles.container,
      {backgroundColor: preferenceTheme.background.background}
    ]}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={24}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-left" width={24} height={24} />
          </TouchableOpacity>
          <Text
            style={[
              typography.title3.bold,
              {
                color: preferenceTheme.text.primary
              }
            ]}
          >
            {t('swap')}
          </Text>
          <View />
        </View>
        <View style={{gap: 16, flex: 1}}>
          <View style={{gap: 2}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>{t('from')}</Text>
              <Text>{t('balance')}: {formatNumberString(balanceFrom, 4)}</Text>
            </View>
            <TextInput
              value={tokenFromValue}
              onChangeText={setTokenFromValue}
              containerStyle={{width: '100%'}}
              preIcon={() => {
                return (
                  <SelectTokenModal
                    onSelect={(tokenObj: any) => {
                      setTokenFrom(tokenObj.address)
                    }}
                    trigger={() => {
                      return (
                        <View
                          style={styles.tokenSelectorContainer}
                        >
                          {renderTokenLogo(getLogo(tokenFrom))}
                          <Text>{symbolFrom}</Text>
                          <Icon name="chevron-down" width={16} height={16} />
                        </View>
                      )
                    }}
                  />
                )
              }}
            />
          </View>
          <View style={{gap: 2}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>{t('to')}</Text>
              <Text style={[{color: preferenceTheme.text.title}]}>{t('balance')}: {formatNumberString(balanceTo, 4)}</Text>
            </View>
            <TextInput
              value={tokenToValue}
              onChangeText={setTokenToValue}
              containerStyle={{width: '100%'}}
              preIcon={() => {
                return (
                  <SelectTokenModal
                    onSelect={(tokenObj: any) => {
                      setTokenTo(tokenObj.address)
                    }}
                    trigger={() => {
                      return (
                        <View
                          style={styles.tokenSelectorContainer}
                        >
                          {renderTokenLogo(getLogo(tokenTo))}
                          <Text>{symbolTo}</Text>
                          <Icon name="chevron-down" width={16} height={16} />
                        </View>
                      )
                    }}
                  />
                )
              }}
            />
          </View>
        </View>
        <Button>
          {t('swap')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}