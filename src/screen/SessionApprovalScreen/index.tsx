import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalStore } from "../../state/global";
import { styles } from "./styles";
import { View } from "react-native";
import Text from '../../component/Text';
import theme from "../../theme";
import { useTranslation } from "react-i18next";
import Scanner from "../../component/QRCodeScanner";
import { usePreference } from "../../hook/usePreference";
import { SessionStatus, useSessionDetail } from "../../hook/useSessionDetail";
import Button from "../../component/Button";
import { SUPPORTED_CHAINS } from "../../config/chain";
import Toast from "react-native-toast-message";

export default function SessionApprovalScreen() {
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const {t} = useTranslation()
  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  const [sessionID, setSessionID] = useState('593dc919-6d98-4660-b9cc-6f17b60b69bb')
  const [loading, setLoading] = useState(false)

  const {data: sessionDetail, approveSession} = useSessionDetail(sessionID)

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const sessionNetworkConfig = useMemo(() => {
    return SUPPORTED_CHAINS.find((i) => Number(i.chainID) === sessionDetail?.dAppMetadata?.chainId)
  }, [sessionDetail])

  const handleConfirm = async () => {
    try {
      const rs = await approveSession()
      console.log(rs)
      setSessionID('')

      Toast.show({
        type: 'success',
        text1: t('approveSessionSuccess'),
      })

      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  const handleReject = () => {
    setSessionID('')
    navigation.goBack()
  }

  if (!sessionID || sessionID === '') {
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
      >
        <Scanner
          onCancel={navigation.goBack}
          onSuccess={setSessionID}
        />
      </SafeAreaView>
    )
  }

  if (!sessionDetail) return null

  console.log(sessionDetail)

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: preferenceTheme.background.background}]}
    >
      <View style={styles.header}>
        <Text
          style={[theme.typography.title3.bold, {textAlign: 'center'}]}
        >
          {t('approvalSession')}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.metadataRow}>
          <Text>Name:</Text>
          <Text>{sessionDetail.dAppMetadata?.name}</Text>
        </View>
        <View style={styles.metadataRow}>
          <Text>Network:</Text>
          <Text>{sessionNetworkConfig?.name}</Text>
        </View>
        <View style={styles.metadataRow}>
          <Text>URL:</Text>
          <Text>{sessionDetail.dAppMetadata?.url}</Text>
        </View>
      </View>
      <View>
        {sessionDetail?.status === SessionStatus.STATUS_PENDING && (
          <Button
            style={{borderRadius: 60, marginBottom: 12, marginHorizontal: 16}}
            textStyle={theme.typography.label.medium}
            onPress={handleConfirm}
            loading={loading}
          >
            {t('confirm')}
          </Button>
        )}
        <Button
          style={{borderRadius: 60, marginHorizontal: 16}}
          textStyle={theme.typography.label.medium}
          onPress={handleReject}
          color="tertiary"
        >
          {sessionDetail?.status === SessionStatus.STATUS_PENDING ? t('cancel') : t('OK')}
        </Button>
      </View>
    </SafeAreaView>
  )
}