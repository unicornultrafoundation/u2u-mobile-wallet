import { useMemo } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View, Image } from "react-native"
import { Notifications, useNotifications } from "../../hook/useNotifications"
import { styles } from "./styles"
import Text from '../../component/Text';
import { typography } from "../../theme/typography"
import { parseNotiTitle } from "../../util/string"
import { formatDate } from "../../util/date"
import { usePreference } from "../../hook/usePreference";
import { useNavigation } from "@react-navigation/native";
import ILLUS from '../../asset/images/empty_icon_illus.png'
import Icon from "../../component/Icon";
import { useTranslation } from "react-i18next";

export default function AllNoti() {
  const {t} = useTranslation()
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
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
      case 'ecosystem':
        if (notiObj.notificationData.url) {
          navigation.navigate('EcosystemStack', {screen: 'DAppWebView', params: {url: notiObj.notificationData.url}});
        }
        return;
      default:
        break;
    }
  }

  if (notifications.length === 0) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'flex-start', flex: 1, marginTop: 157}}>
        <Image
          source={ILLUS}
          width={180}
          height={170}
          style={{marginBottom: 16}}
        />
        <Text
          style={[typography.subheadline.bold, {color: preferenceTheme.text.primary, marginBottom: 8}]}
        >
          {t('emptyNoti')}
        </Text>
        {/* <Text
          style={[typography.caption1.medium, {color: preferenceTheme.text.secondary}]}
        >
          {t('emptyNotiDesc')}
        </Text> */}
      </View>
    )
  }

  return (
    <>
      <FlatList
        onEndReached={handleLoadMore}
        onEndReachedThreshold={.3}
        data={notifications}
        showsVerticalScrollIndicator={false}
        // style={{flex: 1}}
        contentContainerStyle={{
          gap: 12,
          // paddingBottom: 450,
          paddingHorizontal: 16,
          // flex: 1
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
      {isFetching && (
        <ActivityIndicator size={"large"} />
      )}
    </>
  )
}