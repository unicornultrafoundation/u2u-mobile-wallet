import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { FlatList, Linking, SafeAreaView, TouchableOpacity, View } from "react-native";
import { usePreference } from "../../hook/usePreference";
import { useGlobalStore } from "../../state/global";
import { useCallback, useMemo } from "react";
import Icon from "../../component/Icon";
import Text from '../../component/Text';
import { styles } from "./styles";
import { useSessionSignRequest } from "../../hook/useSessionSignRequest";
import { SignRequestStatus, SignRequestType } from "../../hook/useSignRequest";
import { typography } from "../../theme/typography";
import { useNetwork } from "../../hook/useNetwork";

export default function SessionDetailScreen() {
  const {blockExplorer} = useNetwork()
  const {t} = useTranslation()
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const route = useRoute<any>();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const sessionID = route.params?.sessionID || ""

  const {data: pagedSignRequest, isFetching, fetchNextPage} = useSessionSignRequest(sessionID)

  const signRequest = useMemo(() => {
    if (!pagedSignRequest) return []
    return pagedSignRequest.pages.flat()
  }, [pagedSignRequest])

  console.log(signRequest)

  const handleLoadMore = () => {
    if (isFetching) return;
    fetchNextPage()
  }

  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>{t('sessionDetail')}</Text>
        </View>
        <View style={{width: 24}} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 24,
          // paddingBottom: 450,
          paddingTop: 48
        }}
        data={signRequest}
        renderItem={({item, index}) => {
          return (
            <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 6}}>
              <View style={{padding: 8, borderWidth: 1, borderRadius: 36, borderColor: preferenceTheme.text.primary}}>
                <Icon name={item.type === SignRequestType.SIGN_TX ? "transaction" : "signature"} color={preferenceTheme.text.primary} width={24} height={24} />
              </View>
              <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1}}>
                <Text style={[typography.body.bold, {color: preferenceTheme.text.title}]}>
                  {item.type === SignRequestType.SIGN_TX ? t("signExternalRequestTx") : t("signExternalRequestMessage")}
                </Text>
                <Text style={[typography.label2.bold, {color: preferenceTheme.text.secondary, textTransform: 'uppercase'}]}>
                  {item.status}
                </Text>
              </View>
              {item.type === SignRequestType.SIGN_TX && item.status === SignRequestStatus.STATUS_SIGNED && (
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`${blockExplorer}/tx/${item.txHash}`)
                  }}
                >
                  <Icon name="external-link" width={24} height={24} />
                </TouchableOpacity>
              )}
            </View>
          )
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={.3}
      />
    </SafeAreaView>
  )
}