import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from '../../component/Text';
import { useGlobalStore } from "../../state/global";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import theme from "../../theme";
import { usePreferenceStore } from "../../state/preferences";
import { darkTheme, lightTheme } from "../../theme/color";
import { useTranslation } from "react-i18next";
import { SignRequestStatus, useSignRequest } from "../../hook/useSignRequest";
import Toast from "react-native-toast-message";
import { formatNumberString, shortenAddress } from "../../util/string";
import { formatEther } from "ethers";
import { useNetwork } from "../../hook/useNetwork";
import Button from "../../component/Button";

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

  const {data, isLoading, approveSignRequest} = useSignRequest(signRequestID)

  const {chainId, switchNetwork} = useNetwork()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!data || !data.session) return
    if (data.status === SignRequestStatus.STATUS_SIGNED) {
      Toast.show({
        type: 'error',
        text1: t('requestAlreadySigned'),
      })
      navigation.goBack()
    }
    if (data.status === SignRequestStatus.STATUS_REJECTED) {
      Toast.show({
        type: 'error',
        text1: t('requestAlreadyRejected'),
      })
      navigation.goBack()
    }
    if (data.status === SignRequestStatus.STATUS_EXPIRED) {
      Toast.show({
        type: 'error',
        text1: t('requestExpired'),
      })
      navigation.goBack()
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
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleReject = () => {

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
      <View style={[styles.screenHeader, {paddingTop: 16, paddingBottom: 16}]}>
        <Text
          style={[
            theme.typography.title3.bold,
            { flex: 1, textAlign: 'center', color: preferenceTheme.text.title }
          ]}>
          {t('signExternalRequest')}
        </Text>
      </View>
      <View style={{flex: 1}}>
        {/* Tx Info section */}
        <View style={[styles.requestInfoContainer, {backgroundColor: preferenceTheme.background.surface}]}>
          <View style={{flexDirection: 'row', paddingVertical: 6, alignItems: 'center', justifyContent: 'space-between'}}>
            <Text>
              From:
            </Text>
            <Text>
              {shortenAddress(data.rawData.from, 15, 15)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 6, alignItems: 'center', justifyContent: 'space-between'}}>
            <Text>
              To:
            </Text>
            <Text>
              {shortenAddress(data.rawData.to, 15, 15)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 6, alignItems: 'center', justifyContent: 'space-between'}}>
            <Text>
              Value:
            </Text>
            <Text>
              {formatNumberString(formatEther(data.rawData.value).toString())} U2U
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 6, alignItems: 'center', justifyContent: 'space-between'}}>
            <Text>
              Data:
            </Text>
            <Text>
              {data.rawData.data ? shortenAddress(data.rawData.data, 15, 15) : '--'}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Button
          style={{borderRadius: 60, marginBottom: 12, marginHorizontal: 16}}
          textStyle={theme.typography.label.medium}
          onPress={handleConfirm}
          loading={loading}
        >
          {t('confirm')}
        </Button>
        <Button
          style={{borderRadius: 60, marginHorizontal: 16}}
          textStyle={theme.typography.label.medium}
          onPress={handleReject}
          color="tertiary"
        >
          {t('reject')}
        </Button>
      </View>
    </SafeAreaView>
  )
}