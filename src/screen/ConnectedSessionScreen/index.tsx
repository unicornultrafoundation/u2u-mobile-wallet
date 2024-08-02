import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { usePreference } from "../../hook/usePreference";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useGlobalStore } from "../../state/global";
import { useCallback } from "react";
import Icon from "../../component/Icon";
import Text from '../../component/Text';
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import { useConnectedSessions } from "../../hook/useConnectedSessions";
import { typography } from "../../theme/typography";

export default function ConnectedSessionScreen() {
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

  const {data: sessions} = useConnectedSessions()

  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>{t('connectedSession')}</Text>
        </View>
        <View style={{width: 24}} />
      </View>
      <FlatList
        data={sessions}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.sessionRow}>
              {item.dAppMetadata.logo ? (
                <Image
                  source={{uri: item.dAppMetadata.logo}}
                  style={{
                    width: 36,
                    height: 36
                  }}
                />
              ) : (
                <Icon name='u2u' width={36} height={36} />
              )}
              <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'space-between', paddingHorizontal: 12}}>
                <Text style={[typography.body.bold, {color: preferenceTheme.text.title}]}>
                  {item.dAppMetadata.name}
                </Text>
                <Text style={[typography.label2.bold, {color: preferenceTheme.text.secondary, textTransform: 'uppercase'}]}>
                  {item.status}
                </Text>
              </View>
              <Icon name="chevron-right" width={18} height={18} />
            </TouchableOpacity>
          )
        }}
      />
    </SafeAreaView>
  )
}