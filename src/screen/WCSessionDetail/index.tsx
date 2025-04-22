import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { SafeAreaView, TouchableOpacity, View, Image } from "react-native";
import { usePreference } from "../../hook/usePreference";
import { useGlobalStore } from "../../state/global";
import { useCallback, useMemo } from "react";
import Icon from "../../component/Icon";
import Text from '../../component/Text';
import { styles } from "./styles";
import { typography } from "../../theme/typography";
import { SessionTypes } from '@walletconnect/types';
import { SvgUri } from "react-native-svg";
import Button from "../../component/Button";
import { useWalletConnect } from "../../hook/walletconnect/useWalletConnect";

export default function WCSessionDetailScreen() {
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

  const {disconnect} = useWalletConnect()

  const sessionDetail: SessionTypes.Struct = route.params?.sessionDetail

  const expiryDate = useMemo(
    () => new Date(sessionDetail?.expiry! * 1000),
    [sessionDetail],
  );

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
      <View style={[styles.dappInfoContainer, {backgroundColor: '#1F2225'}]}>
        {sessionDetail.peer.metadata.icons[0] ? (
          sessionDetail.peer.metadata.icons[0].includes('.svg') ? (
            <View style={{width: 48, height: 48}}>
              <SvgUri
                uri={sessionDetail.peer.metadata.icons[0]}
                width="100%"
                height="100%"
              />
            </View>
          ) : (
            <Image source={{uri: sessionDetail.peer.metadata.icons[0]}} style={{ width: 48, height: 48 }}/>
          )
        ) : (
          <Icon
            name='u2u'
            width={48}
            height={48}
          />
        )}
        <Text style={[typography.title3.regular, {color: preferenceTheme.text.disabled}]}>
          {sessionDetail.peer.metadata.name}
        </Text>
      </View>
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <Text type="label2-medium" color="secondary">{t('expiry')}</Text>
        <Text type="body-medium" color="title">
          {expiryDate.toDateString()} - {expiryDate.toLocaleTimeString()}
        </Text>
      </View>
      <View style={{paddingHorizontal: 16, paddingVertical: 32}}>
        <Button
          color="error"
          onPress={async () => {
            await disconnect(sessionDetail.topic)
            navigation.goBack()
          }}
        >
          <Text
            style={{textTransform: 'capitalize'}}
          >
            {t('disconnect')}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}