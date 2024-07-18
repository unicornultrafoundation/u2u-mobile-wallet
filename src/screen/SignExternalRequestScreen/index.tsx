import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from '../../component/Text';
import { useGlobalStore } from "../../state/global";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View, Image } from "react-native";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import theme from "../../theme";
import { usePreferenceStore } from "../../state/preferences";
import { darkTheme, lightTheme } from "../../theme/color";
import { useTranslation } from "react-i18next";
import { SignRequestStatus, SignRequestType, useSignRequest } from "../../hook/useSignRequest";
import Toast from "react-native-toast-message";
import { useNetwork } from "../../hook/useNetwork";
import Button from "../../component/Button";
import { typography } from "../../theme/typography";
import SignMessageDetail from "./SignMessageDetail";
import SignTxDetail from "./SignTxDetail";
import { SvgUri } from "react-native-svg";
import { handleGoBack } from "../../util/navigation";

export default function SignExternalRequestScreen() {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const {t} = useTranslation()
  
  const navigation = useNavigation<any>()

  const route = useRoute<any>();
  const { setRouteName } = useGlobalStore();
  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );
  const signRequestID = route.params?.signRequestID || ""
  
  const {data, isLoading, approveSignRequest, rejectRequest} = useSignRequest(signRequestID)
  const {chainId, switchNetwork} = useNetwork()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!data || !data.session) return
    if (data.status === SignRequestStatus.STATUS_SIGNED) {
      Toast.show({
        type: 'error',
        text1: t('requestAlreadySigned'),
      })
      handleGoBack(navigation)
    }
    if (data.status === SignRequestStatus.STATUS_REJECTED) {
      Toast.show({
        type: 'error',
        text1: t('requestAlreadyRejected'),
      })
      handleGoBack(navigation)
    }
    if (data.status === SignRequestStatus.STATUS_EXPIRED) {
      Toast.show({
        type: 'error',
        text1: t('requestExpired'),
      })
      handleGoBack(navigation)
    }

    if (data.session.dAppMetadata.chainId && Number(chainId) !== data.session.dAppMetadata.chainId) {
      switchNetwork(data.session.dAppMetadata.chainId.toString())
    }
  }, [data, chainId])

  const handleConfirm = async () => {
    try {
      setLoading(true)
      const rs = await approveSignRequest()
      setLoading(false)
      console.log(rs)

      Toast.show({
        type: 'success',
        text1: t('signExternalRequestSuccess'),
      })
      navigation.navigate('Wallet')
    } catch (error) {
      setLoading(false)
      console.log(error)
      Toast.show({
        type: 'error',
        text1: t('signExternalRequestFail'),
      })
    }
  }

  const handleReject = async () => {
    try {
      setLoading(true)
      const rs = await rejectRequest()
      setLoading(false)
      console.log(rs)
      handleGoBack(navigation)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  if (isLoading || !data || !data.rawData) {
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
      >
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
    >
      <View style={[styles.screenHeader, {paddingVertical: 16, paddingHorizontal: 20}]}>
        <TouchableOpacity onPress={handleReject}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <Text
          style={[
            theme.typography.title3.bold,
            { flex: 1, textAlign: 'center', color: preferenceTheme.text.title }
          ]}>
          {data.type === SignRequestType.SIGN_MESSAGE ? t('signExternalRequestMessage') : t('signExternalRequestTx') }
        </Text>
        <View style={{width: 24, height: 24}} />
      </View>
      <View style={[styles.dappInfoContainer, {backgroundColor: '#1F2225'}]}>
        {data.session.dAppMetadata.logo ? (
          data.session.dAppMetadata.logo.includes('.svg') ? (
            <SvgUri
              uri={data.session.dAppMetadata.logo}
              width="100%"
              height="100%"
            />
          ) : (
            <Image source={{uri: data.session.dAppMetadata.logo}} style={{ width: 48, height: 48 }}/>
          )
        ) : (
          <Icon
            name='u2u'
            width={48}
            height={48}
          />
        )}
        <Text style={[typography.title3.regular, {color: preferenceTheme.text.disabled}]}>
          {data.session.dAppMetadata.name}
        </Text>
      </View>
      <View style={{flex: 1, marginHorizontal: 20}}>
        <Text style={[typography.headline.bold, preferenceTheme.text.title]}>
          {t('details')}
        </Text>
        {/* Tx Info section */}
        {data.type === SignRequestType.SIGN_MESSAGE ? <SignMessageDetail data={data} /> : <SignTxDetail data={data} />}
      </View>
      <View style={{flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingBottom: 32}}>
        <Button
          style={{
            borderRadius: 60,
            flex: 1,
            backgroundColor: '#1F2225',
          }}
          textStyle={theme.typography.label.medium}
          onPress={handleReject}
        >
          {t('reject')}
        </Button>
        <Button
          style={{borderRadius: 60, flex: 1}}
          textStyle={theme.typography.label.medium}
          onPress={handleConfirm}
          loading={loading}
        >
          {t('confirm')}
        </Button>
      </View>
    </SafeAreaView>
  )
}