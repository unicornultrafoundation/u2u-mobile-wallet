import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useWallet } from "../../hook/useWallet";
import { useTokenTxHistory } from "../../hook/useTokenTxHistory";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import theme from "../../theme";
import Text from "../../component/Text";
import Button from "../../component/Button";
import { usePreferenceStore } from "../../state/preferences";
import { darkTheme, lightTheme } from "../../theme/color";
import { useGlobalStore } from "../../state/global";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import NoTransactionView from "../TokenDetailScreen/TokenTxHistory/NoTransactionView";
import TxHistoryItem from "./TxHistoryItem";
import LoadingView from "../../component/Common/loadingView";

const TxHistoryScreen = () => {
  const { setRouteName } = useGlobalStore();
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { wallet } = useWallet();
  const { loading, txList } = useTokenTxHistory(wallet.address, "");

  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const { t } = useTranslation<string>();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route])
  );

  const renderBody = () => {
    if (loading) {
      return <LoadingView/>
    }
    if ((txList ?? []).length == 0) {
      return <NoTransactionView/>
    }
    return (
      <ScrollView bounces={false}>
        {txList.map((txItem: Record<string, any>) => {
          return <TxHistoryItem txKey={`token-tx-${txItem.hash}`} txItem={txItem}/>
        })}
        <View style={{ paddingVertical: 20, alignItems: "center", justifyContent: "center" }}>
          <Button
            style={{
              borderRadius: 60,
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: preferenceTheme.background.surface
            }}
            color="tertiary"
            textStyle={[
              theme.typography.caption1.medium,
              {color: preferenceTheme.text.disabled}
            ]}
          >
            {t('viewMore')}
          </Button>
        </View>
      </ScrollView>
    )
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background,
          gap: 10,
        }
      ]}
    >
      <View style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: "row",
      }}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTokenSymbolText, {flex: 1, textAlign: "center"}]}>{t("transactionHistory")}</Text>
        <View />
      </View>
      <View style={{flex: 1}}>
        {renderBody()}
      </View>
    </SafeAreaView>
  );
};

export default TxHistoryScreen;
