import React from 'react'
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { usePreference } from "../../hook/usePreference";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import Text from "../../component/Text";
import { typography } from "../../theme/typography";
import { isHexString } from "ethers";
import { hexToString } from "../../util/string";

export default function SignMessageDetail({signRequest}: {
  signRequest: Record<string, any>
}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()

  const { topic, params, id } = signRequest
  const { request } = params
  const requestParamsMessage = request.params[0]

  return (
    <>
      <View style={[styles.requestInfoContainer, {borderColor: preferenceTheme.outline}]}>
        <View style={{paddingVertical: 6, alignItems: 'flex-start', justifyContent: 'space-between', gap: 8}}>
          <Text style={[typography.label2.medium, {color: preferenceTheme.text.secondary}]}>
            {t('message')}
          </Text>
          <Text style={[typography.label.regular, {color: preferenceTheme.text.title}]}>
            {isHexString(requestParamsMessage) ? hexToString(requestParamsMessage.replace("0x", "")) : requestParamsMessage}
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