import { View } from "react-native";
import { styles } from "./styles";
import Text from '../../component/Text';
import { usePreference } from "../../hook/usePreference";
import { useTranslation } from "react-i18next";
import { isHexString } from "ethers";
import { hexToString } from "../../util/string";
import { typography } from "../../theme/typography";
import Icon from "../../component/Icon";

export default function SignMessageDetail({data}: {data: Record<string, any>}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()
  return (
    <>
      <View style={[styles.requestInfoContainer, {borderColor: preferenceTheme.outline}]}>
        <View style={{paddingVertical: 6, alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
          <Text style={[typography.label2.medium, {color: preferenceTheme.text.secondary}]}>
            {t('message')}
          </Text>
          <Text style={[typography.label.regular, {color: preferenceTheme.text.title}]}>
            {isHexString(data.rawData.message) ? hexToString(data.rawData.message.replace("0x", "")) : data.rawData.message}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 8, marginTop: 12}}>
        <Icon name="warning" />
        <Text style={[typography.caption1.medium, {color: preferenceTheme.text.secondary}]}>
          {t('signMessageWarning')}
        </Text>
      </View>
    </>
  )
}