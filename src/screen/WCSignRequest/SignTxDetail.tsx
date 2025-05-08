import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { usePreference } from "../../hook/usePreference";
import Text from "../../component/Text";
import { styles } from "./styles";
import { formatNumberString, shortenAddress } from "../../util/string";
import { typography } from "../../theme/typography";
import { formatEther } from "ethers";

export default function SignTxDetail({signRequest}: {
  signRequest: Record<string, any>
}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()

  const { topic, params, id } = signRequest
  const { request } = params

  const txData = request.params[0]

  return (
    <View style={[styles.requestInfoContainer, {backgroundColor: preferenceTheme.background.surface}]}>
      <View style={{paddingVertical: 6, alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
        <Text style={[typography.label2.medium, {color: preferenceTheme.text.secondary}]}>
          {t('from')}:
        </Text>
        <Text>
          {shortenAddress(txData.from, 15, 15)}
        </Text>
      </View>
      <View style={{paddingVertical: 6, alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
        <Text style={[typography.label2.medium, {color: preferenceTheme.text.secondary}]}>
          {t('to')}:
        </Text>
        <Text>
          {shortenAddress(txData.to, 15, 15)}
        </Text>
      </View>
      <View style={{paddingVertical: 6, alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
        <Text style={[typography.label2.medium, {color: preferenceTheme.text.secondary}]}>
          {t('amount')}:
        </Text>
        <Text>
          {txData && txData.value ? formatNumberString(formatEther(txData.value).toString()) : "0"} U2U
        </Text>
      </View>
      <View style={{paddingVertical: 6, alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
        <Text style={[typography.label2.medium, {color: preferenceTheme.text.secondary}]}>
          {t('txData')}
        </Text>
        <Text>
          {txData && txData.value ? shortenAddress(txData.data, 15, 15) : ''}
        </Text>
      </View>
    </View>
  )
}