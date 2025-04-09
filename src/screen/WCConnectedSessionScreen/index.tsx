import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { usePreference } from "../../hook/usePreference";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useGlobalStore } from "../../state/global";
import { useCallback } from "react";
import Icon from "../../component/Icon";
import Text from '../../component/Text';
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import { typography } from "../../theme/typography";
import { useWalletConnect } from "../../hook/walletconnect/useWalletConnect";
import { SvgUri } from "react-native-svg";

export default function WCConnectedSessionScreen() {
  const {t} = useTranslation()
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const {connectedSessions} = useWalletConnect()

  const renderIcon = (icon: string) => {
    if (icon.includes('.svg')) {
      return (
        <View style={{width: 36, height: 36}}>
          <SvgUri uri={icon} width="100%" height="100%" />
        </View>
      )
    }
    return <Image source={{uri: icon}} style={{width: 36, height: 36}} />
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
          <Text style={[styles.headerText, {color: preferenceTheme.text.title}]}>{t('wcConnectedSession')}</Text>
        </View>
        <View style={{width: 24}} />
      </View>
      <FlatList
        data={connectedSessions}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.sessionRow}
              onPress={() => navigation.navigate('WCSessionDetail', {sessionDetail: item})}
            >
              {item.peer.metadata.icons[0] ? renderIcon(item.peer.metadata.icons[0]) : (
                <Icon name='u2u' width={36} height={36} />
              )}
              <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'space-between', paddingHorizontal: 12}}>
                <Text style={[typography.body.bold, {color: preferenceTheme.text.title}]}>
                  {item.peer.metadata.name}
                </Text>
                {/* <Text style={[typography.label2.bold, {color: preferenceTheme.text.secondary, textTransform: 'uppercase'}]}>
                  {item.status}
                </Text> */}
              </View>
              <Icon name="chevron-right" width={18} height={18} />
            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={() => {
          return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={[typography.body.bold, {color: preferenceTheme.text.secondary}]}>
                {t('noConnectedSession')}
              </Text>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}