import { FlatList, SafeAreaView, Image, TouchableOpacity, View } from "react-native";
import Icon from "../../component/Icon";
import Text from '../../component/Text';
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { usePreference } from "../../hook/usePreference";
import { useGlobalStore } from "../../state/global";
import { useCallback, useMemo } from "react";
import { Notifications, useNotifications } from "../../hook/useNotifications";
import { typography } from "../../theme/typography";
import { formatDate } from "../../util/date";
import { parseNotiTitle } from "../../util/string";

export default function NotificationScreen() {
  const navigation = useNavigation<any>()
  const {t} = useTranslation()
  
  const {preferenceTheme} = usePreference()
  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const {notifications: pagedNotis, isFetching, fetchNextPage} = useNotifications()

  const notifications = useMemo(() => {
    if (!pagedNotis) return [] as Notifications[]
    return pagedNotis.pages.flat()
  }, [pagedNotis])

  const handleLoadMore = () => {
    if (isFetching) return;
    fetchNextPage()
  }

  const renderLogo = (notiType: string) => {
    switch (notiType) {
      case 'general':
        return (
          <Icon
            name='u2u'
            width={28}
            height={28}
          />
        )
      default:
        return (
          <Icon
            name='u2u'
            width={28}
            height={28}
          />
        )
    }
  }

  const handleNotiPress = (notiObj: Notifications) => {
    if (!notiObj.notificationData.navigationId) return

    switch (notiObj.notificationData.navigationId) {
      case 'discover':
        navigation.navigate('DiscoverStack', {screen: 'Home'});
        return;
    
      default:
        break;
    }
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
          <Text style={styles.headerText}>{t('notifications')}</Text>
        </View>
        <View />
      </View>
      <FlatList
        onEndReached={handleLoadMore}
        onEndReachedThreshold={.7}
        data={notifications}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
          // paddingBottom: 450,
          paddingHorizontal: 16
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => handleNotiPress(item)}
              key={`notification-item-${index}`}
              style={[styles.notiContainer, {backgroundColor: item.read ? 'transparent' : preferenceTheme.background.surface}]}
            >
              <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                {item.notificationData.logo ? (
                  <Image source={{uri: item.notificationData.logo}} style={{ width: 28, height: 28, borderRadius: 44 }}/>
                ) : (
                  renderLogo(item.type)
                ) }
                <Text style={[typography.body.bold, {color: preferenceTheme.text.title, flex: 1}]}>
                  {parseNotiTitle(item.type)}
                </Text>
                <Text style={[typography.caption1.regular, {color: preferenceTheme.text.disabled}]}>
                  {formatDate(item.createdAt, 'HH:mm dd/MM/yyyy')}
                </Text>
              </View>
              <Text style={[typography.body2.bold, {color: preferenceTheme.text.title}]}>
                {item.title}
              </Text>
              <Text style={[typography.caption1.regular, {color: preferenceTheme.text.secondary}]}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    </SafeAreaView>
  )
}