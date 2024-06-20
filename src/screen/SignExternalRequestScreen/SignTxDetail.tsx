import { View } from "react-native";
import { styles } from "./styles";
import Text from '../../component/Text';
import { usePreference } from "../../hook/usePreference";
import { useTranslation } from "react-i18next";
import { formatNumberString, shortenAddress } from "../../util/string";
import { formatEther } from "ethers";
import { typography } from "../../theme/typography";

export default function SignTxDetail({data}: {data: Record<string, any>}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()
  return (
    <View style={[styles.requestInfoContainer, {backgroundColor: preferenceTheme.background.surface}]}>
      <View style={{paddingVertical: 6, alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
        <Text style={[typography.label2.medium, {color: preferenceTheme.text.secondary}]}>
          {t('from')}:
        </Text>
        <Text>
          {shortenAddress(data.rawData.from, 15, 15)}
        </Text>
      </View>
      <View style={{paddingVertical: 6, alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
        <Text style={[typography.label2.medium, {color: preferenceTheme.text.secondary}]}>
          {t('to')}:
        </Text>
        <Text>
          {shortenAddress(data.rawData.to, 15, 15)}
        </Text>
      </View>
      <View style={{paddingVertical: 6, alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
        <Text style={[typography.label2.medium, {color: preferenceTheme.text.secondary}]}>
          {t('amount')}:
        </Text>
        <Text>
          {formatNumberString(formatEther(data.rawData.value).toString())} U2U
        </Text>
      </View>
      <View style={{paddingVertical: 6, alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
        <Text style={[typography.label2.medium, {color: preferenceTheme.text.secondary}]}>
          {t('txData')}
        </Text>
        <Text>
          {shortenAddress(data.rawData.data, 15, 15)}
        </Text>
      </View>
    </View>
  )
}