import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
// import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { useGlobalStore } from "../../state/global";
import { useCallback, useEffect } from "react";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import Text from '../../component/Text';
import theme from "../../theme";
import Icon from "../../component/Icon";
import { usePreference } from "../../hook/usePreference";
import { useLocalStore } from "../../state/local";
import { DAPP_PROMOTION_NOTIFICATION_TOPIC, NEWS_NOTIFICATION_TOPIC } from "../../config/constant";

export default function NotificationSettingScreen() {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()
  const {
    subscribePromotion, setSubscribePromotion,
    subscribeNews, setSubscribeNews
  } = useLocalStore()

  const navigation = useNavigation()
  const route = useRoute()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  // TODO: handle subscript to topic server side or using react-native-firebase/messaging
  // useEffect(() => {
  //   if (subscribePromotion) {
  //     Notifications.subscribeToTopic(DAPP_PROMOTION_NOTIFICATION_TOPIC)
  //     .then(() => console.log('Subscribed to topic!'));
  //   } else {
  //     messaging()
  //       .unsubscribeFromTopic(DAPP_PROMOTION_NOTIFICATION_TOPIC)
  //       .then(() => console.log('Unsubscribed fom the topic!'));
  //   }
  // }, [subscribePromotion])

  // useEffect(() => {
  //   if (subscribeNews) {
  //     messaging()
  //     .subscribeToTopic(NEWS_NOTIFICATION_TOPIC)
  //     .then(() => console.log('Subscribed to topic!'));
  //   } else {
  //     messaging()
  //       .unsubscribeFromTopic(NEWS_NOTIFICATION_TOPIC)
  //       .then(() => console.log('Unsubscribed fom the topic!'));
  //   }
  // }, [subscribeNews])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: preferenceTheme.background.background}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={theme.typography.title3.bold}
          >
            {t('notification')}
          </Text>
        </View>
        <View />
      </View>
      <View>
        <View style={styles.settingItem}>
          <View style={styles.settingItemTextContainer}>
            <Text style={theme.typography.body.medium}>
              {t('dAppPromotion')}
            </Text>
            <Text
              style={[
                theme.typography.caption1.medium,
                {color: preferenceTheme.text.secondary}
              ]}
            >
              {t('dAppPromotionDesc')}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setSubscribePromotion(!subscribePromotion)}
              style={[styles.toggleContainer, {backgroundColor: preferenceTheme.background.surface}]}
            >
              <View style={[styles.toggleItem, {backgroundColor: subscribePromotion ? theme.color.primary[600] : 'transparent'}]}>
                <Icon name='notification' width={16} height={16} color={subscribePromotion ? preferenceTheme.text.placeholder : preferenceTheme.text.title} />
              </View>
              <View style={[styles.toggleItem, {backgroundColor: subscribePromotion ? 'transparent' : theme.color.primary[600]}]}>
                <Icon name='notification-off' width={16} height={16} color={subscribePromotion ? preferenceTheme.text.title : preferenceTheme.text.placeholder} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingItemTextContainer}>
            <Text style={theme.typography.body.medium}>
              {t('subscribeNews')}
            </Text>
            <Text
              style={[
                theme.typography.caption1.medium,
                {color: preferenceTheme.text.secondary}
              ]}
            >
              {t('subscribeNewsDesc')}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setSubscribeNews(!subscribeNews)}
              style={[styles.toggleContainer, {backgroundColor: preferenceTheme.background.surface}]}
            >
              <View style={[styles.toggleItem, {backgroundColor: subscribeNews ? theme.color.primary[600] : 'transparent'}]}>
                <Icon name='notification' width={16} height={16} color={subscribeNews ? preferenceTheme.text.placeholder : preferenceTheme.text.title} />
              </View>
              <View style={[styles.toggleItem, {backgroundColor: subscribeNews ? 'transparent' : theme.color.primary[600]}]}>
                <Icon name='notification-off' width={16} height={16} color={subscribeNews ? preferenceTheme.text.title : preferenceTheme.text.placeholder} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}