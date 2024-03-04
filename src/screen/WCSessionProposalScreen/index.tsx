import { SafeAreaView, View, Image } from "react-native";
import { useWalletConnect } from "../../hook/useWalletConnect";
import Text from "../../component/Text";
import Button from "../../component/Button";
import { darkTheme, lightTheme } from "../../theme/color";
import { usePreferenceStore } from "../../state/preferences";
import { useCallback, useEffect, useMemo } from "react";
import { _pair } from "../../util/walletconnect";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { logErrorForMonitoring } from "../../hook/useCrashlytics";
import { useGlobalStore } from "../../state/global";

export default function WCSessionProposal() {
  const navigation = useNavigation<any>()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const route = useRoute<any>();
  const uri = route.params?.uri || ""

  const {initialized, approveSession, rejectSession, pairedProposal, logPending} = useWalletConnect()
  const {t} = useTranslation()
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  useEffect(() => {
    if (uri === "" || pairedProposal) return
    _pair({uri})
  }, [uri, pairedProposal])

  const handleApprove = async () => {
    try {
      await approveSession()
      // navigation.goBack()
    } catch (error) {
      logErrorForMonitoring(error as any, 'approve wallet connect fail')
    }
  }

  const handleReject = async () => {
    try {
      await rejectSession()
      navigation.goBack()
    } catch (error) {
      logErrorForMonitoring(error as any, 'reject wallet connect fail')
    }
  }

  const metadata = useMemo(() => {
    if (!pairedProposal) return {} as Record<string, any>
    return pairedProposal.params.proposer.metadata
  }, [pairedProposal])

  if (!initialized) {
    return null
  }

  return (
    <SafeAreaView
      style={[
        { backgroundColor: preferenceTheme.background.background, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20},
      ]}
    >
      {metadata.icons && metadata.icons[0] && (
        <View style={{width: 64, height: 64, borderRadius: 8}}>
          <Image
            source={{ uri: metadata.icons[0] }}
            style={{width: 64, height: 64}}
          />
        </View>
      )}
      <Text style={{marginVertical: 12}}>
        {metadata.name} want to connect
      </Text>
      <View style={{gap: 8, flexDirection: 'row'}}>
        <Button onPress={handleApprove}>
          {t('approve')}
        </Button>
        <Button color="tertiary" onPress={handleReject}>
          {t('reject')}
        </Button>
        <Button
          color="tertiary"
          onPress={() => {
            console.log(logPending())
          }}>
          {t('pending')}
        </Button>
      </View>
    </SafeAreaView>
  )
}